"use client";

import { useQuery } from "@tanstack/react-query";
import { GetPopularManga } from "../../../actions/GetManga/manga";
import MangaCardWrapper from "./MangaCardWrapper";

const TrendingManga = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["TrendingManga"],
    queryFn: GetPopularManga,
    staleTime: 1000 * 60 * 10,
  });

  const mangaList = data?.data ?? [];

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
        Trending Manga
      </h2>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-muted animate-pulse rounded-lg"
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center h-40 text-red-500 font-medium">
          Failed to load trending manga. Please try again later.
        </div>
      )}

      {!isLoading && !isError && mangaList.length === 0 && (
        <div className="text-center text-muted-foreground h-40 flex items-center justify-center">
          No trending manga found.
        </div>
      )}

      {!isLoading && !isError && mangaList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6 gap-6">
          {mangaList.map((manga) => (
            <MangaCardWrapper key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingManga;
