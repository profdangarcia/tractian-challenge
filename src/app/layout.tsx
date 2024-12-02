import Image from "next/image";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Logo from "../../public/logo.png";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

const robotoRegular = localFont({
  src: "./fonts/RobotoRegular.ttf",
  variable: "--font-roboto",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tractian | Front-end Challenge",
  description: "A Tree View Application that shows companies Assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoRegular.variable} antialiased`}
      >
        <header className="bg-secondary p-4">
          <Image
            src={Logo}
            alt="Tractian logomark"
            width={102.95}
            height={14}
          />
        </header>
        {children}
      </body>
    </html>
  );
}
