import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/ibm-plex-serif/400.css";
import "@fontsource/ibm-plex-serif/500.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TokenStyle from "@/components/TokenStyle";
import WaterRipple from "@/components/effects/WaterRipple";

export const metadata: Metadata = {
  metadataBase: new URL("https://ridhwansalaudeen.com"),
  title: {
    default: "Ridhwan Salaudeen — Product designer",
    template: "%s — Ridhwan Salaudeen",
  },
  description:
    "Ridhwan Salaudeen is a product designer and developer who builds scalable products that feel natural to use.",
  openGraph: { siteName: "Ridhwan Salaudeen", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <TokenStyle />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WaterRipple />
      </body>
    </html>
  );
}
