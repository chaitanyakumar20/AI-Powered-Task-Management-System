"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ClipboardList } from "lucide-react"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <ClipboardList className="h-6 w-6" />
        <span className="hidden sm:inline-block font-bold text-xl">TaskAI</span>
      </Link>
      <Link
        href="/tasks"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tasks"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Tasks
      </Link>
      <Link
        href="/projects"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/projects"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Projects
      </Link>
      <Link
        href="/analytics"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/analytics"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Analytics
      </Link>
    </nav>
  )
}