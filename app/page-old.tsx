"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { URLInput } from "@/components/url-input"
import { DeviceSelector } from "@/components/device-selector"
import { ViewportContainer } from "@/components/viewport-container"
import { CustomDeviceDialog } from "@/components/custom-device-dialog"
import { DeviceSetsManager } from "@/components/device-sets-manager"
import { ScreenshotManager } from "@/components/screenshot-manager"
import { ShareConfig } from "@/components/share-config"
import { SyncControls } from "@/components/sync-controls"
import { PerformancePanel } from "@/components/performance-panel"
import devicesData from "@/data/devices.json"

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
  const [devices, setDevices] = useState<Device[]>(devicesData as Device[])

  // Load configuration from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const config = params.get('config')

    if (config) {
      try {
        const decoded = JSON.parse(atob(config))
        if (decoded.url) {
          setUrl(decoded.url)
          setActiveUrl(decoded.url)
        }
        if (decoded.devices && Array.isArray(decoded.devices)) {
          const loadedViewports: Viewport[] = []
          decoded.devices.forEach((d: { id: string; orientation: "portrait" | "landscape" }) => {
            const device = devices.find((dev) => dev.id === d.id)
            if (device) {
              loadedViewports.push({
                id: `${d.id}-${Date.now()}-${Math.random()}`,
                device,
                orientation: d.orientation || "portrait",
              })
            }
          })
          setViewports(loadedViewports)
        }
      } catch (err) {
        console.error('Failed to load config from URL:', err)
      }
    }
  }, [devices])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + D for dark mode (handled by theme toggle)
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        document.querySelector<HTMLButtonElement>('[aria-label="Toggle theme"]')?.click()
      }

      // ? for help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault()
          // Trigger help dialog
          const helpButtons = document.querySelectorAll('button')
          helpButtons.forEach(btn => {
            if (btn.querySelector('[data-icon="help"]')) {
              btn.click()
            }
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLoadUrl = (newUrl: string) => {
    if (!newUrl) return
    setActiveUrl(newUrl)
  }

  const handleAddViewport = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId)
    if (!device) return

    const newViewport: Viewport = {
      id: `${deviceId}-${Date.now()}`,
      device,
      orientation: "portrait",
    }

    setViewports([...viewports, newViewport])
  }

  const handleAddCustomDevice = (device: Device) => {
    setDevices([...devices, device])
    handleAddViewport(device.id)
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

  const handleLoadDeviceSet = (newViewports: Viewport[]) => {
    setViewports(newViewports)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* URL Input */}
        <URLInput
          url={url}
          onUrlChange={setUrl}
          onLoadUrl={handleLoadUrl}
        />

        {/* Device Selection & Tools */}
        <div className="space-y-4">
          <DeviceSelector
            devices={devices}
            onSelectDevice={handleAddViewport}
            selectedDeviceIds={viewports.map(v => v.device.id)}
          />

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <CustomDeviceDialog onAddDevice={handleAddCustomDevice} />
            <DeviceSetsManager
              currentViewports={viewports}
              onLoadDeviceSet={handleLoadDeviceSet}
            />
            <ScreenshotManager />
            <ShareConfig url={activeUrl} viewports={viewports} />
            <PerformancePanel url={activeUrl} />
          </div>

          {/* Sync Controls (when viewports are active) */}
          {viewports.length > 1 && activeUrl && (
            <SyncControls />
          )}
        </div>

        {/* Viewports Grid */}
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
