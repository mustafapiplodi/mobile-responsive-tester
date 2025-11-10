import { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"

// Hook for managing recent URLs in localStorage
export function useRecentURLs(maxItems = 10) {
  const [recentURLs, setRecentURLs] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recent-urls")
    if (stored) {
      try {
        setRecentURLs(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse recent URLs:", e)
      }
    }
  }, [])

  const addURL = (url: string) => {
    const filtered = recentURLs.filter((u) => u !== url)
    const updated = [url, ...filtered].slice(0, maxItems)
    setRecentURLs(updated)
    localStorage.setItem("recent-urls", JSON.stringify(updated))
  }

  const clearURLs = () => {
    setRecentURLs([])
    localStorage.removeItem("recent-urls")
  }

  return { recentURLs, addURL, clearURLs }
}

// Hook for detecting online/offline status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" ? window.navigator.onLine : true
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return isOnline
}

// Hook for debounced search
export function useDebouncedSearch(value: string, delay = 300) {
  return useDebounce(value, delay)
}

// Hook for viewport dimensions
export function useViewportDimensions() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return dimensions
}

// Hook for managing localStorage with error handling
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (e) {
      console.error(`Error loading ${key} from localStorage:`, e)
      setError("Failed to load saved data")
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setError(null)
    } catch (e: any) {
      console.error(`Error saving ${key} to localStorage:`, e)
      if (e.name === "QuotaExceededError") {
        setError("Storage quota exceeded. Please clear some data.")
      } else {
        setError("Failed to save data")
      }
    }
  }

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
      setError(null)
    } catch (e) {
      console.error(`Error removing ${key} from localStorage:`, e)
      setError("Failed to remove data")
    }
  }

  return { value: storedValue, setValue, removeValue, error }
}

// Hook for intersection observer (lazy loading)
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}
