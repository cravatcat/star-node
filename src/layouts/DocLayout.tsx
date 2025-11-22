import { type ReactNode, useState } from "react"
import { PanelLeft, PanelRight } from "lucide-react"

interface DocLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  toc?: ReactNode
}

export function DocLayout({ children, sidebar, toc }: DocLayoutProps) {
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left')

  return (
    <div className="flex gap-8">
      {/* Left Sidebar */}
      <aside 
        className={`sticky top-24 self-start shrink-0 transition-all duration-300 ease-in-out overflow-hidden
          ${activeSide === 'left' ? 'w-64 opacity-100' : 'w-0 opacity-0 xl:w-64 xl:opacity-100'}`}
      >
        <div className="w-64">
          {sidebar}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Mobile/Tablet Toolbar */}
        <div className="xl:hidden flex justify-between items-center mb-6 sticky top-16 z-10 bg-white/80 backdrop-blur-sm py-2 border-b border-gray-100">
          <button
            onClick={() => setActiveSide('left')}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeSide === 'left' 
                ? 'text-blue-600 bg-blue-50 font-medium' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <PanelLeft size={16} />
            <span>Menu</span>
          </button>

          {toc && (
            <button
              onClick={() => setActiveSide('right')}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeSide === 'right' 
                  ? 'text-blue-600 bg-blue-50 font-medium' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>On this page</span>
              <PanelRight size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {children}
          </div>
          
          {/* Right TOC */}
          {toc && (
            <aside 
              className={`sticky top-24 self-start shrink-0 transition-all duration-300 ease-in-out overflow-hidden
                ${activeSide === 'right' ? 'w-64 opacity-100' : 'w-0 opacity-0 xl:w-64 xl:opacity-100'}`}
            >
              <div className="w-64">
                {toc}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
