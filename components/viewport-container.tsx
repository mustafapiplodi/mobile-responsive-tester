"use client"

import { RotateCw, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Viewport } from "@/app/page"

interface ViewportContainerProps {
  viewports: Viewport[]
  url: string
  onRemoveViewport: (viewportId: string) => void
  onToggleOrientation: (viewportId: string) => void
}

export function ViewportContainer({
  viewports,
  url,
  onRemoveViewport,
  onToggleOrientation,
}: ViewportContainerProps) {
  if (viewports.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">
            No devices selected
          </p>
          <p className="text-sm text-muted-foreground">
            Select devices above to start testing
          </p>
        </div>
      </div>
    )
  }

  if (!url) {
    return (
      <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">
            Enter a URL to begin
          </p>
          <p className="text-sm text-muted-foreground">
            Type a website URL above and click "Load URL"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {viewports.map((viewport) => {
        const { device, orientation } = viewport
        const width =
          orientation === "portrait" ? device.width : device.height
        const height =
          orientation === "portrait" ? device.height : device.width

        // Calculate scale to fit the viewport nicely
        const maxWidth = 400
        const maxHeight = 600
        const scale = Math.min(maxWidth / width, maxHeight / height, 1)

        return (
          <Card
            key={viewport.id}
            className="overflow-hidden"
            data-viewport-id={viewport.id}
            data-device-name={device.name}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">
                    {device.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {width} × {height}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {device.dpr}x DPR
                    </Badge>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {orientation}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleOrientation(viewport.id)}
                    aria-label="Rotate viewport"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveViewport(viewport.id)}
                    aria-label="Remove viewport"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center justify-center bg-muted/30 rounded-lg p-4">
                <div
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                  }}
                  className="bg-background border shadow-lg rounded-lg overflow-hidden"
                >
                  <iframe
                    src={url}
                    title={`${device.name} viewport`}
                    className="w-full h-full border-0"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
