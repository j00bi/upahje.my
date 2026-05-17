import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/supabase/auth-context";

export const metadata: Metadata = {
  title: {
    default: "UpahJe.my",
    template: "%s | UpahJe.my",
  },
  description: "Malaysian freelance marketplace for labour and technical talent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#eefdf5_100%)] text-slate-950 max-w-full overflow-x-hidden">
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
