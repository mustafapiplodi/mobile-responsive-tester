"use client"

import { Smartphone, Tablet, Monitor, Trash2, RotateCw } from "lucide-react"
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

interface BatchOperationsProps {
  devices: Device[]
  onSelectDevices: (deviceIds: string[]) => void
  onClearAll: () => void
  onApplyOrientationToAll: (orientation: "portrait" | "landscape") => void
  onRefreshAll: () => void
  hasViewports: boolean
}

export function BatchOperations({
  devices,
  onSelectDevices,
  onClearAll,
  onApplyOrientationToAll,
  onRefreshAll,
  hasViewports,
}: BatchOperationsProps) {
  const handleSelectByCategory = (category: "phone" | "tablet" | "desktop") => {
    const filtered = devices
      .filter((d) => d.category === category)
      .map((d) => d.id)

    if (filtered.length === 0) {
      toast.error(`No ${category} devices found`)
      return
    }

    onSelectDevices(filtered)
    toast.success(`Added ${filtered.length} ${category}${filtered.length !== 1 ? 's' : ''}`)
  }

  const handleClearAll = () => {
    onClearAll()
    toast.success("All viewports cleared")
  }

  const handleApplyOrientation = (orientation: "portrait" | "landscape") => {
    onApplyOrientationToAll(orientation)
    toast.success(`Applied ${orientation} to all viewports`)
  }

  const handleRefreshAll = () => {
    onRefreshAll()
    toast.success("Refreshing all viewports")
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Quick Add
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Select by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSelectByCategory("phone")}>
            <Smartphone className="w-4 h-4 mr-2" />
            All Phones
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectByCategory("tablet")}>
            <Tablet className="w-4 h-4 mr-2" />
            All Tablets
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectByCategory("desktop")}>
            <Monitor className="w-4 h-4 mr-2" />
            All Desktops
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasViewports && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCw className="w-4 h-4 mr-2" />
                Apply to All
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Apply orientation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleApplyOrientation("portrait")}>
                Portrait
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleApplyOrientation("landscape")}>
                Landscape
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleRefreshAll}>
                <RotateCw className="w-4 h-4 mr-2" />
                Refresh All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </>
      )}
    </div>
  )
}
