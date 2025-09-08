'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export interface MembershipError {
  message: string
  currentPlan: string
  articlesRemaining?: number
  videosRemaining?: number
}

export function useMembershipError() {
  const [error, setError] = useState<MembershipError | null>(null)

  const handleMembershipError = (errorData: MembershipError) => {
    setError(errorData)
    toast.error(errorData.message, {
      description: `Current plan: ${errorData.currentPlan}`,
      action: {
        label: 'Upgrade',
        onClick: () => {
          // TODO: Add upgrade functionality
          console.log('Upgrade clicked')
        }
      }
    })
  }

  const clearError = () => setError(null)

  return {
    error,
    handleMembershipError,
    clearError
  }
}
