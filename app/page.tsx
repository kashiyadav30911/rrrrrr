import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TemplatesSection from '@/components/TemplatesSection'
import FeaturesSection from '@/components/FeaturesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <HeroSection />
        <TemplatesSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
