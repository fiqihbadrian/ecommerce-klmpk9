import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@/components/pwa-register";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nine Store",
  description: "Nine store adalah aplikasi e-commerce yang menjual produk fashion dan ini tugas untuk mata kuliah UI/UX Design.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nine Store",
  },
  icons: {
    apple: "/logo-nine.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6E0D15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
