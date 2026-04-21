import { Protect } from "@clerk/nextjs";

import { PremiumFeaturesOverlay } from "@/modules/billing/ui/components/premium-features-overlay";
import { CustomizationView } from "@/modules/customization/ui/views/customization-view";

const Page = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" })}
      fallback={
        <>
          <div className="pointer-events-none select-none blur-[2px]">
            <CustomizationView />
          </div>
          <PremiumFeaturesOverlay />
        </>
      }
    >
      <CustomizationView />
    </Protect>
  );
};

export default Page;
