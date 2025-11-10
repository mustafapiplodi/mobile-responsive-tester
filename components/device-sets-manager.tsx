"use client"

import { useState, useEffect } from "react"
import { Save, FolderOpen, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { Viewport } from "@/app/page"

interface DeviceSet {
  id: string
  name: string
  viewports: Viewport[]
  createdAt: string
}

interface DeviceSetsManagerProps {
  currentViewports: Viewport[]
  onLoadDeviceSet: (viewports: Viewport[]) => void
}

export function DeviceSetsManager({
  currentViewports,
  onLoadDeviceSet,
}: DeviceSetsManagerProps) {
  const [savedSets, setSavedSets] = useState<DeviceSet[]>([])
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [loadDialogOpen, setLoadDialogOpen] = useState(false)
  const [setName, setSetName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadSavedSets()
  }, [])

  const loadSavedSets = () => {
    try {
      const stored = localStorage.getItem("device-sets")
      if (stored) {
        setSavedSets(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Failed to load device sets:", err)
    }
  }

  const saveDeviceSet = () => {
    if (!setName.trim()) {
      setError("Please enter a name for this device set")
      return
    }

    if (currentViewports.length === 0) {
      setError("No devices selected to save")
      return
    }

    const newSet: DeviceSet = {
      id: `set-${Date.now()}`,
      name: setName.trim(),
      viewports: currentViewports,
      createdAt: new Date().toISOString(),
    }

    const updatedSets = [...savedSets, newSet]
    setSavedSets(updatedSets)

    try {
      localStorage.setItem("device-sets", JSON.stringify(updatedSets))
      setSetName("")
      setError("")
      setSaveDialogOpen(false)
    } catch (err) {
      setError("Failed to save device set")
    }
  }

  const loadSet = (set: DeviceSet) => {
    onLoadDeviceSet(set.viewports)
    setLoadDialogOpen(false)
  }

  const deleteSet = (setId: string) => {
    const updatedSets = savedSets.filter((s) => s.id !== setId)
    setSavedSets(updatedSets)
    try {
      localStorage.setItem("device-sets", JSON.stringify(updatedSets))
    } catch (err) {
      console.error("Failed to delete device set:", err)
    }
  }

  return (
    <div className="flex gap-2">
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Set
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Device Set</DialogTitle>
            <DialogDescription>
              Save your current device selection for quick access later
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="set-name">Set Name</Label>
              <Input
                id="set-name"
                placeholder="e.g., Mobile Testing"
                value={setName}
                onChange={(e) => {
                  setSetName(e.target.value)
                  setError("")
                }}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Devices in set: {currentViewports.length}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentViewports.map((v) => (
                  <Badge key={v.id} variant="secondary">
                    {v.device.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveDeviceSet}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <FolderOpen className="w-4 h-4 mr-2" />
            Load Set
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Device Set</DialogTitle>
            <DialogDescription>
              Choose a saved device set to load
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {savedSets.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No saved device sets
              </p>
            ) : (
              <div className="space-y-3">
                {savedSets.map((set) => (
                  <div
                    key={set.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{set.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {set.viewports.length} device
                        {set.viewports.length !== 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(set.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => loadSet(set)}
                      >
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteSet(set.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
