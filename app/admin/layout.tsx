import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./admin.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Admin — Mohammad Hasan Abbas",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${geist.variable} admin-root`}>{children}</div>;
}
