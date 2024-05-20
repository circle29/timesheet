import { Nunito } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return <main className="flex justify-center items-center">{children}</main>;
}
