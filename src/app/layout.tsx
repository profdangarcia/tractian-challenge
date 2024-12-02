import Image from "next/image";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { fetchCompanies } from "../services/companies";
import CompanySelector from "../components/CompanySelector";
import { CompanyProvider } from "../contexts/CompanyContext";

import "./globals.css";

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

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companies = await fetchCompanies();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoRegular.variable} antialiased`}
      >
        <CompanyProvider>
          <header className="bg-secondary p-4 flex items-center justify-between font-[family-name:var(--font-inter)]">
            <Image
              src="/logo.svg"
              alt="Tractian logomark"
              width={102.95}
              height={14}
            />
            <CompanySelector companies={companies} />
          </header>
          {children}
        </CompanyProvider>
      </body>
    </html>
  );
}
