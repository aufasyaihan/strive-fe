"use client";

import { useEffect } from "react";
import { useMembership } from "@/store/membership-context";

interface MembershipUpdateProps {
    children: React.ReactNode;
    contentId: string;
}

export default function MembershipUpdate({ 
    children, 
    contentId 
}: MembershipUpdateProps) {
    const { fetchMembershipLimits } = useMembership();

    useEffect(() => {
        const updateMembershipLimits = async () => {
          
            try {
                await fetchMembershipLimits();
            } catch (error) {
                console.error("Error updating membership limits:", error);
            }
        };

        updateMembershipLimits();
    }, [contentId, fetchMembershipLimits]);

    return <>{children}</>;
}
