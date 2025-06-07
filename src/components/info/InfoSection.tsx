"use client";

import { useQuery } from "@tanstack/react-query";
import { GetMangaInfo } from "../../../actions/GetManga/manga";
import { Manga, Relationship } from "../../../types/types";
import ImageWrapper from "../manga/ImageWrapper";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

type Props = {
  mangaId: string;
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "ongoing":
      return "text-green-600";
    case "completed":
      return "text-red-600";
    case "hiatus":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

const InfoSection = ({ mangaId }: Props) => {
  const { data, isLoading, isError } = useQuery<Manga>({
    queryKey: ["mangaInfo", mangaId],
    queryFn: () => GetMangaInfo(mangaId),
    enabled: !!mangaId,
  });

  if (isLoading) {
    return (
      <section className="flex w-full flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl shadow-xl animate-pulse">
          <div className="flex flex-col sm:flex-row gap-6 p-6">
            {/* Cover Art Skeleton */}
            <div className="w-full sm:w-64 flex-shrink-0">
              <Skeleton className="h-96 w-full rounded-md" />
            </div>

            {/* Text Skeleton */}
            <div className="flex flex-col w-full gap-4">
              {/* Title Skeleton */}
              <Skeleton className="h-10 w-3/4 rounded" />

              {/* Description Skeleton (multiple lines) */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>

              {/* Separator */}
              <Separator className="my-4" />

              {/* Info Grid Skeleton */}
              <div className="grid sm:grid-cols-2 gap-2">
                {[...Array(12)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-5 rounded"
                    style={{ width: i % 2 === 0 ? "60%" : "80%" }}
                  />
                ))}
              </div>

              {/* Tags Skeleton */}
              <div className="mt-6">
                <Skeleton className="h-6 w-24 rounded mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-6 rounded"
                      style={{ width: 70 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-10">
        <h1 className="text-lg font-medium text-destructive">
          Failed to load manga info.
        </h1>
      </div>
    );
  }

  const { attributes, relationships } = data;

  const coverArt = relationships.find((rel) => rel.type === "cover_art");

  if (!coverArt) {
    return null;
  }

  const authorNames = relationships
    .filter(
      (rel): rel is Relationship & { attributes: { name: string } } =>
        rel.type === "author" &&
        typeof rel.attributes === "object" &&
        rel.attributes !== null &&
        "name" in rel.attributes
    )
    .map((author) => author.attributes.name);

  const title =
    attributes.title.en ||
    attributes.altTitles.find((alt) => alt.en)?.en ||
    Object.values(attributes.title)[0] ||
    "Untitled";

  return (
    <section className="flex w-full flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl shadow-xl">
        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <div className="w-full sm:w-64 flex-shrink-0">
            <div className="relative h-96 w-full rounded-md overflow-hidden shadow-md">
              <ImageWrapper coverArt={coverArt} mangaId={mangaId} />
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <h1 className="text-3xl font-bold">{title}</h1>

            {attributes.description.en && (
              <p className="text-muted-foreground line-clamp-6 whitespace-pre-line">
                {attributes.description.en}
              </p>
            )}

            <Separator />

            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Status:</span>{" "}
                <span className={getStatusColor(attributes.status)}>
                  {attributes.status}
                </span>
              </p>
              <p>
                <span className="font-medium text-foreground">Year:</span>{" "}
                {attributes.year ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Author{authorNames.length > 1 ? "s" : ""}:
                </span>{" "}
                {authorNames.length > 0 ? authorNames.join(", ") : "Unknown"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Original Language:
                </span>{" "}
                {attributes.originalLanguage || "Unknown"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Last Volume:
                </span>{" "}
                {attributes.lastVolume ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Last Chapter:
                </span>{" "}
                {attributes.lastChapter ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Content Rating:
                </span>{" "}
                {attributes.contentRating}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Publication Demographic:
                </span>{" "}
                {attributes.publicationDemographic ?? "N/A"}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Translated Languages:
                </span>{" "}
                {attributes.availableTranslatedLanguages.join(", ")}
              </p>
              <p>
                <span className="font-medium text-foreground">Created:</span>{" "}
                {new Date(attributes.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-foreground">Updated:</span>{" "}
                {new Date(attributes.updatedAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-foreground">State:</span>{" "}
                {attributes.state}
              </p>
            </div>

            {attributes.tags.length > 0 && (
              <div>
                <h2 className="font-semibold text-lg mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {attributes.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.attributes.name.en ||
                        Object.values(tag.attributes.name)[0] ||
                        "Unnamed Tag"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
