import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import Authenticated from "./(auth)/authenticated";
import { Toaster } from "@/components/ui/toaster";
import { getProfile } from "@/actions/user";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Kalkulus - Platform tryout dan penjelasan soal.",
  description:
    "Platform untuk meningkatkan pengalaman ujian anda dengan tryout yang menarik dan penjelasan soal yang mudah dipahami.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = Authenticated();
  const profile = await getProfile();

  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body className="font-poppins">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <Providers isAuthenticated={isAuthenticated} profile={profile}>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
