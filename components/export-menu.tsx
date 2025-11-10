"use client"

import { Download, Camera, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScreenshotManager } from "@/components/screenshot-manager"
import { PDFExport } from "@/components/pdf-export"
import type { Viewport } from "@/app/page"
import { useState } from "react"
import { toast } from "sonner"

interface ExportMenuProps {
  viewports: Viewport[]
  url: string
}

export function ExportMenu({ viewports, url }: ExportMenuProps) {
  const [screenshotDialogOpen, setScreenshotDialogOpen] = useState(false)
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false)

  const handleScreenshotClick = () => {
    if (viewports.length === 0) {
      toast.error("Add devices first to capture screenshots")
      return
    }
    setScreenshotDialogOpen(true)
  }

  const handlePDFClick = () => {
    if (viewports.length === 0) {
      toast.error("Add devices first to export PDF")
      return
    }
    setPdfDialogOpen(true)
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={viewports.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleScreenshotClick}>
            <Camera className="w-4 h-4 mr-2" />
            Capture Screenshots
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handlePDFClick}>
            <FileText className="w-4 h-4 mr-2" />
            Export as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ScreenshotManager
        dialogOpen={screenshotDialogOpen}
        onDialogChange={setScreenshotDialogOpen}
      />

      <PDFExport
        viewports={viewports}
        url={url}
        dialogOpen={pdfDialogOpen}
        onDialogChange={setPdfDialogOpen}
      />
    </div>
  )
}
