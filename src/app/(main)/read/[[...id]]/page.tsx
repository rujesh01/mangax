import ChangeButton from "@/components/read/changeChapterButton/changeButton";
import MangaChapterPages from "@/components/read/readChapter";

interface ReadPageProps {
  params: Promise<{
    id?: string[];
  }>;
}

export default async function ReadPage({ params }: ReadPageProps) {
  const { id } = await params;
  const [mangaId, chapterId] = id ?? [];

  return (
    <div>
      <div className="flex flex-col items-center gap-2 p-3">
        <ChangeButton mangaId={mangaId} />
        <MangaChapterPages chapterId={chapterId} />
        <ChangeButton mangaId={mangaId} />
      </div>
    </div>
  );
}
