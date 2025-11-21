import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { NavBar } from "@/components/NavBar"

function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

export function MainLayout() {
  return (
    <div className="min-h-svh bg-background font-sans antialiased">
      <NavBar />
      <main className="container mx-auto py-6">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
