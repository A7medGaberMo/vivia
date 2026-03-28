"use client";

import {
    BotIcon,
    BookOpenIcon,
    GemIcon,
    MicIcon,
    PaletteIcon,
    PhoneIcon,
    UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";

type FeatureItem = {
    icon: React.ElementType;
    title: string;
    description: string;
};

const features: FeatureItem[] = [
    {
        icon: BotIcon,
        title: "AI Customer Support",
        description: "Intelligent automated responses 24/7",
    },
    {
        icon: MicIcon,
        title: "AI Voice Agent",
        description: "Natural voice conversations with customers",
    },
    {
        icon: PhoneIcon,
        title: "Phone System",
        description: "Inbound & outbound calling capabilities",
    },
    {
        icon: BookOpenIcon,
        title: "Knowledge Base",
        description: "Train AI on your documentation",
    },
    {
        icon: PaletteIcon,
        title: "Widget Customization",
        description: "Customize your chat widget appearance",
    },
];

export const PremiumFeaturesOverlay = () => {
    const router = useRouter();

    const handleBilling = () => {
        router.push("/billing");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-[2px]">
            <div className="w-full max-w-[540px] rounded-[24px] border bg-background p-8 shadow-2xl">

                <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted/40">
                        <GemIcon className="size-7 text-muted-foreground" />
                    </div>
                </div>

                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Premium Feature
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        This feature requires a Pro subscription
                    </p>
                </div>

                <div className="space-y-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div key={feature.title} className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/30">
                                    <Icon className="size-5 text-muted-foreground" />
                                </div>

                                <div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <Button
                        onClick={handleBilling}
                        className="h-12 w-full rounded-xl text-base font-medium"
                    >
                        View Plans
                    </Button>
                </div>

            </div>
        </div>
    );
};