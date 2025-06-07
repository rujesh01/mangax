"use server";

import { Relationship } from "../../types/types";


export const GetMangaCoverImage = async (coverArt: Relationship) => {
  const { id } = coverArt;

  try {
    const res = await fetch(`https://api.mangadex.org/cover/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
