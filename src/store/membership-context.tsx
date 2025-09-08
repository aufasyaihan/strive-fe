"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { MembershipLimits, MembershipPackage } from "@/types/auth";
import { getToken } from "@/lib/cookies";
import { updateMembershipAction } from "@/app/actions/auth";

interface MembershipContextType {
    membershipLimits: MembershipLimits | null;
    membershipPackages: MembershipPackage[];
    fetchMembershipLimits: () => Promise<void>;
    updateMembership: (packageName: string) => Promise<{ success: boolean; message: string }>;
    loading: boolean;
}

const MEMBERSHIP_PACKAGES: MembershipPackage[] = [
    {
        id: "cmfb41pso0002hafe3h43sl2l",
        package: "A",
        articleLimit: 5,
        videoLimit: 5
    },
    {
        id: "cmfb41pso0003hafel1u56t1h",
        package: "B",
        articleLimit: 10,
        videoLimit: 10
    },
    {
        id: "cmfb41pso0004hafeh0goovse",
        package: "C",
        articleLimit: null,
        videoLimit: null
    }
];

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

    const updateMembership = useCallback(async (packageName: string) => {
        setLoading(true);
        try {
            const result = await updateMembershipAction(packageName);
            if (result.success) {
                await fetchMembershipLimits();
            }
            return result;
        } catch (error) {
            console.error("Error updating membership:", error);
            return {
                success: false,
                message: "An error occurred while updating membership"
            };
        } finally {
            setLoading(false);
        }
    }, [fetchMembershipLimits]);

    useEffect(() => {
        console.log("Fetching membership data on mount");
        fetchMembershipLimits();
    }, [fetchMembershipLimits]);

    return (
        <MembershipContext.Provider
            value={{
                membershipLimits,
                membershipPackages : MEMBERSHIP_PACKAGES,
                fetchMembershipLimits,
                updateMembership,
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
