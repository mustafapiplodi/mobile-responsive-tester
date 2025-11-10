"use client"

import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Device } from "@/app/page"
import { toast } from "sonner"

interface QuickStartMenuProps {
  devices: Device[]
  onSelectDevices: (deviceIds: string[]) => void
}

export function QuickStartMenu({ devices, onSelectDevices }: QuickStartMenuProps) {
  const quickStartPresets = {
    mobile: ["iphone-15-pro-max", "samsung-galaxy-s24", "google-pixel-8"],
    tablet: ["ipad-pro-13", "samsung-galaxy-tab-s9"],
    common: ["iphone-15-pro-max", "ipad-pro-13", "desktop-1920"],
    all: ["iphone-15", "samsung-galaxy-s24", "ipad-pro-11", "desktop-1920"],
  }

  const handleQuickStart = (preset: keyof typeof quickStartPresets) => {
    const deviceIds = quickStartPresets[preset]
    const availableDevices = deviceIds.filter(id =>
      devices.some(d => d.id === id)
    )

    if (availableDevices.length === 0) {
      toast.error("No devices found for this preset")
      return
    }

    onSelectDevices(availableDevices)
    toast.success(`Added ${availableDevices.length} devices`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Zap className="w-4 h-4 mr-2" />
          Quick Start
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Quick Start Presets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleQuickStart("mobile")}>
          📱 Popular Phones
          <span className="ml-auto text-xs text-muted-foreground">3 devices</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleQuickStart("tablet")}>
          📱 Popular Tablets
          <span className="ml-auto text-xs text-muted-foreground">2 devices</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleQuickStart("common")}>
          🎯 Common Breakpoints
          <span className="ml-auto text-xs text-muted-foreground">3 devices</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleQuickStart("all")}>
          ⭐ Full Test Suite
          <span className="ml-auto text-xs text-muted-foreground">4 devices</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
