import words from "../dictionary/words.json";
import { DictionaryEntry } from "../interfaces";

const ENTRIES_PER_PAGE = 10;

export const getTag = async (tag: number, targetPage?: number) =>
  new Promise<{
    results: DictionaryEntry[];
    showNext: boolean;
    showPrevious: boolean;
    numPages: number;
  }>((resolve) => {
    const allTagEntries = (words as DictionaryEntry[]).filter((entry) =>
      entry.tags.includes(tag)
    );

    if (allTagEntries.length === 0) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const numPages = Math.ceil(allTagEntries.length / ENTRIES_PER_PAGE);

    let showPrevious = false;
    let showNext = false;
    let page = 1;
    const results = [];

    if (targetPage < 1) {
      page = 1;
    } else if (targetPage > numPages) {
      page = numPages;
    } else {
      page = targetPage;
    }

    for (
      var index = (page - 1) * ENTRIES_PER_PAGE;
      index < page * ENTRIES_PER_PAGE;
      index++
    ) {
      if (allTagEntries[index]) {
        results.push(allTagEntries[index]);
      }
    }
    if (page === 1) {
      showPrevious = false;
    } else {
      showPrevious = true;
    }

    if (page === numPages) {
      showNext = false;
    } else {
      showNext = true;
    }

    resolve({
      results,
      showNext,
      showPrevious,
      numPages,
    });
  });
