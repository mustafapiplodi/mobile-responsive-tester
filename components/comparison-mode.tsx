"use client"

import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface ComparisonModeProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  viewportCount: number
}

export function ComparisonMode({
  enabled,
  onToggle,
  viewportCount,
}: ComparisonModeProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
          <div>
            <Label htmlFor="comparison-mode" className="cursor-pointer font-medium">
              Comparison Mode
            </Label>
            <p className="text-xs text-muted-foreground">
              Lock viewports side-by-side for direct comparison
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {enabled && (
            <Badge variant="default">
              Comparing {viewportCount}
            </Badge>
          )}
          <Switch
            id="comparison-mode"
            checked={enabled}
            onCheckedChange={onToggle}
            disabled={viewportCount < 2}
            aria-label="Toggle comparison mode"
          />
        </div>
      </div>

      {enabled && viewportCount >= 2 && (
        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          💡 Tip: Comparison mode synchronizes scrolling between viewports
        </div>
      )}
    </Card>
  )
}
