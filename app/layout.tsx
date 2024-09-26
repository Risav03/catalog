import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const circularStd = localFont({
  src: "./fonts/CircularStd.ttf",
  variable: "--font-circular-std",
  weight: "100 200 300 700",
});

export const metadata: Metadata = {
  title: "Bitcoin Live Price",
  description: "A website to check the latest Bitcoin stats.",
  openGraph: {
    title: "Bitcoin Live Price",
  description: "A website to check the latest Bitcoin stats.",
    url: 'https://bitcoin-price-pi.vercel.app/',
    siteName: 'Bitcoin Live Price',
    images: [
      {
        url: 'https://bitcoin-price-pi.vercel.app/bitcoin.png', 
        width: 800,
        height: 600,
      },
      {
        url: 'https://bitcoin-price-pi.vercel.app/bitcoin.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${circularStd.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
