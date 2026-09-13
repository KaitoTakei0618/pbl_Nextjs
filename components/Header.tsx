import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          学習管理サイト 
        </Link>

        <nav className="flex gap-6">
          <Link href="/tasks">Tasks</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/notes">Notes</Link>
        </nav>
      </div>
    </header>
  );
}