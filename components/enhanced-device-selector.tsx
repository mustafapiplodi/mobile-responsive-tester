"use client"

import { useState } from "react"
import { Search, Smartphone, Tablet, Monitor, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useDebouncedSearch } from "@/lib/hooks"
import type { Device } from "@/app/page"
import { useRef } from "react"

interface EnhancedDeviceSelectorProps {
  devices: Device[]
  onSelectDevice: (deviceId: string) => void
  selectedDeviceIds: string[]
}

export function EnhancedDeviceSelector({
  devices,
  onSelectDevice,
  selectedDeviceIds,
}: EnhancedDeviceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [debouncedSearch] = useDebouncedSearch(searchQuery, 300)

  const parentRef = useRef<HTMLDivElement>(null)

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
      .includes(debouncedSearch.toLowerCase())
    const matchesCategory = !selectedCategory || device.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(devices.map((d) => d.category)))

  // Virtual scrolling
  const rowVirtualizer = useVirtualizer({
    count: filteredDevices.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 5,
  })

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
              aria-label="Search devices"
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
                aria-label={`Filter by ${category}`}
              >
                {getCategoryIcon(category)}
                <span className="ml-2 capitalize">{category}</span>
              </Button>
            ))}
          </div>
        </div>

        <div
          ref={parentRef}
          className="max-h-[400px] overflow-y-auto"
          style={{ contain: "strict" }}
        >
          {filteredDevices.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No devices found
            </p>
          ) : (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const device = filteredDevices[virtualRow.index]
                const isSelected = selectedDeviceIds.includes(device.id)

                return (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <button
                      onClick={() => !isSelected && onSelectDevice(device.id)}
                      disabled={isSelected}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg border text-left transition-colors mb-2
                        ${
                          isSelected
                            ? "bg-muted border-muted cursor-not-allowed opacity-60"
                            : "hover:bg-accent hover:border-accent-foreground/20 cursor-pointer"
                        }
                      `}
                      aria-label={`Select ${device.name}`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {getCategoryIcon(device.category)}
                        <div className="min-w-0 flex-1">
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
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {filteredDevices.length > 0 && (
          <div className="text-xs text-muted-foreground text-center">
            Showing {filteredDevices.length} of {devices.length} devices
          </div>
        )}
      </div>
    </Card>
  )
}
