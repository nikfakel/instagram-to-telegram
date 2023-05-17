import { TParser } from '../../../src/types/firebase';

type TParsers = TParser & {
  channel: string;
};
export const getParsers = (parsers: { [key: string]: TParser }): TParsers[] => {
  return Object.entries(parsers).map(([key, value]) => ({
    channel: key,
    ...value,
  }));
};
