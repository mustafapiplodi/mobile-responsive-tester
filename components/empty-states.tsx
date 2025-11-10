"use client"

import { Smartphone, Globe, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EmptyDevicesStateProps {
  onSelectDevice?: (deviceId: string) => void
}

export function EmptyDevicesState({ onSelectDevice }: EmptyDevicesStateProps) {
  const popularDevices = [
    { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", icon: "📱" },
    { id: "ipad-pro-13", name: "iPad Pro 13\"", icon: "📱" },
    { id: "desktop-1920", name: "Desktop 1920", icon: "🖥️" },
  ]

  return (
    <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg bg-muted/30">
      <div className="text-center space-y-4 max-w-md px-4">
        <Smartphone className="w-16 h-16 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">No devices selected</h3>
          <p className="text-sm text-muted-foreground">
            Select devices above to start testing your website's responsiveness
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">
            Popular choices:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularDevices.map((device) => (
              <Button
                key={device.id}
                variant="outline"
                size="sm"
                onClick={() => onSelectDevice?.(device.id)}
                className="gap-2"
              >
                <span>{device.icon}</span>
                {device.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface EmptyURLStateProps {
  onExampleURL?: () => void
}

export function EmptyURLState({ onExampleURL }: EmptyURLStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg bg-muted/30">
      <div className="text-center space-y-4 max-w-md px-4">
        <Globe className="w-16 h-16 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Enter a URL to begin</h3>
          <p className="text-sm text-muted-foreground">
            Type a website URL above and click "Load URL" to start testing
          </p>
        </div>
        {onExampleURL && (
          <div>
            <Button variant="outline" size="sm" onClick={onExampleURL}>
              Try Example URL
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export function EmptyScreenshotsState() {
  return (
    <div className="text-center py-12">
      <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground mb-2">No screenshots yet</p>
      <p className="text-sm text-muted-foreground">
        Click "Screenshot All" to capture all viewports
      </p>
    </div>
  )
}
