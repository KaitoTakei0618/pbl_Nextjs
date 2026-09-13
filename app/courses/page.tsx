import Link from "next/link";
import { courses } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>

        <p className="mt-2 text-gray-600">
          履修している授業を確認できます。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="rounded-lg border bg-white p-6 transition hover:shadow-md"
          >
            <h2 className="text-xl font-bold">
              {course.name}
            </h2>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>
                {course.day}・{course.period}限
              </p>

              <p>教室：{course.room}</p>

              <p>担当：{course.teacher}</p>
            </div>

            <p className="mt-5 text-sm font-medium">
              詳細を見る →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}