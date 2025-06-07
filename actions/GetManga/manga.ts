"use server";
import { MangaCollectionResponse } from "../../types/types";

const baseUrl = process.env.API_BASEURL;

//============================ Get popular Manga =================================//

export const GetPopularManga = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/manga?limit=12&order[followedCount]=desc&order[latestUploadedChapter]=desc`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch manga: ${res.statusText}`);
    }

    const data = await res.json();
    return data as MangaCollectionResponse;
  } catch (error) {
    console.error("GetManga error:", error);
    return undefined;
  }
};

// ========================================== Search Manga ===================================================== //

export const SearchManga = async (title: string) => {
  try {
    const res = await fetch(`${baseUrl}/manga?title=${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch manga: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data?.data || []; // Ensure consistent array return
  } catch (error) {
    console.error("SearchManga error:", error);
    return [];
  }
};

///============================================ Get manga Info ==================================//

export const GetMangaInfo = async (mangaId: string) => {
  try {
    const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

////=========================================== Get Chapter Data =======================//

type MangaChapter = {
  id: string;
  chapter: string | null;
  title: string | null;
  language: string;
};

type MangaFeedResponse = {
  total: number;
  data: {
    id: string;
    attributes: {
      chapter?: string;
      title?: string;
      translatedLanguage?: string;
    };
  }[];
};

const fetchMangaData = async (url: string): Promise<MangaFeedResponse> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const GetChapters = async (mangaId: string): Promise<MangaChapter[]> => {
  const limit = 100;
  let offset = 0;
  const allChapters: MangaChapter[] = [];

  try {
    let total = Infinity; // Unknown at first, updated on first request

    while (offset < total) {
      const url = `https://api.mangadex.org/manga/${mangaId}/feed?limit=${limit}&offset=${offset}&order[chapter]=desc&translatedLanguage[]=en`;

      const result = await fetchMangaData(url);

      const chapters = result.data.map(({ id, attributes }) => ({
        id,
        chapter: attributes.chapter ?? null,
        title: attributes.title ?? null,
        language: attributes.translatedLanguage ?? "N/A",
      }));

      allChapters.push(...chapters);

      total = result.total;
      offset += limit;
    }

    return allChapters;
  } catch (error) {
    console.error(
      `❌ Failed to fetch chapters for mangaId "${mangaId}":`,
      error
    );
    return [];
  }
};



///========================== Get Read chapter =========================

export async function fetchMangaChapterImages(
  chapterId: string,
  quality: "data" | "dataSaver" = "data"
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`,
      {
        method: "GET",
      }
    );
    // if (!response.ok) throw new Error("Failed to fetch chapter data");

    const { baseUrl, chapter } = await response.json();
    const path = quality === "data" ? "data" : "data-saver";

    return chapter[quality].map(
      (fileName: string) => `${baseUrl}/${path}/${chapter.hash}/${fileName}`
    );
  } catch (error) {
    console.error("Error fetching chapter images:", error);
    return [];
  }
}
