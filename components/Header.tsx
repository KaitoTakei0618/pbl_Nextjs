"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="relative border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          学習管理サイト
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/tasks">Tasks</Link>
          <Link href="/courses">Courses</Link>
          
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="rounded-lg border px-3 py-2 hover:bg-gray-100"
            aria-expanded={isAboutOpen}
          >
            About Me
          </button>
        </nav>
      </div>

      {isAboutOpen && (
        <div className="absolute right-6 top-full z-50 mt-2 w-80 rounded-xl border bg-white p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">About Me</h2>
              <p className="mt-1 text-sm text-gray-500">
                このサイトの作成者について
              </p>
            </div>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="text-xl text-gray-500 hover:text-black"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div>
              <p className="font-semibold">名前</p>
              <p className="text-gray-600">武井海渡 prince👑</p>
            </div>

            <div>
              <p className="font-semibold">所属</p>
              <p className="text-gray-600">
                法政大学 理工学部　彌冨lab
              </p>
            </div>

            <div>
              <p className="font-semibold">専門分野</p>
              <p className="text-gray-600">
                Web開発・機械学習・画像処理など
              </p>
            </div>

            <div>
              <p className="font-semibold">このサイトについて</p>
              <p className="text-gray-600">
                大学の課題や学習内容をまとめて管理するために作成しています。
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}