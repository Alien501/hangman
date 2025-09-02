import Header from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'

export default function MainLayout({
  children,
}: {
  children: React.JSX.Element
}) {
  return (
    <div className="h-screen w-full overflow-hidden relative">
      <Header />
      <div className="h-[calc(100vh-56px)] w-full bg-background">
        {children}
      </div>
      <Toaster expand={false} richColors />
      <span className="absolute right-4 bottom-4 text-muted">V:0.1</span>
    </div>
  )
}
