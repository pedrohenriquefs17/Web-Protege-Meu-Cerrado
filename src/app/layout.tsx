import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Protege Meu Cerrado",
  description: "Projeto desenvolvido pelos alunos do IFTM",
};

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang="pt-br">
      <link rel="icon" href="logo-protege-meu-cerrado-mini.png" />
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout