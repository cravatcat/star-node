import { useEffect } from "react"

/**
 * Hook to update the last visited item in local storage
 */
export const useUpdateLastVisited = (key: string, value: string) => {
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, value)
    }
  }, [key, value])
}

/**
 * Helper to get the last visited item from local storage
 */
export const getLastVisited = (key: string, fallback: string) => {
  return localStorage.getItem(key) || fallback
}
