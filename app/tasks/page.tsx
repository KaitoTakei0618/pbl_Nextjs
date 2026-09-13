"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type Task = {
  id: number;
  title: string;
  course: string;
  deadline: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "PBLレポートを作成する",
    course: "PBL",
    deadline: "2026-09-20",
    completed: false,
  },
  {
    id: 2,
    title: "画像処理の復習",
    course: "デジタル画像処理",
    deadline: "2026-09-23",
    completed: false,
  },
  {
    id: 3,
    title: "データベースの復習",
    course: "データベース",
    deadline: "2026-09-12",
    completed: true,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [isLoaded, setIsLoaded] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [course, setCourse] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [filter, setFilter] =
    useState<Filter>("all");

  // localStorageから課題を読み込む
  useEffect(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        const parsedTasks: Task[] =
          JSON.parse(savedTasks);

        setTasks(parsedTasks);
      } catch (error) {
        console.error(
          "課題データの読み込みに失敗しました。",
          error
        );
      }
    }

    setIsLoaded(true);
  }, []);

  // tasksが変化したらlocalStorageへ保存
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks, isLoaded]);

  // 完了・未完了を切り替える
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );
  };

  // 新しい課題を追加
  const addTask = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !title ||
      !course ||
      !deadline
    ) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      course,
      deadline,
      completed: false,
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setTitle("");
    setCourse("");
    setDeadline("");
  };

  // 課題を削除
  const deleteTask = (
    id: number
  ) => {
    setTasks(
      tasks.filter(
        (task) =>
          task.id !== id
      )
    );
  };

  // 完了した課題数
  const completedCount =
    tasks.filter(
      (task) =>
        task.completed
    ).length;

  // 進捗率
  const progress =
    tasks.length === 0
      ? 0
      : (
          completedCount /
          tasks.length
        ) * 100;

  // 表示する課題を絞り込む
  const filteredTasks =
    tasks.filter((task) => {
      if (
        filter === "active"
      ) {
        return !task.completed;
      }

      if (
        filter ===
        "completed"
      ) {
        return task.completed;
      }

      return true;
    });

  return (
    <div>
      {/* ページタイトル */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <p className="mt-2 text-gray-600">
          大学の課題と学習予定を管理します。
        </p>
      </div>

      {/* 課題追加フォーム */}
      <form
        onSubmit={addTask}
        className="mb-8 rounded-lg border bg-white p-6"
      >
        <h2 className="mb-4 text-xl font-semibold">
          新しい課題を追加
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              課題名
            </label>

            <input
              type="text"
              value={title}
              onChange={(
                event
              ) =>
                setTitle(
                  event.target
                    .value
                )
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="例：PBLレポート"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              授業名
            </label>

            <input
              type="text"
              value={course}
              onChange={(
                event
              ) =>
                setCourse(
                  event.target
                    .value
                )
              }
              className="w-full rounded-lg border px-3 py-2"
              placeholder="例：PBL"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              期限
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(
                event
              ) =>
                setDeadline(
                  event.target
                    .value
                )
              }
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          課題を追加
        </button>
      </form>

      {/* 進捗 */}
      <div className="mb-6 rounded-lg border bg-white p-5">
        <p className="font-semibold">
          進捗：
          {completedCount} /{" "}
          {tasks.length} 完了
        </p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-black transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* フィルター */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() =>
            setFilter("all")
          }
          className={`rounded-lg border px-4 py-2 ${
            filter === "all"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          すべて
        </button>

        <button
          onClick={() =>
            setFilter(
              "active"
            )
          }
          className={`rounded-lg border px-4 py-2 ${
            filter ===
            "active"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          未完了
        </button>

        <button
          onClick={() =>
            setFilter(
              "completed"
            )
          }
          className={`rounded-lg border px-4 py-2 ${
            filter ===
            "completed"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          完了
        </button>
      </div>

      {/* 課題一覧 */}
      <div className="space-y-4">
        {filteredTasks.length ===
          0 && (
          <div className="rounded-lg border bg-white p-6 text-gray-500">
            該当する課題はありません。
          </div>
        )}

        {filteredTasks.map(
          (task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border bg-white p-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      task.completed
                        ? "bg-gray-200 text-gray-600"
                        : "bg-black text-white"
                    }`}
                  >
                    {task.completed
                      ? "完了"
                      : "未完了"}
                  </span>

                  <h2
                    className={`text-lg font-semibold ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : ""
                    }`}
                  >
                    {
                      task.title
                    }
                  </h2>
                </div>

                <div className="mt-3 flex gap-6 text-sm text-gray-500">
                  <p>
                    授業：
                    {
                      task.course
                    }
                  </p>

                  <p>
                    期限：
                    {
                      task.deadline
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toggleTask(
                      task.id
                    )
                  }
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {task.completed
                    ? "未完了に戻す"
                    : "完了にする"}
                </button>

                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                  削除
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}