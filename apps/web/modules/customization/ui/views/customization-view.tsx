// CustomizationView.tsx
"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { Loader2Icon, SparklesIcon, PaletteIcon, InfoIcon } from "lucide-react";

import { CustomizationForm } from "../components/customization-form";

// shadcn/ui
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";

export const CustomizationView = () => {
    const widgetSettings = useQuery(api.private.widgetSettings.getOne);
    const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" });

    const isLoading = widgetSettings === undefined || vapiPlugin === undefined;
    const hasVapiPlugin = useMemo(() => vapiPlugin !== null, [vapiPlugin]);

    if (isLoading) {
        return (
            <div className="w-full py-4">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 py-24">
                    <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
                    <div className="space-y-1 text-center">
                        <p className="text-sm font-medium">Loading settings…</p>
                        <p className="text-xs text-muted-foreground">Fetching your widget configuration.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!widgetSettings) {
        return (
            <div className="w-full space-y-10 py-4">
                <div className="mx-auto w-full max-w-5xl space-y-10">
                    {/* Header */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                            <PaletteIcon size={18} />
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                Widget Settings
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Widget Customization</h1>
                        <p className="text-lg text-muted-foreground">
                            Customize how your widget looks and what it says.
                        </p>
                    </div>

                    <Card className="border-border/60 shadow-md">
                        <CardHeader className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                                <SparklesIcon className="h-5 w-5 text-muted-foreground" />
                                No settings yet
                            </CardTitle>
                            <CardDescription>
                                No widget record found. Create one first, then refresh.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Set up your greeting message and quick suggestions, then come back here to customize.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-10 py-4">
            <div className="mx-auto w-full max-w-5xl space-y-8">
                {/* Header */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <PaletteIcon size={18} />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                            Widget Settings
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Widget Customization</h1>
                    <p className="text-lg text-muted-foreground">
                        Customize how your widget looks and what it says.
                    </p>
                </div>

                {/* Slim Vapi info strip */}
                {!hasVapiPlugin && (
                    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                        <InfoIcon className="h-4 w-4 shrink-0" />
                        <span>
                            Voice calling is not enabled.{" "}
                            <span className="font-medium text-foreground">Connect Vapi in Plugins</span>{" "}
                            to unlock voice settings.
                        </span>
                    </div>
                )}

                {/* Form */}
                <CustomizationForm
                    initialData={widgetSettings ?? null}
                    hasVapiPlugin={hasVapiPlugin}
                />
            </div>
        </div>
    );
};