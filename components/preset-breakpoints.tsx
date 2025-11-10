"use client"

import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import type { Device } from "@/app/page"
import { toast } from "sonner"

interface PresetBreakpointsProps {
  onAddPreset: (devices: Device[]) => void
}

const commonBreakpoints = {
  mobile: [320, 375, 414],
  tablet: [768, 834, 1024],
  desktop: [1280, 1440, 1920],
}

const frameworkPresets = {
  tailwind: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  bootstrap: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  material: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}

export function PresetBreakpoints({ onAddPreset }: PresetBreakpointsProps) {
  const createDevicesFromWidths = (
    widths: number[],
    prefix: string
  ): Device[] => {
    return widths.map((width) => ({
      id: `preset-${prefix}-${width}`,
      name: `${prefix} ${width}px`,
      width,
      height: width < 768 ? 844 : 1024,
      dpr: width < 768 ? 2 : 1,
      category: (width < 768 ? "phone" : width < 1280 ? "tablet" : "desktop") as "phone" | "tablet" | "desktop",
    }))
  }

  const handleCommonBreakpoints = (category: "mobile" | "tablet" | "desktop") => {
    const devices = createDevicesFromWidths(
      commonBreakpoints[category],
      category
    )
    onAddPreset(devices)
    toast.success(`Added ${devices.length} ${category} breakpoints`)
  }

  const handleFrameworkPreset = (framework: "tailwind" | "bootstrap" | "material") => {
    const breakpoints = Object.entries(frameworkPresets[framework])
      .filter(([_, width]) => width > 0)
      .map(([name, width]) => width)

    const devices = createDevicesFromWidths(breakpoints, framework)
    onAddPreset(devices)
    toast.success(`Added ${framework} breakpoints`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Layers className="w-4 h-4 mr-2" />
          Presets
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Preset Breakpoints</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Common Breakpoints</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleCommonBreakpoints("mobile")}>
              Mobile (320, 375, 414px)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCommonBreakpoints("tablet")}>
              Tablet (768, 834, 1024px)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCommonBreakpoints("desktop")}>
              Desktop (1280, 1440, 1920px)
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Framework Presets</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleFrameworkPreset("tailwind")}>
              Tailwind CSS
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFrameworkPreset("bootstrap")}>
              Bootstrap
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFrameworkPreset("material")}>
              Material Design
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
