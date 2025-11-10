"use client"

import { Package, Save, FolderOpen, History, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeviceSetsManager } from "@/components/device-sets-manager"
import { RecentURLs } from "@/components/recent-urls"
import type { Viewport } from "@/app/page"
import { useState } from "react"

interface ManageMenuProps {
  currentViewports: Viewport[]
  onLoadDeviceSet: (viewports: Viewport[]) => void
  recentURLs: string[]
  onSelectURL: (url: string) => void
  onClearHistory: () => void
  hasViewports: boolean
}

export function ManageMenu({
  currentViewports,
  onLoadDeviceSet,
  recentURLs,
  onSelectURL,
  onClearHistory,
  hasViewports,
}: ManageMenuProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [loadDialogOpen, setLoadDialogOpen] = useState(false)

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Package className="w-4 h-4 mr-2" />
            Manage
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Manage Setup</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setSaveDialogOpen(true)}
            disabled={!hasViewports}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Device Set
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setLoadDialogOpen(true)}>
            <FolderOpen className="w-4 h-4 mr-2" />
            Load Device Set
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeviceSetsManager
        currentViewports={currentViewports}
        onLoadDeviceSet={onLoadDeviceSet}
        saveDialogOpen={saveDialogOpen}
        loadDialogOpen={loadDialogOpen}
        onSaveDialogChange={setSaveDialogOpen}
        onLoadDialogChange={setLoadDialogOpen}
      />

      {recentURLs.length > 0 && (
        <RecentURLs
          recentURLs={recentURLs}
          onSelectURL={onSelectURL}
          onClearHistory={onClearHistory}
        />
      )}
    </div>
  )
}
