import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "./components/nav";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GoogleTagManager } from "@next/third-parties/google"

const jbm = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stempire Tutoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jbm.className} dark`}>
      <body>
        <UserProvider>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </UserProvider>
      </body>
      <GoogleTagManager gtmId="AW-11460557564" />
    </html>
  );
}
