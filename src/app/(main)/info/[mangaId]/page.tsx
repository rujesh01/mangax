import ChapterTable from "@/components/info/data-table/table";
import MangaInfo from "@/components/manga/mangaInfo";

interface InfoPageProps {
  params: Promise<{ mangaId: string }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { mangaId } = await params;

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section>
          <MangaInfo mangaId={mangaId} />
        </section>
        <section>
          <ChapterTable mangaId={mangaId} />
        </section>
      </div>
    </main>
  );
}
