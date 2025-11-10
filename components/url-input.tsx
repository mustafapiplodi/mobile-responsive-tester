"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface URLInputProps {
  url: string
  onUrlChange: (url: string) => void
  onLoadUrl: (url: string) => void
}

export function URLInput({ url, onUrlChange, onLoadUrl }: URLInputProps) {
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    let finalUrl = url.trim()

    // Add protocol if missing
    if (!finalUrl.match(/^https?:\/\//i)) {
      finalUrl = `https://${finalUrl}`
    }

    // Validate URL
    try {
      new URL(finalUrl)
      onLoadUrl(finalUrl)
    } catch {
      setError("Please enter a valid URL")
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter website URL (e.g., example.com)"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className={error ? "border-destructive" : ""}
          />
          {error && (
            <p className="text-sm text-destructive mt-1">{error}</p>
          )}
        </div>
        <Button type="submit" className="sm:w-auto">
          <ExternalLink className="w-4 h-4 mr-2" />
          Load URL
        </Button>
      </form>
    </Card>
  )
}
