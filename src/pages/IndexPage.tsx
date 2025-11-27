import { MarkdownPreview } from "@/components/markdown/MarkdownPreview"
import { TableOfContents } from "@/components/TableOfContents"
import indexContent from "@/indexNote/index.md?raw"

export default function IndexPage() {
  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <MarkdownPreview content={indexContent} />
      </div>
      <aside className="hidden xl:block w-64 sticky top-24 self-start shrink-0">
        <TableOfContents content={indexContent} />
      </aside>
    </div>
  )
}
