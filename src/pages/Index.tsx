import { Header } from "@/components/site/Header"
import { HomeHero } from "@/components/site/HomeHero"

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header variant="solid" />
      <HomeHero />
    </main>
  )
}

export default Index
