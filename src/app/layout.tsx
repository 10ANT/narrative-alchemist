import type { Metadata } from "next";
import { Outfit, Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const outfit = Outfit({
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: "%s | Narrative Alchemist",
    default: "Narrative Alchemist — AI Storytelling Agent",
  },
  description: "Multi-modal, knowledge-grounded storytelling powered by Azure AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className} ${outfit.className}`} style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
