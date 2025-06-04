import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider"; // ✅ This is your Client Component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Interview",
  description: "AI personalized Interview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sidebar`}>
        {/* ✅ FIXED: Properly closed <Provider> */}
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
