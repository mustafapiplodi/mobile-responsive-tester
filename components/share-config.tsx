"use client"

import { useState, useEffect } from "react"
import { Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Viewport } from "@/app/page"

interface ShareConfigProps {
  url: string
  viewports: Viewport[]
}

export function ShareConfig({ url, viewports }: ShareConfigProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (dialogOpen) {
      generateShareUrl()
    }
  }, [dialogOpen, url, viewports])

  const generateShareUrl = () => {
    const config = {
      url,
      devices: viewports.map((v) => ({
        id: v.device.id,
        orientation: v.orientation,
      })),
    }

    const encoded = btoa(JSON.stringify(config))
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    setShareUrl(`${baseUrl}?config=${encoded}`)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const canShare = url && viewports.length > 0

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!canShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Configuration</DialogTitle>
          <DialogDescription>
            Share this link to load the same URL and devices
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Configuration URL</Label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Configuration Details</Label>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                URL: <span className="text-foreground">{url}</span>
              </p>
              <p className="text-muted-foreground">
                Devices: <span className="text-foreground">{viewports.length}</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
