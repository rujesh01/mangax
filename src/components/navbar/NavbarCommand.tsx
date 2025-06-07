"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/debounceHook";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { SearchManga } from "../../../actions/GetManga/manga";
import { Manga } from "../../../types/types";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => SearchManga(debouncedValue),
    enabled: !!debouncedValue,
  });

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        value={value}
        onValueChange={setValue}
        placeholder="Search manga..."
        autoFocus
      />

      <CommandList>
        {isLoading && <CommandItem disabled>Loading...</CommandItem>}

        {isError && <CommandItem disabled>Error loading results</CommandItem>}

        {data?.map((manga: Manga) => (
          <CommandItem
            key={manga.id}
            onSelect={() => {
              setValue("");
              router.push(`/info/${manga.id}`);
              setOpen(false);
            }}
          >
            {manga.attributes?.title?.en || "Untitled"}
          </CommandItem>
        ))}
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  );
};

export default NavbarCommand;
