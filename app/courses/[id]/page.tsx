import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/lib/courses";

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CoursePage({
  params,
}: CoursePageProps) {
  const { id } = await params;

  const course = courses.find(
    (course) => course.id === id
  );

  if (!course) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/courses"
        className="text-sm text-gray-500 hover:text-black"
      >
        ← Coursesに戻る
      </Link>

      <div className="mt-6 rounded-lg border bg-white p-8">
        <h1 className="text-3xl font-bold">
          {course.name}
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              曜日・時限
            </p>

            <p className="font-medium">
              {course.day}・{course.period}限
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              教室
            </p>

            <p className="font-medium">
              {course.room}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              担当教員
            </p>

            <p className="font-medium">
              {course.teacher}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold">
            授業について
          </h2>

          <p className="mt-3 text-gray-600">
            {course.description}
          </p>
        </div>
      </div>
    </div>
  );
}