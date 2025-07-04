import { atom } from "recoil";

interface Inputs {
  title: string;
  link: string;
  tags: string[];
}

// Atom for the whole input object
export const inputValueState = atom<Inputs>({
  key: 'inputValue',
  default: {
    title: "",
    link: "",
    tags: [],
  },
});

// Atom for just the tags
export const tagsState = atom<string[]>({
  key: 'tags',
  default: [],
});
