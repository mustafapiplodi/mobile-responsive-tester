"use client"

import { useState, useRef, useEffect } from "react"
import { RotateCw, X, RefreshCw, ZoomIn, ZoomOut, Maximize2, AlertCircle, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Viewport } from "@/app/page"

interface EnhancedViewportProps {
  viewport: Viewport
  url: string
  onRemoveViewport: (viewportId: string) => void
  onToggleOrientation: (viewportId: string) => void
  availableWidth: number
  availableHeight: number
  onIframeLoad?: (viewportId: string) => void
}

export function EnhancedViewport({
  viewport,
  url,
  onRemoveViewport,
  onToggleOrientation,
  availableWidth,
  availableHeight,
  onIframeLoad,
}: EnhancedViewportProps) {
  const { device, orientation } = viewport
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [zoom, setZoom] = useState(100)
  const [isRotating, setIsRotating] = useState(false)

  const width = orientation === "portrait" ? device.width : device.height
  const height = orientation === "portrait" ? device.height : device.width

  // Dynamic scaling based on available space
  const calculateScale = () => {
    const padding = 32
    const maxW = (availableWidth - padding) * 0.95
    const maxH = (availableHeight - padding) * 0.8
    const scaleX = maxW / width
    const scaleY = maxH / height
    return Math.min(scaleX, scaleY, 1) * (zoom / 100)
  }

  const scale = calculateScale()

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setErrorMessage("")
  }, [url])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onIframeLoad?.(viewport.id)

    // Try to detect if the page loaded successfully
    try {
      const iframe = iframeRef.current
      if (iframe && iframe.contentWindow) {
        // This will fail for cross-origin frames, which is expected
        try {
          const doc = iframe.contentWindow.document
          if (!doc || !doc.body) {
            setHasError(true)
            setErrorMessage("Page failed to load")
          }
        } catch (e) {
          // Cross-origin error is expected, page likely loaded fine
        }
      }
    } catch (error) {
      console.error("Error checking iframe load:", error)
    }
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
    setErrorMessage("This website blocks embedding in iframes (X-Frame-Options)")
  }

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true)
      setHasError(false)
      iframeRef.current.src = url + '?t=' + Date.now()
    }
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50))
  }

  const handleZoomReset = () => {
    setZoom(100)
  }

  const handleToggleOrientation = () => {
    setIsRotating(true)
    onToggleOrientation(viewport.id)
    setTimeout(() => setIsRotating(false), 300)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "phone":
        return "border-l-blue-500"
      case "tablet":
        return "border-l-purple-500"
      case "desktop":
        return "border-l-gray-500"
      default:
        return "border-l-gray-300"
    }
  }

  const getCategoryIcon = () => {
    switch (device.category) {
      case "phone":
        return "📱"
      case "tablet":
        return "📱"
      case "desktop":
        return "🖥️"
      default:
        return "📱"
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border-l-4 transition-all duration-300 hover:shadow-lg",
        getCategoryColor(device.category)
      )}
      data-viewport-id={viewport.id}
      data-device-name={device.name}
    >
      <CardHeader className="pb-3 space-y-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getCategoryIcon()}</span>
              <CardTitle className="text-base truncate">
                {device.name}
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {width} × {height}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {device.dpr}x DPR
              </Badge>
              <Badge variant="secondary" className="text-xs capitalize">
                {orientation}
              </Badge>
              {zoom !== 100 && (
                <Badge variant="default" className="text-xs">
                  {zoom}%
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 shrink-0 flex-wrap">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              aria-label={`Zoom out ${device.name}`}
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomReset}
              disabled={zoom === 100}
              aria-label={`Reset zoom for ${device.name}`}
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              aria-label={`Zoom in ${device.name}`}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              aria-label={`Refresh ${device.name} viewport`}
              title="Refresh"
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleOrientation}
              aria-label={`Toggle orientation for ${device.name}`}
              title="Rotate"
            >
              <RotateCw className={cn("w-4 h-4", isRotating && "animate-spin")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveViewport(viewport.id)}
              aria-label={`Remove ${device.name} viewport`}
              title="Remove"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center justify-center bg-muted/30 rounded-lg p-4 relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {hasError && (
            <div className="absolute inset-0 bg-destructive/10 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg p-4">
              <div className="text-center space-y-3 max-w-sm">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                <div>
                  <p className="font-medium text-destructive">Failed to Load</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {errorMessage}
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRefresh}
                  >
                    Try Again
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open Directly
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Iframe Container */}
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: isRotating ? "all 0.3s ease-in-out" : "transform 0.2s ease-out",
            }}
            className="bg-background border shadow-lg rounded-lg overflow-hidden"
          >
            <iframe
              ref={iframeRef}
              src={url}
              title={`${device.name} viewport`}
              className="w-full h-full border-0"
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              loading="lazy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
