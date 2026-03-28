"use client";

import { PricingTable } from "../components/pricing-table";

export const BillingViews = () => {
    return (
        <div className="flex min-h-screen flex-col bg-muted p-8">
            <div className="mx-auto w-full max-w-screen-md">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Plans & Billing</h1>
                    <p className="text-muted-foreground">
                        Choose a plan and manage your billing information.
                    </p>
                </div>

                <div className="mt-8">
                    <PricingTable />
                </div>
            </div>
        </div>
    );
};