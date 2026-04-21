"use client";

import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
  InboxIcon,
  MessagesSquareIcon,
  SearchIcon,
} from "lucide-react";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  getCountryFlagUrl,
  getCountryNameFromTimzezone,
} from "../../../../../../../lib/country-utils";
import { DiceBearAvatar } from "@workspace/ui/components/DiceBearAvatar";
import { cn } from "@workspace/ui/lib/utils";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { useAtomValue, useSetAtom } from "jotai";
import { statusFilterAtom } from "../../atoms";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/InfiniteScrollTrigger";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useState } from "react";
import { Input } from "@workspace/ui/components/input";

// ─── Filter Tabs Config ───────────────────────────────────────────────────────

const FILTER_TABS = [
  { value: "all", label: "All", icon: MessagesSquareIcon },
  { value: "unresolved", label: "Open", icon: InboxIcon },
  { value: "escalated", label: "Escalated", icon: ArrowUpIcon },
  { value: "resolved", label: "Resolved", icon: CheckIcon },
] as const;

// ─── ConversationsPanel ───────────────────────────────────────────────────────

export const ConversationsPanel = () => {
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);
  const [search, setSearch] = useState("");

  // Accurate stats from backend — not limited by pagination
  const stats = useQuery(api.private.conversations.getStats);

  const { results, status, loadMore } = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: statusFilter === "all" ? undefined : statusFilter },
    { initialNumItems: 10 }
  );

  const pathname = usePathname();

  const { topElementRef, canLoadMore, isLoadingMore, isLoadingFirstPage } =
    useInfiniteScroll({ status, loadMore, loadSize: 5 });

  const filtered = search.trim()
    ? results.filter((c) =>
        (c.contactSession?.name || "Anonymous")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (c.lastMessage?.text || "").toLowerCase().includes(search.toLowerCase())
      )
    : results;

  // Get the active count for the header badge
  const activeTabLabel = FILTER_TABS.find((t) => t.value === (statusFilter || "all"))?.label ?? "All";
  const activeCount =
    (statusFilter || "all") === "all" ? stats?.total
    : statusFilter === "unresolved" ? stats?.unresolved
    : statusFilter === "escalated" ? stats?.escalated
    : stats?.resolved;

  return (
    <div className="flex h-full flex-col bg-background text-foreground overflow-hidden">

      {/* ── Panel Header ── */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-border/50">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
              Conversations
            </h2>
            {statusFilter && statusFilter !== "all" && (
              <span className="text-[13px] text-muted-foreground font-medium">/ {activeTabLabel}</span>
            )}
          </div>
          {activeCount !== undefined && activeCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold tabular-nums px-2 py-0.5 min-w-[20px]">
              {activeCount}
            </span>
          )}
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-[14px] text-muted-foreground/60 pointer-events-none" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 pr-3 text-[13px] bg-muted/50 border-border/50 rounded-lg placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:bg-background transition-colors"
          />
        </div>

        {/* Filter Pills — single row, scrollable */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isSelected = (statusFilter || "all") === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() =>
                  setStatusFilter(
                    tab.value as "all" | "unresolved" | "resolved" | "escalated"
                  )
                }
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap shrink-0",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <tab.icon className="size-[11px] shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── List Section ── */}
      {isLoadingFirstPage ? (
        <SkeletonConversations />
      ) : filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center px-6">
          <div className="flex items-center justify-center size-12 rounded-full bg-muted/80">
            <InboxIcon className="size-5 text-muted-foreground/50" />
          </div>
          <div>
            <p className="text-[13.5px] font-medium text-muted-foreground">No conversations found</p>
            <p className="text-xs text-muted-foreground/50 mt-0.5">
              {search ? "Try a different search term" : "Conversations will appear here"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex w-full flex-col">
            {filtered.map((conversation) => {
              const countryInfo = getCountryNameFromTimzezone(
                conversation.contactSession?.metadata?.timezone || ""
              );
              const countryFlagUrl = countryInfo
                ? getCountryFlagUrl(countryInfo?.code)
                : undefined;

              const isUnread = conversation.lastMessage?.provider === "user";
              const isActive = pathname === `/conversations/${conversation._id}`;

              return (
                <Link
                  key={conversation._id}
                  href={`/conversations/${conversation._id}`}
                  className={cn(
                    "group relative flex cursor-pointer items-start gap-3.5 border-b border-border/40 px-4 py-3.5 transition-all duration-200 outline-none",
                    "hover:bg-primary/[0.04] dark:hover:bg-primary/[0.06]",
                    isActive && "bg-primary/[0.07] dark:bg-primary/[0.11]"
                  )}
                >
                  {/* Active indicator bar */}
                  <div
                    className={cn(
                      "absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-primary transition-all duration-300 ease-out",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {/* Avatar */}
                  <div className="relative shrink-0 mt-0.5">
                    <DiceBearAvatar
                      seed={conversation.contactSession?._id}
                      size={38}
                      className={cn(
                        "ring-[1.5px] transition-all duration-200",
                        isActive
                          ? "ring-primary/40"
                          : "ring-border/60 group-hover:ring-primary/30"
                      )}
                      badgeImageUrl={countryFlagUrl}
                    />
                    {/* Unread dot */}
                    {isUnread && !isActive && (
                      <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary border-2 border-background" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-[5px] min-w-0">
                    {/* Name + Time */}
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-[13.5px] tracking-tight",
                          isUnread && !isActive
                            ? "font-semibold text-foreground"
                            : "font-medium text-foreground/85"
                        )}
                      >
                        {conversation.contactSession?.name || "Anonymous"}
                      </span>
                      <span className="shrink-0 text-[10.5px] tabular-nums text-muted-foreground/55">
                        {formatDistanceToNow(new Date(conversation._creationTime))}
                      </span>
                    </div>

                    {/* Preview + Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-1">
                        {!isUnread && (
                          <CornerUpLeftIcon className="size-3 shrink-0 text-primary/50 flex-none" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-[12px]",
                            isUnread && !isActive
                              ? "text-foreground/75 font-medium"
                              : "text-muted-foreground/65"
                          )}
                        >
                          {conversation.lastMessage?.text || "No messages yet"}
                        </span>
                      </div>
                      <div className="shrink-0 ml-1">
                        <ConversationStatusIcon status={conversation.status} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <InfiniteScrollTrigger
            ref={topElementRef}
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={() => loadMore(5)}
          />
        </ScrollArea>
        </div>
      )}
    </div>
  );
};

// ─── SkeletonConversations ────────────────────────────────────────────────────

export const SkeletonConversations = () => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3.5 px-4 py-3.5 border-b border-border/40"
        >
          <Skeleton className="h-[38px] w-[38px] shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 flex flex-col gap-2.5 py-0.5">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-3 w-10 rounded" />
            </div>
            <Skeleton className="h-3 w-4/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
