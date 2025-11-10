"use client"

import { Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface NetworkThrottlingProps {
  throttleMode: "none" | "3g" | "4g" | "5g"
  onThrottleModeChange: (mode: "none" | "3g" | "4g" | "5g") => void
}

export function NetworkThrottling({
  throttleMode,
  onThrottleModeChange,
}: NetworkThrottlingProps) {
  const getModeBadge = () => {
    if (throttleMode === "none") return null

    return (
      <Badge variant="secondary" className="ml-2 uppercase">
        {throttleMode}
      </Badge>
    )
  }

  const getModeDescription = (mode: string) => {
    switch (mode) {
      case "none":
        return "No throttling"
      case "3g":
        return "~3 second delay"
      case "4g":
        return "~1 second delay"
      case "5g":
        return "~200ms delay"
      default:
        return ""
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Gauge className="w-4 h-4 mr-2" />
          Network
          {getModeBadge()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Network Throttling</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={throttleMode}
          onValueChange={(value) =>
            onThrottleModeChange(value as "none" | "3g" | "4g" | "5g")
          }
        >
          <DropdownMenuRadioItem value="none">
            <div>
              <div className="font-medium">None</div>
              <div className="text-xs text-muted-foreground">
                {getModeDescription("none")}
              </div>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="5g">
            <div>
              <div className="font-medium">5G</div>
              <div className="text-xs text-muted-foreground">
                {getModeDescription("5g")}
              </div>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="4g">
            <div>
              <div className="font-medium">4G</div>
              <div className="text-xs text-muted-foreground">
                {getModeDescription("4g")}
              </div>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="3g">
            <div>
              <div className="font-medium">3G</div>
              <div className="text-xs text-muted-foreground">
                {getModeDescription("3g")}
              </div>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
