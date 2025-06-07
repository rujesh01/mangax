"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Chapter = {
  id: string;
  chapter: string; // from API
  title: string;
  language: string;
};

export const columns: ColumnDef<Chapter>[] = [
  {
    accessorKey: "chapter",
    header: "Chapter No",
    cell: (info) => `#${info.getValue<string>()}`,
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: (info) => info.getValue<string>().toUpperCase(),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => info.getValue<string>() || "No title",
  },
];
