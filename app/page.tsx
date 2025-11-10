"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { URLInput } from "@/components/url-input"
import { EnhancedDeviceSelector } from "@/components/enhanced-device-selector"
import { EnhancedViewport } from "@/components/enhanced-viewport"
import { CustomDeviceDialog } from "@/components/custom-device-dialog"
import { DeviceSetsManager } from "@/components/device-sets-manager"
import { ScreenshotManager } from "@/components/screenshot-manager"
import { ShareConfig } from "@/components/share-config"
import { SyncControls } from "@/components/sync-controls"
import { PerformancePanel } from "@/components/performance-panel"
import { BatchOperations } from "@/components/batch-operations"
import { RecentURLs } from "@/components/recent-urls"
import { NetworkThrottling } from "@/components/network-throttling"
import { PresetBreakpoints } from "@/components/preset-breakpoints"
import { PDFExport } from "@/components/pdf-export"
import { ComparisonMode } from "@/components/comparison-mode"
import { EmptyDevicesState, EmptyURLState } from "@/components/empty-states"
import { ErrorBoundary } from "@/components/error-boundary"
import { useRecentURLs, useViewportDimensions, useOnlineStatus } from "@/lib/hooks"
import devicesData from "@/data/devices.json"
import { toast } from "sonner"
import { WifiOff } from "lucide-react"

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
  const [scrollSync, setScrollSync] = useState(false)
  const [clickSync, setClickSync] = useState(false)
  const [throttleMode, setThrottleMode] = useState<"none" | "3g" | "4g" | "5g">("none")
  const [comparisonMode, setComparisonMode] = useState(false)

  const { recentURLs, addURL, clearURLs } = useRecentURLs()
  const dimensions = useViewportDimensions()
  const isOnline = useOnlineStatus()

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
          toast.success("Configuration loaded from URL")
        }
      } catch (err) {
        console.error('Failed to load config from URL:', err)
        toast.error("Failed to load shared configuration")
      }
    }
  }, [devices])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        document.querySelector<HTMLButtonElement>('[aria-label="Toggle theme"]')?.click()
      }

      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Show offline indicator
  useEffect(() => {
    if (!isOnline) {
      toast.error("You are offline", {
        icon: <WifiOff className="w-4 h-4" />,
        duration: Infinity,
        id: "offline",
      })
    } else {
      toast.dismiss("offline")
    }
  }, [isOnline])

  const handleLoadUrl = (newUrl: string) => {
    if (!newUrl) return
    setActiveUrl(newUrl)
    addURL(newUrl)
    toast.success("URL loaded")
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
    toast.success(`Added ${device.name}`)
  }

  const handleAddCustomDevice = (device: Device) => {
    setDevices([...devices, device])
    handleAddViewport(device.id)
    toast.success("Custom device added")
  }

  const handleBatchSelectDevices = (deviceIds: string[]) => {
    const newViewports: Viewport[] = deviceIds
      .filter(id => !viewports.some(v => v.device.id === id))
      .map(id => {
        const device = devices.find((d) => d.id === id)
        if (!device) return null
        return {
          id: `${id}-${Date.now()}-${Math.random()}`,
          device,
          orientation: "portrait" as const,
        }
      })
      .filter((v): v is Viewport => v !== null)

    setViewports([...viewports, ...newViewports])
  }

  const handleAddPresetDevices = (presetDevices: Device[]) => {
    const newDevices = [...devices]
    const newViewports = [...viewports]

    presetDevices.forEach(device => {
      // Add device if it doesn't exist
      if (!newDevices.find(d => d.id === device.id)) {
        newDevices.push(device)
      }

      // Add viewport if not already selected
      if (!newViewports.find(v => v.device.id === device.id)) {
        newViewports.push({
          id: `${device.id}-${Date.now()}-${Math.random()}`,
          device,
          orientation: "portrait",
        })
      }
    })

    setDevices(newDevices)
    setViewports(newViewports)
  }

  const handleRemoveViewport = (viewportId: string) => {
    setViewports(viewports.filter((v) => v.id !== viewportId))
    toast.success("Viewport removed")
  }

  const handleClearAllViewports = () => {
    setViewports([])
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

  const handleApplyOrientationToAll = (orientation: "portrait" | "landscape") => {
    setViewports(
      viewports.map((v) => ({ ...v, orientation }))
    )
  }

  const handleRefreshAll = () => {
    setViewports([...viewports])
  }

  const handleLoadDeviceSet = (newViewports: Viewport[]) => {
    setViewports(newViewports)
    toast.success("Device set loaded")
  }

  const handleExampleURL = () => {
    const example = "https://example.com"
    setUrl(example)
    handleLoadUrl(example)
  }

  const handleSelectRecentURL = (recentUrl: string) => {
    setUrl(recentUrl)
    handleLoadUrl(recentUrl)
  }

  // Calculate available space for viewports
  const availableWidth = dimensions.width < 1024 ? dimensions.width - 40 : (dimensions.width - 80) / (comparisonMode ? 2 : 3)
  const availableHeight = dimensions.height - 200

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <ErrorBoundary>
          {/* URL Input Section */}
          <div className="flex gap-2">
            <div className="flex-1">
              <URLInput
                url={url}
                onUrlChange={setUrl}
                onLoadUrl={handleLoadUrl}
              />
            </div>
            {recentURLs.length > 0 && (
              <RecentURLs
                recentURLs={recentURLs}
                onSelectURL={handleSelectRecentURL}
                onClearHistory={clearURLs}
              />
            )}
          </div>

          {/* Device Selection */}
          <EnhancedDeviceSelector
            devices={devices}
            onSelectDevice={handleAddViewport}
            selectedDeviceIds={viewports.map(v => v.device.id)}
          />

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <CustomDeviceDialog onAddDevice={handleAddCustomDevice} />

            <PresetBreakpoints onAddPreset={handleAddPresetDevices} />

            <BatchOperations
              devices={devices}
              onSelectDevices={handleBatchSelectDevices}
              onClearAll={handleClearAllViewports}
              onApplyOrientationToAll={handleApplyOrientationToAll}
              onRefreshAll={handleRefreshAll}
              hasViewports={viewports.length > 0}
            />

            <div className="h-6 w-px bg-border" />

            <DeviceSetsManager
              currentViewports={viewports}
              onLoadDeviceSet={handleLoadDeviceSet}
            />

            <ScreenshotManager />

            <PDFExport viewports={viewports} url={activeUrl} />

            <ShareConfig url={activeUrl} viewports={viewports} />

            <NetworkThrottling
              throttleMode={throttleMode}
              onThrottleModeChange={setThrottleMode}
            />

            <PerformancePanel url={activeUrl} />
          </div>

          {/* Comparison & Sync Controls */}
          {viewports.length > 0 && activeUrl && (
            <div className="space-y-4">
              <ComparisonMode
                enabled={comparisonMode}
                onToggle={setComparisonMode}
                viewportCount={viewports.length}
              />

              <SyncControls
                onScrollSyncChange={setScrollSync}
                onClickSyncChange={setClickSync}
              />
            </div>
          )}

          {/* Viewports Grid or Empty States */}
          {viewports.length === 0 ? (
            <EmptyDevicesState onSelectDevice={handleAddViewport} />
          ) : !activeUrl ? (
            <EmptyURLState onExampleURL={handleExampleURL} />
          ) : (
            <div
              className={`grid gap-6 ${
                comparisonMode && viewports.length >= 2
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {viewports.map((viewport) => (
                <EnhancedViewport
                  key={viewport.id}
                  viewport={viewport}
                  url={activeUrl}
                  onRemoveViewport={handleRemoveViewport}
                  onToggleOrientation={handleToggleOrientation}
                  availableWidth={availableWidth}
                  availableHeight={availableHeight}
                  scrollSync={comparisonMode || scrollSync}
                  clickSync={clickSync}
                  throttleMode={throttleMode}
                />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </main>
    </div>
  )
}
