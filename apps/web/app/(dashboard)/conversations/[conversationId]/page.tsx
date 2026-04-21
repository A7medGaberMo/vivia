import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { ConversationsViewId } from "@/modules/dashboard/ui/views/ConversationsViewId";

interface PageProps {
  params: Promise<{
    conversationId: string; // Must match folder name casing
  }>;
}

const Page = async ({ params }: PageProps) => {
  // Await params to extract the ID
  const { conversationId } = await params;

  return <ConversationsViewId conversationId={conversationId as Id<"conversations">} />;
};

export default Page;
