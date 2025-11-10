"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Device } from "@/app/page"

interface CustomDeviceDialogProps {
  onAddDevice: (device: Device) => void
}

export function CustomDeviceDialog({ onAddDevice }: CustomDeviceDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [dpr, setDpr] = useState("1")
  const [category, setCategory] = useState<"phone" | "tablet" | "desktop">("phone")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Device name is required"
    }

    const widthNum = parseInt(width)
    if (!width || isNaN(widthNum) || widthNum < 1 || widthNum > 10000) {
      newErrors.width = "Width must be between 1 and 10000"
    }

    const heightNum = parseInt(height)
    if (!height || isNaN(heightNum) || heightNum < 1 || heightNum > 10000) {
      newErrors.height = "Height must be between 1 and 10000"
    }

    const dprNum = parseFloat(dpr)
    if (!dpr || isNaN(dprNum) || dprNum < 0.5 || dprNum > 5) {
      newErrors.dpr = "DPR must be between 0.5 and 5"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newDevice: Device = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      width: parseInt(width),
      height: parseInt(height),
      dpr: parseFloat(dpr),
      category,
    }

    onAddDevice(newDevice)

    // Reset form
    setName("")
    setWidth("")
    setHeight("")
    setDpr("1")
    setCategory("phone")
    setErrors({})
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Custom Device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Custom Device</DialogTitle>
            <DialogDescription>
              Create a custom device viewport with specific dimensions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                placeholder="e.g., Custom Phone"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="390"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className={errors.width ? "border-destructive" : ""}
                />
                {errors.width && (
                  <p className="text-sm text-destructive">{errors.width}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="844"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={errors.height ? "border-destructive" : ""}
                />
                {errors.height && (
                  <p className="text-sm text-destructive">{errors.height}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dpr">Device Pixel Ratio</Label>
              <Select value={dpr} onValueChange={setDpr}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="2.5">2.5x</SelectItem>
                  <SelectItem value="3">3x</SelectItem>
                  <SelectItem value="3.5">3.5x</SelectItem>
                  <SelectItem value="4">4x</SelectItem>
                </SelectContent>
              </Select>
              {errors.dpr && (
                <p className="text-sm text-destructive">{errors.dpr}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as "phone" | "tablet" | "desktop")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Device</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
