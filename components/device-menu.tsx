"use client"

import { Plus, Layers, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CustomDeviceDialog } from "@/components/custom-device-dialog"
import { PresetBreakpoints } from "@/components/preset-breakpoints"
import { BatchOperations } from "@/components/batch-operations"
import type { Device } from "@/app/page"
import { useState } from "react"

interface DeviceMenuProps {
  devices: Device[]
  onAddCustomDevice: (device: Device) => void
  onAddPresetDevices: (devices: Device[]) => void
  onBatchSelectDevices: (deviceIds: string[]) => void
  onClearAll: () => void
  onApplyOrientationToAll: (orientation: "portrait" | "landscape") => void
  onRefreshAll: () => void
  hasViewports: boolean
}

export function DeviceMenu({
  devices,
  onAddCustomDevice,
  onAddPresetDevices,
  onBatchSelectDevices,
  onClearAll,
  onApplyOrientationToAll,
  onRefreshAll,
  hasViewports,
}: DeviceMenuProps) {
  const [customDialogOpen, setCustomDialogOpen] = useState(false)

  return (
    <div className="flex gap-2 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Add Devices</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setCustomDialogOpen(true)}>
            <Wand2 className="w-4 h-4 mr-2" />
            Custom Device
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomDeviceDialog
        onAddDevice={onAddCustomDevice}
        open={customDialogOpen}
        onOpenChange={setCustomDialogOpen}
      />

      <PresetBreakpoints onAddPreset={onAddPresetDevices} />

      <BatchOperations
        devices={devices}
        onSelectDevices={onBatchSelectDevices}
        onClearAll={onClearAll}
        onApplyOrientationToAll={onApplyOrientationToAll}
        onRefreshAll={onRefreshAll}
        hasViewports={hasViewports}
      />
    </div>
  )
}
