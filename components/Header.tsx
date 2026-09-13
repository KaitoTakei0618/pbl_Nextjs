"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Box,
  Button,
  CloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Escキーで閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAboutOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="relative border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          学習管理サイト
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/tasks">
            Tasks
          </Link>

          <Link href="/courses">
            Courses
          </Link>

          <Button
            variant="outline"
            size="md"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
          >
            About Me
          </Button>
        </nav>
      </div>

      {isAboutOpen && (
        <>
          {/* 外側クリック検出用の透明レイヤー */}
          <Box
            position="fixed"
            inset="0"
            zIndex="40"
            onClick={() => setIsAboutOpen(false)}
          />

          {/* About Me */}
          <Box
            position="absolute"
            top="calc(100% + 8px)"
            right="24px"
            zIndex="50"
            width="320px"
            bg="white"
            borderWidth="1px"
            borderRadius="xl"
            boxShadow="lg"
            p="5"
          >
            <CloseButton
              position="absolute"
              top="2"
              right="2"
              size="sm"
              onClick={() => setIsAboutOpen(false)}
            />

            <Box mb="5" pr="8">
              <Text
                fontSize="lg"
                fontWeight="bold"
              >
                About Me
              </Text>

              <Text
                mt="1"
                fontSize="sm"
                color="gray.500"
              >
                このサイトの作成者について
              </Text>
            </Box>

            <Stack gap="4">
              <Box>
                <Text fontWeight="semibold">
                  名前
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  武井海渡 prince👑
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold">
                  所属
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  法政大学 理工学部　彌冨lab
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold">
                  専門分野
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  Web開発・機械学習・画像処理など
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold">
                  このサイトについて
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.600"
                >
                  大学の課題や学習内容をまとめて
                  管理するために作成しています。
                </Text>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </header>
  );
}