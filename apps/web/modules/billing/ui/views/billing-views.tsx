"use client";

import { PricingTable } from "../components/pricing-table";
import { CreditCardIcon } from "lucide-react";

export const BillingViews = () => {
    return (
        <div className="w-full space-y-10 py-4">
            <div className="mx-auto w-full max-w-5xl space-y-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <CreditCardIcon size={20} className="fill-current" />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                            Billing & Subscriptions
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Plans & Billing</h1>
                    <p className="max-w-2xl text-lg text-muted-foreground">
                        Manage your subscription, view payment history, and explore premium features to unlock your widget's full potential.
                    </p>
                </div>

                <div className="mt-8">
                    <PricingTable />
                </div>
            </div>
        </div>
    );
};