"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { fetchMangaChapterImages } from "../../../actions/GetManga/manga";

type Props = {
  chapterId: string;
};

const MangaChapterPages = ({ chapterId }: Props) => {
  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mangaChapterImage", chapterId],
    queryFn: () => fetchMangaChapterImages(chapterId),
    enabled: Boolean(chapterId),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center p-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton key={idx} className="w-[800px] h-[1200px] rounded" />
        ))}
        <p className="text-muted-foreground text-sm">
          Loading chapter pages...
        </p>
      </div>
    );
  }

  if (isError || !images || images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive text-lg">
          Failed to load chapter images.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      {images.map((url, index) => (
        <Image
          key={`${chapterId}-${index}`}
          src={url}
          alt={`Manga page ${index + 1}`}
          width={800}
          height={1200}
          loading="lazy"
          className="rounded shadow-md"
        />
      ))}
    </div>
  );
};

export default MangaChapterPages;
