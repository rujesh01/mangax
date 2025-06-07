"use client";

import { useQuery } from "@tanstack/react-query";
import { GetMangaCoverImage } from "../../../actions/GetManga/coverImage";
import Image from "next/image";
import clsx from "clsx";
import { Relationship } from "../../../types/types";

type Props = {
  coverArt: Relationship;
  mangaId: string;
  alt?: string;
  priority?: boolean; // preload image if true, for LCP
};

const ImageWrapper = ({
  coverArt,
  mangaId,
  alt = "Manga Cover",
  priority = false,
}: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coverPhoto", mangaId],
    queryFn: () => GetMangaCoverImage(coverArt),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  const fileName = data?.data?.attributes?.fileName;
  const imageUrl = fileName
    ? `https://uploads.mangadex.org/covers/${mangaId}/${fileName}.512.jpg`
    : null;

  if (isLoading) {
    return (
      <div className="w-full h-full  bg-gray-200 animate-pulse rounded-md" />
    );
  }

  if (isError || !imageUrl) {
    return (
      <div className="w-full h-full bg-red-100 text-red-600 flex items-center justify-center rounded-md p-2 text-center text-xs">
        No cover image found
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      // sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
      className={clsx("object-cover absolute ")}
    />
  );
};

export default ImageWrapper;
