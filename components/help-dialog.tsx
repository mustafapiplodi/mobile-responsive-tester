"use client"

import { HelpCircle, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Help & Documentation</DialogTitle>
          <DialogDescription>
            Learn how to use Mobile Responsive Tester
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Getting Started */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
            <ol className="space-y-2 list-decimal list-inside text-sm">
              <li>Enter a website URL in the input field</li>
              <li>Select devices from the device selector</li>
              <li>Click "Load URL" to preview the website</li>
              <li>Use the controls to rotate, remove, or manage viewports</li>
            </ol>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium mb-1">Device Selection</h4>
                <p className="text-muted-foreground">
                  Choose from 50+ pre-configured devices or create custom devices with specific dimensions
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Device Sets</h4>
                <p className="text-muted-foreground">
                  Save your favorite device combinations and load them instantly
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Screenshots</h4>
                <p className="text-muted-foreground">
                  Capture screenshots of all viewports at once and download them
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Share Configuration</h4>
                <p className="text-muted-foreground">
                  Generate a shareable link with your URL and device selection
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Dark Mode</h4>
                <p className="text-muted-foreground">
                  Toggle between light and dark themes for comfortable viewing
                </p>
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Toggle dark mode</span>
                <Badge variant="outline">Ctrl + D</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Show help</span>
                <Badge variant="outline">?</Badge>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Tips</h3>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              <li>Test websites with HTTPS for better iframe compatibility</li>
              <li>Some websites may block iframe embedding for security</li>
              <li>Use the rotation button to quickly switch between portrait and landscape</li>
              <li>Create custom devices for specific testing requirements</li>
              <li>Device sets are saved in your browser's local storage</li>
            </ul>
          </section>

          {/* Browser Support */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Browser Support</h3>
            <p className="text-sm text-muted-foreground">
              This tool works best in modern browsers including Chrome, Firefox, Safari, and Edge.
              Some features may not work in older browsers.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
