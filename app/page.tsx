export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        学習管理サイト 
      </h1>

      <p className="mt-2 text-gray-600">
        大学の課題・授業・プロジェクト・学習メモをまとめて管理します。
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            Tasks
          </h2>
          <p className="mt-2 text-gray-600">
            課題と締切を管理します。
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            Courses
          </h2>
          <p className="mt-2 text-gray-600">
            履修している授業を管理します。
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            Projects
          </h2>
          <p className="mt-2 text-gray-600">
            PBLや研究などの進捗を管理します。
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold">
            Notes
          </h2>
          <p className="mt-2 text-gray-600">
            学習中に残したメモを確認します。
          </p>
        </div>
      </div>
    </div>
  );
}