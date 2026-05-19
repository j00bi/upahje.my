import type { Metadata } from "next";
import "./globals.css";
import { CategoryNav } from "@/components/navigation/CategoryNav";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/supabase/auth-context";

export const metadata: Metadata = {
  title: {
    default: "UpahJe.my",
    template: "%s | UpahJe.my",
  },
  description: "Malaysia's creative talent marketplace — hire photographers, videographers, content creators, and more. Browse verified portfolios, compare rates, book securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-white max-w-full overflow-x-hidden">
        <AuthProvider>
          <CategoryNav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
