
export interface MapItem {
  key: string | number
  value: any
}

export interface MapViewProps {
  data: MapItem[] | Map<string | number, any> | Record<string, any>
  title?: string
  className?: string
  highlightKeys?: (string | number)[]
  deletingKeys?: (string | number)[]
  isNested?: boolean
}

export interface LiveMapViewProps {
  data: MapItem[] | Map<string | number, any>
  title?: string
  className?: string
  highlightDuration?: number
  externalHighlightKeys?: (string | number)[]
}

declare global {
  type VisualMapItem = MapItem
}
