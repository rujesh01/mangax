// Language map for internationalized fields
export type LanguageMap = Record<string, string>;

// External links (official pages, stores, etc.)
export interface Links {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  cdj?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  engtl?: string;
  [key: string]: string | undefined;
}

// Tag object used for genre and category labels
export interface Tag {
  id: string;
  type: "tag";
  attributes: {
    name: LanguageMap;
    description: LanguageMap;
    group: string;
    version: number;
  };
  relationships: Relationship[];
}

// Author attributes
export interface AuthorAttributes {
  name: string;
  imageUrl?: string | null;
  biography?: LanguageMap;
  twitter?: string | null;
  pixiv?: string | null;
  melonBook?: string | null;
  nicoVideo?: string | null;
  booth?: string | null;
  website?: string | null;
  iban?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Cover art attributes
export interface CoverArtAttributes {
  fileName: string;
  description?: string | null;
  volume?: string | null;
  createdAt: string;
  updatedAt: string;
}

// More relationship attribute types can be added here as needed

// Refined Relationship type with discriminated unions for known types
export type Relationship =
  | {
      id: string;
      type: "author";
      attributes: AuthorAttributes;
      related?: string;
    }
  | {
      id: string;
      type: "cover_art";
      attributes: CoverArtAttributes;
      related?: string;
    }
  | {
      id: string;
      type: "artist";
      attributes: AuthorAttributes; // Usually same as author
      related?: string;
    }
  | {
      id: string;
      type: "tag";
      attributes: {
        name: LanguageMap;
        description: LanguageMap;
        group: string;
        version: number;
      };
      related?: string;
    }
  | {
      id: string;
      type: string; // fallback for unknown types
      attributes?: Record<string, unknown>;
      related?: string;
    };

// Manga attributes returned in API
export interface MangaAttributes {
  title: LanguageMap;
  altTitles: LanguageMap[];
  description: LanguageMap;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string | null;
  lastChapter: string | null;
  publicationDemographic: "shounen" | "shoujo" | "seinen" | "josei" | null;
  status: "ongoing" | "completed" | "hiatus" | "cancelled";
  year: number | null;
  contentRating: "safe" | "suggestive" | "erotica" | "pornographic";
  tags: Tag[];
  state: "published" | "draft";
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

// Main Manga object
export interface Manga {
  id: string;
  type: "manga";
  attributes: MangaAttributes;
  relationships: Relationship[];
}

// Response from GET /manga/:id
export interface MangaResponse {
  result: "ok";
  response: "entity";
  data: Manga;
}

// Response from GET /manga (collection)
export interface MangaCollectionResponse {
  result: "ok";
  response: "collection";
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}

// Chapter data
export type MangaChapter = {
  id: string;
  type: "chapter";
  attributes: {
    title: string | null;
    chapter: string | null;
    translatedLanguage: string;
    createdAt: string;
    publishAt: string;
    pages: number;
    version: number;
  };
  relationships: Relationship[];
};
