import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ArrayDisplay() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Array Visualization</h1>
        <p className="text-muted-foreground mt-2">
          Visualizing Array operations and memory layout.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-muted/30 rounded-md border border-dashed">
            <p className="text-muted-foreground">Array visualizer implementation in progress...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
