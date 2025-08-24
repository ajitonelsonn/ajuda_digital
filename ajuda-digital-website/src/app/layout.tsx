import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollProgress from "../components/animations/ScrollProgress";
import { LanguageProvider } from "../contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://ajuda-digital.com"),
  title: "Ajuda Digital - Homegrown Government Chatbot by Timorese Youth",
  description:
    "AI-powered government service assistant for Timor-Leste citizens. Get instant answers about procedures, documents, and requirements in English, Portuguese and Tetum.",
  keywords:
    "Timor-Leste, government services, AI chatbot, SEA-LION, digital transformation",
  authors: [{ name: "Ajuda Digital Team" }],
  openGraph: {
    title: "Ajuda Digital - Government Services Made Easy",
    description: "AI-powered assistant for Timor-Leste government services",
    url: "https://ajuda-digital.com",
    siteName: "Ajuda Digital",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Ajuda Digital Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajuda Digital - Government Services Made Easy",
    description: "AI-powered assistant for Timor-Leste government services",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
