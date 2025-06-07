"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GetChapters } from "../../../../actions/GetManga/manga";
import { Info } from "lucide-react";

type ChangeButtonProps = {
  mangaId: string;
};

const ChangeButton = ({ mangaId }: ChangeButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentChapterId = useMemo(
    () => pathname.split("/").pop() ?? "",
    [pathname]
  );

  const { data: chapters, isLoading } = useQuery({
    queryKey: ["mangaChapter", mangaId],
    queryFn: () => GetChapters(mangaId),
  });

  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    if (chapters && currentChapterId) {
      const index = chapters.findIndex(
        (chapter) => chapter.id === currentChapterId
      );
      if (index !== -1) setCurrentIndex(index);
    }
  }, [chapters, currentChapterId]);

  const navigateToIndex = useCallback(
    (index: number) => {
      if (!chapters) return;

      const isValidIndex = index >= 0 && index < chapters.length;
      if (isValidIndex) {
        const chapter = chapters[index];
        setCurrentIndex(index);
        router.push(`/read/${mangaId}/${chapter.id}`);
      } else {
        router.push(`/info/${mangaId}`);
      }
    },
    [chapters, mangaId, router]
  );

  const handlePrevious = () => navigateToIndex(currentIndex + 1);
  const handleNext = () => navigateToIndex(currentIndex - 1);
  const handleInfo = () => router.push(`/info/${mangaId}`);

  const handleSelect = useCallback(
    (chapterId: string) => {
      const index = chapters?.findIndex((c) => c.id === chapterId) ?? -1;
      if (index !== -1) {
        navigateToIndex(index);
      }
    },
    [chapters, navigateToIndex]
  );

  if (isLoading || !chapters || currentIndex === -1) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  const currentChapter = chapters[currentIndex];
  const hasNext = currentIndex > 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {/* Previous Chapter */}
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentIndex >= chapters.length - 1}
        >
          Previous
        </Button>

        {/* Chapter Select Dropdown */}
        <Select
          value={currentChapter.id}
          onValueChange={handleSelect}
          disabled={chapters.length <= 1}
        >
          <SelectTrigger className="min-w-[160px]">
            <SelectValue placeholder="Select chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter) => (
              <SelectItem key={chapter.id} value={chapter.id}>
                {chapter.chapter
                  ? `Chapter ${chapter.chapter}`
                  : "No Chapter Number"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Next Chapter or Info Button */}
        {hasNext ? (
          <Button variant="secondary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleInfo}
            className="flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            Info
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        {currentChapter.chapter
          ? `Reading Chapter ${currentChapter.chapter}`
          : "Reading Chapter"}
      </div>
    </div>
  );
};

export default ChangeButton;
