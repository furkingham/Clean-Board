import { Navbar } from '@/components/navbar'
import { KeyholeIntro } from '@/components/keyhole-intro'
import { TrustBanner } from '@/components/trust-banner'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <KeyholeIntro />
      <TrustBanner />
    </main>
  )
}
