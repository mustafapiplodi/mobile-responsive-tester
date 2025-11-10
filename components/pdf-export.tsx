"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { Viewport } from "@/app/page"

interface PDFExportProps {
  viewports: Viewport[]
  url: string
}

export function PDFExport({ viewports, url }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [reportName, setReportName] = useState("responsive-test-report")
  const [includeNotes, setIncludeNotes] = useState(true)
  const [open, setOpen] = useState(false)

  const handleExport = async () => {
    if (viewports.length === 0) {
      toast.error("No viewports to export")
      return
    }

    setIsExporting(true)
    toast.loading("Generating PDF report...")

    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15

      // Title Page
      pdf.setFontSize(24)
      pdf.text("Responsive Testing Report", margin, 30)

      pdf.setFontSize(12)
      pdf.text(`URL: ${url}`, margin, 45)
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, 55)
      pdf.text(`Viewports: ${viewports.length}`, margin, 65)

      // Capture each viewport
      const viewportCards = document.querySelectorAll('[data-viewport-id]')

      for (let i = 0; i < viewportCards.length; i++) {
        const card = viewportCards[i] as HTMLElement
        const viewportId = card.getAttribute('data-viewport-id')
        const viewport = viewports.find((v) => v.id === viewportId)

        if (!viewport) continue

        // Add new page for each viewport (except first)
        if (i > 0 || true) {
          pdf.addPage()
        }

        // Viewport details
        pdf.setFontSize(16)
        pdf.text(viewport.device.name, margin, 20)

        pdf.setFontSize(10)
        const details = [
          `Dimensions: ${viewport.orientation === "portrait" ? viewport.device.width : viewport.device.height} × ${viewport.orientation === "portrait" ? viewport.device.height : viewport.device.width}`,
          `DPR: ${viewport.device.dpr}x`,
          `Orientation: ${viewport.orientation}`,
          `Category: ${viewport.device.category}`,
        ]

        details.forEach((detail, index) => {
          pdf.text(detail, margin, 30 + (index * 7))
        })

        // Capture screenshot
        try {
          const canvas = await html2canvas(card, {
            scale: 0.5,
            useCORS: true,
            allowTaint: true,
          })

          const imgData = canvas.toDataURL('image/jpeg', 0.7)
          const imgWidth = pageWidth - (margin * 2)
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          // Check if image fits on page, otherwise scale down
          const maxHeight = pageHeight - 70
          const finalHeight = Math.min(imgHeight, maxHeight)
          const finalWidth = (canvas.width * finalHeight) / canvas.height

          pdf.addImage(imgData, 'JPEG', margin, 60, finalWidth, finalHeight)
        } catch (err) {
          console.error(`Failed to capture viewport ${viewport.id}:`, err)
          pdf.text("Screenshot capture failed", margin, 70)
        }
      }

      // Save PDF
      pdf.save(`${reportName}.pdf`)

      toast.dismiss()
      toast.success("PDF report generated successfully!")
      setOpen(false)
    } catch (error) {
      console.error("PDF export failed:", error)
      toast.dismiss()
      toast.error("Failed to generate PDF report")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={viewports.length === 0}>
          <FileText className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export PDF Report</DialogTitle>
          <DialogDescription>
            Generate a PDF report with all viewport screenshots
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="report-name"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <p className="text-muted-foreground">
                This will generate a PDF with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>{viewports.length} viewport{viewports.length !== 1 ? 's' : ''}</li>
                <li>Device specifications</li>
                <li>Screenshots of each viewport</li>
                <li>Test metadata</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Generating..." : "Generate PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
