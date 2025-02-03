import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { TeamProvider } from "@/components/team-provider"

import { Geist } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Black Rose",
  description: "Module based admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className}  antialiased`}>
         <ThemeProvider
            attribute="class"
            themes={["light", "dark", "legacy"]}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <TeamProvider>
                {children}
                <Toaster richColors/>
              </TeamProvider>
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
