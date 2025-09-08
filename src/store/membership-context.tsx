"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { MembershipLimits } from "@/types/auth";
import { getToken } from "@/lib/cookies";

interface MembershipContextType {
    membershipLimits: MembershipLimits | null;
    fetchMembershipLimits: () => Promise<void>;
    loading: boolean;
}

const MembershipContext = createContext<MembershipContextType | undefined>(
    undefined
);

export function MembershipProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [membershipLimits, setMembershipLimits] =
        useState<MembershipLimits | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchMembershipLimits = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken("access_token");
            if (!token) return;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/membership`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                console.error("response:", response);
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setMembershipLimits(data.data);
            }
        } catch (error) {
            console.error("Error fetching membership limits:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log("Fetching membership limits on mount");

        fetchMembershipLimits();
    }, [fetchMembershipLimits]);

    return (
        <MembershipContext.Provider
            value={{
                membershipLimits,
                fetchMembershipLimits,
                loading,
            }}
        >
            {children}
        </MembershipContext.Provider>
    );
}

export function useMembership() {
    const context = useContext(MembershipContext);
    if (context === undefined) {
        throw new Error(
            "useMembership must be used within a MembershipProvider"
        );
    }
    return context;
}
