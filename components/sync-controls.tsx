"use client"

import { useState } from "react"
import { MousePointer2, Move } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

interface SyncControlsProps {
  onScrollSyncChange?: (enabled: boolean) => void
  onClickSyncChange?: (enabled: boolean) => void
}

export function SyncControls({
  onScrollSyncChange,
  onClickSyncChange,
}: SyncControlsProps) {
  const [scrollSync, setScrollSync] = useState(false)
  const [clickSync, setClickSync] = useState(false)

  const handleScrollSyncChange = (checked: boolean) => {
    setScrollSync(checked)
    onScrollSyncChange?.(checked)
  }

  const handleClickSyncChange = (checked: boolean) => {
    setClickSync(checked)
    onClickSyncChange?.(checked)
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Sync Options</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Note: Sync features have limited support due to browser security restrictions.
            Works best with same-origin URLs.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="scroll-sync" className="cursor-pointer">
              Scroll Sync
            </Label>
          </div>
          <Switch
            id="scroll-sync"
            checked={scrollSync}
            onCheckedChange={handleScrollSyncChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MousePointer2 className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="click-sync" className="cursor-pointer">
              Click Mirror
            </Label>
          </div>
          <Switch
            id="click-sync"
            checked={clickSync}
            onCheckedChange={handleClickSyncChange}
          />
        </div>
      </div>
    </Card>
  )
}
