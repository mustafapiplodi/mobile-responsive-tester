"use client"

import { useState } from "react"
import { Search, Smartphone, Tablet, Monitor, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Device } from "@/app/page"

interface DeviceSelectorProps {
  devices: Device[]
  onSelectDevice: (deviceId: string) => void
  selectedDeviceIds: string[]
}

export function DeviceSelector({
  devices,
  onSelectDevice,
  selectedDeviceIds,
}: DeviceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "phone":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      case "desktop":
        return <Monitor className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || device.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(devices.map((d) => d.category)))

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedCategory(selectedCategory === category ? null : category)
                }
              >
                {getCategoryIcon(category)}
                <span className="ml-2 capitalize">{category}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {filteredDevices.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No devices found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredDevices.map((device) => {
                const isSelected = selectedDeviceIds.includes(device.id)
                return (
                  <button
                    key={device.id}
                    onClick={() => !isSelected && onSelectDevice(device.id)}
                    disabled={isSelected}
                    className={`
                      flex items-center justify-between p-3 rounded-lg border text-left transition-colors
                      ${
                        isSelected
                          ? "bg-muted border-muted cursor-not-allowed opacity-60"
                          : "hover:bg-accent hover:border-accent-foreground/20 cursor-pointer"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {getCategoryIcon(device.category)}
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          {device.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {device.width} × {device.height}
                        </p>
                      </div>
                    </div>
                    {isSelected ? (
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        Active
                      </Badge>
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
