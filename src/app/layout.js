import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"] });

export const metadata = {
  title: "Black Fox Metaverse",
  description: "Your Vison | Our Mission | One Creation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
