import { AuthProvider } from '@/context/auth';
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Meow_Script, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const meowScript = Meow_Script({
  variable: "--font-meow",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atria Summer of Code",
  description: "The premier platform for Atria's largest open-source collaboration.",
};

import { AppShell } from "@/components/layout/AppShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${meowScript.variable} ${jetbrainsMono.variable} antialiased font-sans bg-surface text-ink`}
      >
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
