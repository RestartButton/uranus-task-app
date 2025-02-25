'use client';

import "@/app/globals.css";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="">
        <div className={montserrat.className}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
