import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { TrustBanner } from '@/components/trust-banner'
import Dashboard from '@/dashboard/page'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustBanner />
      <Dashboard />
    </main>
  )
}
