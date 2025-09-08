'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

const plans = [
  {
    id: 'A',
    name: 'Basic Plan',
    price: '$9.99',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      '5 Articles per month',
      '5 Videos per month',
      'Basic support',
      'Access to community'
    ],
    articleLimit: 5,
    videoLimit: 5,
    color: 'border-blue-200 hover:border-blue-300'
  },
  {
    id: 'B',
    name: 'Standard Plan',
    price: '$19.99',
    period: '/month',
    description: 'Most popular choice',
    features: [
      '10 Articles per month',
      '10 Videos per month',
      'Priority support',
      'Advanced features',
      'Download content'
    ],
    articleLimit: 10,
    videoLimit: 10,
    color: 'border-green-200 hover:border-green-300',
    popular: true
  },
  {
    id: 'C',
    name: 'Premium Plan',
    price: '$39.99',
    period: '/month',
    description: 'Unlimited access to everything',
    features: [
      'Unlimited Articles',
      'Unlimited Videos',
      '24/7 Premium support',
      'All advanced features',
      'Download & offline access',
      'Early access to new content'
    ],
    articleLimit: null,
    videoLimit: null,
    color: 'border-purple-200 hover:border-purple-300'
  }
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">
          Select the perfect membership plan for your learning journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.color} transition-colors`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="flex items-baseline justify-center mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-1">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    <strong>Articles:</strong> {plan.articleLimit || 'Unlimited'} per month
                  </div>
                  <div>
                    <strong>Videos:</strong> {plan.videoLimit || 'Unlimited'} per month
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                onClick={() => {
                  // TODO: Implement plan selection/upgrade
                  console.log(`Selected plan: ${plan.id}`)
                }}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-600">
          All plans include access to our learning platform and community support.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          You can upgrade or downgrade your plan at any time.
        </p>
      </div>
    </div>
  )
}
