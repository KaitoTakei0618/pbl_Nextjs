import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "学習管理サイト",
  description: "大学の課題や学習を管理します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <Provider>
          <Header />

          <main className="mx-auto max-w-6xl px-6 py-8">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}