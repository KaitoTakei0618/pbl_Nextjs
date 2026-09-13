import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        学習管理サイト
      </h1>

      <p className="mt-2 text-gray-600">
        大学の課題・授業をまとめて管理します。
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Link
          href="/tasks"
          className="rounded-lg border bg-white p-6 transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Tasks
          </h2>

          <p className="mt-2 text-gray-600">
            課題と締切を管理します。
          </p>

          <p className="mt-4 text-sm font-medium">
            Tasksを開く →
          </p>
        </Link>

        <Link
          href="/courses"
          className="rounded-lg border bg-white p-6 transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">
            Courses
          </h2>

          <p className="mt-2 text-gray-600">
            履修している授業を管理します。
          </p>

          <p className="mt-4 text-sm font-medium">
            Coursesを開く →
          </p>
        </Link>
      </div>
    </div>
  );
}