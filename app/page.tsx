"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { URLInput } from "@/components/url-input"
import { DeviceSelector } from "@/components/device-selector"
import { ViewportContainer } from "@/components/viewport-container"
import devices from "@/data/devices.json"

export interface Device {
  id: string
  name: string
  width: number
  height: number
  dpr: number
  category: "phone" | "tablet" | "desktop"
}

export interface Viewport {
  id: string
  device: Device
  orientation: "portrait" | "landscape"
}

export default function Home() {
  const [url, setUrl] = useState("")
  const [activeUrl, setActiveUrl] = useState("")
  const [viewports, setViewports] = useState<Viewport[]>([])

  const handleLoadUrl = (newUrl: string) => {
    if (!newUrl) return
    setActiveUrl(newUrl)
  }

  const handleAddViewport = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId) as Device
    if (!device) return

    const newViewport: Viewport = {
      id: `${deviceId}-${Date.now()}`,
      device,
      orientation: "portrait",
    }

    setViewports([...viewports, newViewport])
  }

  const handleRemoveViewport = (viewportId: string) => {
    setViewports(viewports.filter((v) => v.id !== viewportId))
  }

  const handleToggleOrientation = (viewportId: string) => {
    setViewports(
      viewports.map((v) =>
        v.id === viewportId
          ? {
              ...v,
              orientation: v.orientation === "portrait" ? "landscape" : "portrait",
            }
          : v
      )
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <URLInput
            url={url}
            onUrlChange={setUrl}
            onLoadUrl={handleLoadUrl}
          />

          <DeviceSelector
            devices={devices as Device[]}
            onSelectDevice={handleAddViewport}
            selectedDeviceIds={viewports.map(v => v.device.id)}
          />
        </div>

        <ViewportContainer
          viewports={viewports}
          url={activeUrl}
          onRemoveViewport={handleRemoveViewport}
          onToggleOrientation={handleToggleOrientation}
        />
      </main>
    </div>
  )
}
