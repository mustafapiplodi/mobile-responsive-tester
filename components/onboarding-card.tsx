"use client"

import { useState, useEffect } from "react"
import { X, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface OnboardingCardProps {
  onTryExample: () => void
  onDismiss: () => void
}

export function OnboardingCard({ onTryExample, onDismiss }: OnboardingCardProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("onboarding-dismissed")
    if (!dismissed) {
      setShow(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("onboarding-dismissed", "true")
    setShow(false)
    onDismiss()
  }

  const handleTryExample = () => {
    localStorage.setItem("onboarding-dismissed", "true")
    setShow(false)
    onTryExample()
  }

  if (!show) return null

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>Welcome to Mobile Responsive Tester!</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleDismiss}
            aria-label="Dismiss welcome message"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Test your website across multiple devices in seconds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2 text-sm">
            <p className="font-medium">Quick Start:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Enter a website URL above</li>
              <li>Select devices from the list below</li>
              <li>View your site across all devices instantly</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleTryExample}>
              Try Example URL
            </Button>
            <Button size="sm" variant="outline" onClick={handleDismiss}>
              Got it
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
