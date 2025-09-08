import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldX } from "lucide-react";

export default function ForbiddenPage() {
    return (
        <div className="container mx-auto px-6 py-8 max-w-2xl">
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <ShieldX className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2 text-red-600">
                        Access Forbidden
                    </CardTitle>
                    <Badge variant="destructive" className="mb-4">
                        Membership Limit Reached
                    </Badge>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        You have reached your membership limit for accessing this content.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Please upgrade your membership plan to continue accessing premium content.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild>
                            <Link href="/dashboard/pricing">
                                Upgrade Plan
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard">
                                Go to Dashboard
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
