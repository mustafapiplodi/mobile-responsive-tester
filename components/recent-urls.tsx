"use client"

import { History, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface RecentURLsProps {
  recentURLs: string[]
  onSelectURL: (url: string) => void
  onClearHistory: () => void
}

export function RecentURLs({ recentURLs, onSelectURL, onClearHistory }: RecentURLsProps) {
  const handleClear = () => {
    onClearHistory()
    toast.success("History cleared")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="w-4 h-4 mr-2" />
          Recent
          {recentURLs.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {recentURLs.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Recent URLs
          {recentURLs.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={handleClear}
              aria-label="Clear history"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recentURLs.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            No recent URLs
          </div>
        ) : (
          recentURLs.map((url, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onSelectURL(url)}
              className="cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm">{url}</div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
