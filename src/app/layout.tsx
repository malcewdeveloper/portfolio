import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";

const golos = Golos_Text({subsets: ['latin']}) 

export const metadata: Metadata = {
  title: "Malcew Developer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={ `${golos.className} min-w-80` }>{ children }</body>
    </html>
  );
}
