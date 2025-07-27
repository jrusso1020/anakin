import React from "react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span className="text-xs font-medium">Dark</span>
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2m-2.78-7.78l-1.42 1.42M5.64 18.36l-1.42 1.42" />
          </svg>
          <span className="text-xs font-medium">Light</span>
        </>
      )}
    </Button>
  )
}
