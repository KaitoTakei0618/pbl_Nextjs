"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  course: string;
  deadline: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "PBLレポートを作成する",
    course: "PBL",
    deadline: "2026/09/20",
    completed: false,
  },
  {
    id: 2,
    title: "画像処理の復習",
    course: "デジタル画像処理",
    deadline: "2026/09/23",
    completed: false,
  },
  {
    id: 3,
    title: "データベースの復習",
    course: "データベース",
    deadline: "2026/09/12",
    completed: true,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <p className="mt-2 text-gray-600">
          大学の課題と学習予定を管理します。
        </p>
      </div>

      <div className="mb-6 rounded-lg border bg-white p-5">
        <p className="font-semibold">
          進捗：{completedCount} / {tasks.length} 完了
        </p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-black transition-all"
            style={{
              width: `${(completedCount / tasks.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
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
                  {task.completed ? "完了" : "未完了"}
                </span>

                <h2
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : ""
                  }`}
                >
                  {task.title}
                </h2>
              </div>

              <div className="mt-3 flex gap-6 text-sm text-gray-500">
                <p>授業：{task.course}</p>
                <p>期限：{task.deadline}</p>
              </div>
            </div>

            <button
              onClick={() => toggleTask(task.id)}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
            >
              {task.completed ? "未完了に戻す" : "完了にする"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}