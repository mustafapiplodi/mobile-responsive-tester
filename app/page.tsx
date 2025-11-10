"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { URLInput } from "@/components/url-input"
import { EnhancedDeviceSelector } from "@/components/enhanced-device-selector"
import { EnhancedViewport } from "@/components/enhanced-viewport"
import { DeviceMenu } from "@/components/device-menu"
import { ManageMenu } from "@/components/manage-menu"
import { ExportMenu } from "@/components/export-menu"
import { QuickStartMenu } from "@/components/quick-start-menu"
import { ShareConfig } from "@/components/share-config"
import { OnboardingCard } from "@/components/onboarding-card"
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
  const [showOnboarding, setShowOnboarding] = useState(true)

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
    const newViewports = deviceIds
      .filter(id => !viewports.some(v => v.device.id === id))
      .map(id => {
        const device = devices.find((d) => d.id === id)
        if (!device) return null
        return {
          id: `${id}-${Date.now()}-${Math.random()}`,
          device,
          orientation: "portrait" as "portrait" | "landscape",
        }
      })
      .filter((v): v is Viewport => v !== null)

    setViewports([...viewports, ...newViewports])
  }

  const handleQuickStartDevices = (deviceIds: string[]) => {
    const newViewports = deviceIds
      .map(id => {
        const device = devices.find((d) => d.id === id)
        if (!device) return null
        return {
          id: `${id}-${Date.now()}-${Math.random()}`,
          device,
          orientation: "portrait" as "portrait" | "landscape",
        }
      })
      .filter((v): v is Viewport => v !== null)

    setViewports(newViewports)
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
    toast.success("All viewports cleared")
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
    toast.success(`All viewports set to ${orientation}`)
  }

  const handleRefreshAll = () => {
    setViewports([...viewports])
    toast.success("All viewports refreshed")
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

  const handleTryExample = () => {
    const exampleUrl = "https://example.com"
    setUrl(exampleUrl)
    handleLoadUrl(exampleUrl)

    // Add some popular devices
    const popularDeviceIds = ["iphone-15-pro-max", "ipad-pro-13", "desktop-1920"]
    handleQuickStartDevices(popularDeviceIds)
  }

  const handleDismissOnboarding = () => {
    setShowOnboarding(false)
  }

  // Calculate available space for viewports
  const availableWidth = dimensions.width < 1024 ? dimensions.width - 40 : (dimensions.width - 80) / 3
  const availableHeight = dimensions.height - 200

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <ErrorBoundary>
          {/* Onboarding Card */}
          {showOnboarding && (
            <OnboardingCard
              onTryExample={handleTryExample}
              onDismiss={handleDismissOnboarding}
            />
          )}

          {/* URL Input Section */}
          <URLInput
            url={url}
            onUrlChange={setUrl}
            onLoadUrl={handleLoadUrl}
          />

          {/* Device Selection */}
          <EnhancedDeviceSelector
            devices={devices}
            onSelectDevice={handleAddViewport}
            selectedDeviceIds={viewports.map(v => v.device.id)}
          />

          {/* Action Bar - Organized into Grouped Menus */}
          <div className="flex flex-wrap items-center gap-2">
            <DeviceMenu
              devices={devices}
              onAddCustomDevice={handleAddCustomDevice}
              onAddPresetDevices={handleAddPresetDevices}
              onBatchSelectDevices={handleBatchSelectDevices}
              onClearAll={handleClearAllViewports}
              onApplyOrientationToAll={handleApplyOrientationToAll}
              onRefreshAll={handleRefreshAll}
              hasViewports={viewports.length > 0}
            />

            <QuickStartMenu
              devices={devices}
              onSelectDevices={handleQuickStartDevices}
            />

            <div className="h-6 w-px bg-border" />

            <ManageMenu
              currentViewports={viewports}
              onLoadDeviceSet={handleLoadDeviceSet}
              recentURLs={recentURLs}
              onSelectURL={handleSelectRecentURL}
              onClearHistory={clearURLs}
              hasViewports={viewports.length > 0}
            />

            {/* Progressive Disclosure: Only show export when there are viewports */}
            {viewports.length > 0 && (
              <ExportMenu viewports={viewports} url={activeUrl} />
            )}

            <ShareConfig url={activeUrl} viewports={viewports} />
          </div>

          {/* Viewports Grid or Empty States */}
          {viewports.length === 0 ? (
            <EmptyDevicesState onSelectDevice={handleAddViewport} />
          ) : !activeUrl ? (
            <EmptyURLState onExampleURL={handleExampleURL} />
          ) : (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {viewports.map((viewport) => (
                <EnhancedViewport
                  key={viewport.id}
                  viewport={viewport}
                  url={activeUrl}
                  onRemoveViewport={handleRemoveViewport}
                  onToggleOrientation={handleToggleOrientation}
                  availableWidth={availableWidth}
                  availableHeight={availableHeight}
                />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </main>
    </div>
  )
}
