import { columns } from "./columns";
import { DataTable } from "./data-table";
import { GetChapters } from "../../../../actions/GetManga/manga";

type Props = {
  mangaId: string;
};

export default async function ChapterT({ mangaId }: Props) {
  const rawChapters = await GetChapters(mangaId);

  if (!rawChapters || rawChapters.length === 0) {
    return (
      <section className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Chapters
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No chapters found.
          </p>
        </div>
      </section>
    );
  }

  // Optionally filter or sort chapters here
  const chapters = rawChapters.map(ch => ({
    ...ch,
    chapter: ch.chapter ?? "N/A",
    title: ch.title ?? "No title",
  }));

  return (
    <section className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Chapters
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          List of all available chapters for this manga
        </p>
      </div>

      <DataTable columns={columns} data={chapters} mangaId={mangaId} />
    </section>
  );
}
