"use client"

import { useState } from "react"
import { Camera, Download, Image as ImageIcon } from "lucide-react"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Screenshot {
  id: string
  dataUrl: string
  deviceName: string
  timestamp: string
  width: number
  height: number
}

interface ScreenshotManagerProps {
  onCaptureAll?: () => void
}

export function ScreenshotManager({ onCaptureAll }: ScreenshotManagerProps) {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [capturing, setCapturing] = useState(false)

  const captureAllViewports = async () => {
    setCapturing(true)
    const newScreenshots: Screenshot[] = []

    try {
      // Find all viewport cards
      const viewportCards = document.querySelectorAll('[data-viewport-id]')

      for (const card of Array.from(viewportCards)) {
        const viewportId = card.getAttribute('data-viewport-id')
        const deviceName = card.getAttribute('data-device-name') || 'Unknown Device'

        try {
          const canvas = await html2canvas(card as HTMLElement, {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
          })

          const screenshot: Screenshot = {
            id: `screenshot-${Date.now()}-${viewportId}`,
            dataUrl: canvas.toDataURL('image/png'),
            deviceName,
            timestamp: new Date().toISOString(),
            width: canvas.width,
            height: canvas.height,
          }

          newScreenshots.push(screenshot)
        } catch (err) {
          console.error(`Failed to capture viewport ${viewportId}:`, err)
        }
      }

      setScreenshots([...newScreenshots, ...screenshots])
      setDialogOpen(true)
    } catch (err) {
      console.error('Failed to capture screenshots:', err)
    } finally {
      setCapturing(false)
    }
  }

  const downloadScreenshot = (screenshot: Screenshot) => {
    const link = document.createElement('a')
    link.download = `${screenshot.deviceName.replace(/\s+/g, '-')}-${new Date(screenshot.timestamp).getTime()}.png`
    link.href = screenshot.dataUrl
    link.click()
  }

  const downloadAll = () => {
    screenshots.forEach((screenshot) => {
      setTimeout(() => downloadScreenshot(screenshot), 100)
    })
  }

  const deleteScreenshot = (id: string) => {
    setScreenshots(screenshots.filter((s) => s.id !== id))
  }

  const clearAll = () => {
    setScreenshots([])
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={captureAllViewports}
        disabled={capturing}
      >
        <Camera className="w-4 h-4 mr-2" />
        {capturing ? 'Capturing...' : 'Screenshot All'}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <ImageIcon className="w-4 h-4 mr-2" />
            Screenshots
            {screenshots.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {screenshots.length}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Screenshots</DialogTitle>
            <DialogDescription>
              View and download captured screenshots
            </DialogDescription>
          </DialogHeader>

          {screenshots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No screenshots yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Click "Screenshot All" to capture all viewports
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-4">
                <Button size="sm" onClick={downloadAll}>
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button size="sm" variant="outline" onClick={clearAll}>
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <img
                      src={screenshot.dataUrl}
                      alt={screenshot.deviceName}
                      className="w-full h-auto bg-muted"
                    />
                    <div className="p-3 space-y-2">
                      <h4 className="font-medium text-sm">
                        {screenshot.deviceName}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(screenshot.timestamp).toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => downloadScreenshot(screenshot)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteScreenshot(screenshot.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
