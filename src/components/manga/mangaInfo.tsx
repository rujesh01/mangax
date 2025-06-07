import InfoSection from "../info/InfoSection";
import { Separator } from "../ui/separator";

type Props = {
  mangaId: string;
};

const MangaInfo = async ({ mangaId }: Props) => {
  return (
    <div>
      <InfoSection mangaId={mangaId} />
      <Separator />
    </div>
  );
};

export default MangaInfo;
