"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Input,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";

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
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");

  const [filter, setFilter] = useState<Filter>("all");

  // localStorageから読み込む
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedTasks);
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

  // 課題が変化したら保存
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks, isLoaded]);

  // 完了・未完了切り替え
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // 課題追加
  const addTask = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title || !course || !deadline) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      course,
      deadline,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setCourse("");
    setDeadline("");
  };

  // 削除
  const deleteTask = (id: number) => {
    setTasks(
      tasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const completedCount =
    tasks.filter(
      (task) => task.completed
    ).length;

  const progress =
    tasks.length === 0
      ? 0
      : (completedCount / tasks.length) * 100;

  const filteredTasks =
    tasks.filter((task) => {
      if (filter === "active") {
        return !task.completed;
      }

      if (filter === "completed") {
        return task.completed;
      }

      return true;
    });

  return (
    <Box>
      {/* タイトル */}
      <Box mb="8">
        <Heading size="2xl">
          Tasks
        </Heading>

        <Text
          mt="2"
          color="gray.600"
        >
          大学の課題と学習予定を管理します。
        </Text>
      </Box>

      {/* 課題追加 */}
      <Box
        as="section"
        mb="8"
        borderWidth="1px"
        borderRadius="xl"
        bg="white"
        p="6"
      >
        <Heading
          size="lg"
          mb="5"
        >
          新しい課題を追加
        </Heading>

        <form onSubmit={addTask}>
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
            }}
            gap="4"
          >
            <Field.Root required>
              <Field.Label>
                課題名
                <Field.RequiredIndicator />
              </Field.Label>

              <Input
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="例：PBLレポート"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                授業名
                <Field.RequiredIndicator />
              </Field.Label>

              <Input
                value={course}
                onChange={(event) =>
                  setCourse(event.target.value)
                }
                placeholder="例：PBL"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                期限
                <Field.RequiredIndicator />
              </Field.Label>

              <Input
                type="date"
                value={deadline}
                onChange={(event) =>
                  setDeadline(event.target.value)
                }
              />
            </Field.Root>
          </Box>

          <Button
            type="submit"
            mt="5"
            colorPalette="blue"
          >
            課題を追加
          </Button>
        </form>
      </Box>

      {/* 進捗 */}
      <Box
        mb="6"
        borderWidth="1px"
        borderRadius="xl"
        bg="white"
        p="5"
      >
        <Text
          mb="3"
          fontWeight="semibold"
        >
          進捗：{completedCount} / {tasks.length} 完了
        </Text>

        <Progress.Root
          value={progress}
          colorPalette="blue"
          size="sm"
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </Box>

      {/* フィルター */}
      <Flex
        gap="3"
        mb="6"
        flexWrap="wrap"
      >
        <Button
          variant={
            filter === "all"
              ? "solid"
              : "outline"
          }
          colorPalette="blue"
          onClick={() =>
            setFilter("all")
          }
        >
          すべて
        </Button>

        <Button
          variant={
            filter === "active"
              ? "solid"
              : "outline"
          }
          colorPalette="blue"
          onClick={() =>
            setFilter("active")
          }
        >
          未完了
        </Button>

        <Button
          variant={
            filter === "completed"
              ? "solid"
              : "outline"
          }
          colorPalette="blue"
          onClick={() =>
            setFilter("completed")
          }
        >
          完了
        </Button>
      </Flex>

      {/* 課題一覧 */}
      <Stack gap="4">
        {filteredTasks.length === 0 && (
          <Box
            borderWidth="1px"
            borderRadius="xl"
            bg="white"
            p="6"
          >
            <Text color="gray.500">
              該当する課題はありません。
            </Text>
          </Box>
        )}

        {filteredTasks.map((task) => (
          <Box
            key={task.id}
            borderWidth="1px"
            borderRadius="xl"
            bg="white"
            p="5"
          >
            <Flex
              justify="space-between"
              align={{
                base: "stretch",
                md: "center",
              }}
              direction={{
                base: "column",
                md: "row",
              }}
              gap="4"
            >
              <Box>
                <Flex
                  align="center"
                  gap="3"
                  mb="3"
                >
                  <Box
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="semibold"
                    bg={
                      task.completed
                        ? "gray.200"
                        : "blue.600"
                    }
                    color={
                      task.completed
                        ? "gray.600"
                        : "white"
                    }
                  >
                    {task.completed
                      ? "完了"
                      : "未完了"}
                  </Box>

                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color={
                      task.completed
                        ? "gray.400"
                        : "gray.900"
                    }
                    textDecoration={
                      task.completed
                        ? "line-through"
                        : "none"
                    }
                  >
                    {task.title}
                  </Text>
                </Flex>

                <Flex
                  gap="6"
                  fontSize="sm"
                  color="gray.500"
                  flexWrap="wrap"
                >
                  <Text>
                    授業：{task.course}
                  </Text>

                  <Text>
                    期限：{task.deadline}
                  </Text>
                </Flex>
              </Box>

              <Flex
                gap="2"
                flexWrap="wrap"
              >
                <Button
                  variant="outline"
                  onClick={() =>
                    toggleTask(task.id)
                  }
                >
                  {task.completed
                    ? "未完了に戻す"
                    : "完了にする"}
                </Button>

                <Button
                  variant="outline"
                  colorPalette="red"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  削除
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}