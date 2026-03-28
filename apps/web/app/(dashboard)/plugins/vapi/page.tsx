"use client"; // ← MUST be here
import { Protect } from "@clerk/nextjs";
import { PremiumFeaturesOverlay } from "@/modules/billing/ui/components/premium-features-overlay";
import { VapiView } from "@/modules/Plugins/ui/views/vapi-view";

const VapiPage = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" })}
      fallback={
        <>
          <div className="pointer-events-none select-none blur-[2px]">
            <VapiView />
          </div>
          <PremiumFeaturesOverlay />
        </>
      }
    >
      <VapiView />
    </Protect>
  );
};

export default VapiPage;