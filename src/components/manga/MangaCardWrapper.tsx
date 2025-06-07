import Link from "next/link";
import { Manga } from "../../../types/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ImageWrapper from "./ImageWrapper";

type Props = {
  manga: Manga;
};

const getMangaTitle = (manga: Manga): string => {
  const { title, altTitles } = manga.attributes;

  if (title.en) return title.en;

  const enAlt = altTitles.find((rel) => "en" in rel);
  if (enAlt?.en) return enAlt.en;

  return "No title available";
};

const MangaCardWrapper = ({ manga }: Props) => {
  const { attributes, relationships } = manga;
  const { year, status, tags } = attributes;

  const coverArt = relationships.find((rel) => rel.type === "cover_art");
  if (!coverArt) return null;

  const mainTitle = getMangaTitle(manga);

  return (
    <Link href={`/info/${manga.id}`}>
      <Card className="relative w-full h-80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <ImageWrapper
            mangaId={manga.id}
            coverArt={coverArt}
            alt={mainTitle}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 w-full p-2   flex flex-col justify-end  bg-black/30 backdrop-blur-sm">
          <h1 className="text-lg  font-bold truncate" title={mainTitle}>
            {mainTitle}
          </h1>

          <div className="flex flex-wrap gap-2 text-xs text-gray-200 mt-1">
            <div>
              <span className="font-semibold">Year:</span>{" "}
              <Button
                variant={"link"}
                className="text-white hover:underline px-1 h-auto"
              >
                {year || "N/A"}
              </Button>
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <Button
                variant={"link"}
                className="text-white hover:underline px-1 h-auto"
              >
                {status || "N/A"}
              </Button>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/20 text-white rounded-full px-2 py-0.5 text-[10px] font-medium truncate max-w-full"
                  title={tag.attributes.name.en}
                >
                  {tag.attributes.name.en}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default MangaCardWrapper;
