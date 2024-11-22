import Image from "next/image";

const Home = () => {
  return (
    <main className="bg-[#127351] flex items-center justify-center h-screen">
      <Image
        // className="dark:invert"
        src="/logo-protege-meu-cerrado.png"
        alt="Protege Meu Cerrado logo"
        width={400}
        height={90}
        priority
      />
    </main>
  )
}

export default Home