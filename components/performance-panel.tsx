"use client"

import { useState } from "react"
import { Gauge, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PerformancePanelProps {
  url: string
}

export function PerformancePanel({ url }: PerformancePanelProps) {
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState<{
    responsive: boolean
    viewport: boolean
    images: boolean
    fonts: boolean
  } | null>(null)

  const analyzeUrl = async () => {
    if (!url) return

    setLoading(true)

    // Simulate analysis (in production, this would call Lighthouse API or similar)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock insights
    setInsights({
      responsive: Math.random() > 0.3,
      viewport: Math.random() > 0.2,
      images: Math.random() > 0.4,
      fonts: Math.random() > 0.5,
    })

    setLoading(false)
  }

  const getScoreColor = (passed: boolean) => {
    return passed ? "text-green-500" : "text-orange-500"
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!url}>
          <Gauge className="w-4 h-4 mr-2" />
          Performance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Performance Insights</DialogTitle>
          <DialogDescription>
            Quick mobile-friendly analysis for {url}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {!insights ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Click "Analyze" to get mobile-friendly insights
              </p>
              <Button onClick={analyzeUrl} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mobile-Friendly Checks</CardTitle>
                  <CardDescription>
                    Basic mobile optimization analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`w-4 h-4 ${getScoreColor(insights.responsive)}`} />
                      <span className="text-sm">Responsive Design</span>
                    </div>
                    <Badge variant={insights.responsive ? "default" : "secondary"}>
                      {insights.responsive ? "✓ Passed" : "⚠ Review"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`w-4 h-4 ${getScoreColor(insights.viewport)}`} />
                      <span className="text-sm">Viewport Meta Tag</span>
                    </div>
                    <Badge variant={insights.viewport ? "default" : "secondary"}>
                      {insights.viewport ? "✓ Passed" : "⚠ Review"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`w-4 h-4 ${getScoreColor(insights.images)}`} />
                      <span className="text-sm">Optimized Images</span>
                    </div>
                    <Badge variant={insights.images ? "default" : "secondary"}>
                      {insights.images ? "✓ Passed" : "⚠ Review"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`w-4 h-4 ${getScoreColor(insights.fonts)}`} />
                      <span className="text-sm">Legible Font Sizes</span>
                    </div>
                    <Badge variant={insights.fonts ? "default" : "secondary"}>
                      {insights.fonts ? "✓ Passed" : "⚠ Review"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                    <li>Test on multiple real devices for accurate results</li>
                    <li>Optimize images for faster mobile loading</li>
                    <li>Ensure tap targets are at least 48x48 pixels</li>
                    <li>Use responsive CSS units (rem, em, %, vw, vh)</li>
                    <li>Test with slow 3G network throttling</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button size="sm" onClick={analyzeUrl} disabled={loading}>
                  Re-analyze
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setInsights(null)}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
