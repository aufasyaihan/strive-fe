'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMembership } from '@/store/membership-context'
import { useAuth } from '@/store/auth-context'
import { MembershipUpgradeModal } from './membership-upgrade-modal'

export function MembershipCard() {
  const { membershipLimits, loading } = useMembership()
  const { user } = useAuth()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Membership Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  if (!membershipLimits || !user) {
    return null
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'A': return 'Starter Plan'
      case 'B': return 'Professional Plan'
      case 'C': return 'Premium Plan'
      default: return plan
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'A': return 'bg-blue-100 text-blue-800'
      case 'B': return 'bg-green-100 text-green-800'
      case 'C': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Membership Status
          <Badge className={getPlanColor(membershipLimits.currentPlan)}>
            {getPlanName(membershipLimits.currentPlan)}
          </Badge>
        </CardTitle>
        <CardDescription>
          Your current plan limits and usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium">Articles</h4>
            <p className="text-2xl font-bold">
              {user.articlesCount}
              {membershipLimits.articlesRemaining !== null && (
                <span className="text-sm text-gray-500">
                  /{user.articlesCount + membershipLimits.articlesRemaining}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">
              {membershipLimits.articlesRemaining === null 
                ? 'Unlimited remaining' 
                : `${membershipLimits.articlesRemaining} remaining`
              }
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Videos</h4>
            <p className="text-2xl font-bold">
              {user.videosCount}
              {membershipLimits.videosRemaining !== null && (
                <span className="text-sm text-gray-500">
                  /{user.videosCount + membershipLimits.videosRemaining}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">
              {membershipLimits.videosRemaining === null 
                ? 'Unlimited remaining' 
                : `${membershipLimits.videosRemaining} remaining`
              }
            </p>
          </div>
        </div>
        
        {(membershipLimits.articlesRemaining === 0 || membershipLimits.videosRemaining === 0) && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              You&apos;ve reached your {getPlanName(membershipLimits.currentPlan)} limits. 
              Consider upgrading to access more content.
            </p>
            <MembershipUpgradeModal
              trigger={
                <Button size="sm">
                  Upgrade Plan
                </Button>
              }
            />
          </div>
        )}

        {membershipLimits.currentPlan !== 'C' && (
          <div className="pt-4 border-t">
            <MembershipUpgradeModal
              trigger={
                <Button variant="outline" className="w-full">
                  Manage Membership
                </Button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
