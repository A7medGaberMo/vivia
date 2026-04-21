import { Protect } from "@clerk/nextjs";

import { PremiumFeaturesOverlay } from "@/modules/billing/ui/components/premium-features-overlay";
import { FilesView } from "@/modules/files/ui/screens/files-view";

const Page = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" })}
      fallback={
        <>
          <div className="pointer-events-none select-none blur-[2px]">
            <FilesView />
          </div>
          <PremiumFeaturesOverlay />
        </>
      }
    >
      <FilesView />
    </Protect>
  );
};

export default Page;