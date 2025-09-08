'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useMembership } from '@/store/membership-context'
import { useAuth } from '@/store/auth-context'
import { getCurrentUser } from '@/lib/auth'
import { toast } from 'sonner'

interface MembershipUpgradeModalProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function MembershipUpgradeModal({ trigger, open, onOpenChange }: MembershipUpgradeModalProps) {
  const { membershipLimits, membershipPackages, updateMembership, loading } = useMembership()
  const { user, setUser } = useAuth()
  const [updatingPackage, setUpdatingPackage] = useState<string | null>(null)
  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  if (!membershipLimits || !user) {
    return null
  }

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  const handleUpgrade = async (packageName: string) => {
    if (packageName === membershipLimits.currentPlan) {
      toast.info('You are already on this plan')
      return
    }

    setUpdatingPackage(packageName)
    try {
      const result = await updateMembership(packageName)
      if (result.success) {
        toast.success(result.message)
        await refreshUser()
        setIsOpen(false)
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('Failed to update membership')
    } finally {
      setUpdatingPackage(null)
    }
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

  const getPlanDescription = (plan: string) => {
    switch (plan) {
      case 'A': return 'Perfect for getting started'
      case 'B': return 'Great for regular users'
      case 'C': return 'Unlimited access to everything'
      default: return ''
    }
  }

  const isCurrentPlan = (packageName: string) => packageName === membershipLimits.currentPlan

  const DialogComponent = (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="md:max-w-4xl max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade Your Membership</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {membershipPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative gap-2 md:gap-6 ${isCurrentPlan(pkg.package) ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{getPlanName(pkg.package)}</CardTitle>
                  <Badge className={getPlanColor(pkg.package)}>
                    Plan {pkg.package}
                  </Badge>
                </div>
                <CardDescription className="text-xs">{getPlanDescription(pkg.package)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">Articles</span>
                    <span className="text-xs">
                      {pkg.articleLimit === null ? 'Unlimited' : `${pkg.articleLimit}/month`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">Videos</span>
                    <span className="text-xs">
                      {pkg.videoLimit === null ? 'Unlimited' : `${pkg.videoLimit}/month`}
                    </span>
                  </div>
                </div>

                {isCurrentPlan(pkg.package) && (
                  <Badge className="w-full justify-center bg-green-100 text-green-800 text-xs">
                    Current Plan
                  </Badge>
                )}

                {!isCurrentPlan(pkg.package) && (
                  <Button
                    onClick={() => handleUpgrade(pkg.package)}
                    disabled={loading || updatingPackage !== null}
                    className="w-full text-xs"
                    size="sm"
                    variant={pkg.package === 'C' ? 'default' : 'outline'}
                  >
                    {updatingPackage === pkg.package ? 'Updating...' : `Upgrade to Plan ${pkg.package}`}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {(membershipLimits.articlesRemaining === 0 || membershipLimits.videosRemaining === 0) && (
          <Card className="border-yellow-200 bg-yellow-50 py-2">
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <p className="text-xs text-yellow-800">
                  You&apos;ve reached your current plan limits. Upgrade to access more content!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )

  return DialogComponent
}
