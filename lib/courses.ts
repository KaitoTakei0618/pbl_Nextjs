export type Course = {
  id: string;
  name: string;
  day: string;
  period: number;
  room: string;
  teacher: string;
  description: string;
};

export const courses: Course[] = [
  {
    id: "pbl",
    name: "PBL",
    day: "火曜日",
    period: 3,
    room: "ゼミ室",
    teacher: "skip-san, sum-san",
    description:
      "Web技術やGit、Next.jsなどを実際に利用しながら学習する授業です。",
  },
  {
    id: "image-processing",
    name: "デジタル画像処理",
    day: "火曜日",
    period: 2,
    room: "南館7F",
    teacher: "彌冨",
    description:
      "画像処理の基礎理論や画像復元などについて学習します。",
  },
  {
    id: "database",
    name: "データベース",
    day: "木曜日",
    period: 1,
    room: "東館213",
    teacher: "佐々木",
    description:
      "SQLやリレーショナルデータベースについて学習します。",
  },
];