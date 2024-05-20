import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/utils/useProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Happy Homes",
  description: "Technical Test - Alexius Adi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} bg-blue-25 max-container border rounded-xl p-10 m-10 border-black`}
      >
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
