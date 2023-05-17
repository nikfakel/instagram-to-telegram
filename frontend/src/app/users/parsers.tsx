import { TParser } from '../../../../src/types/firebase';
import { getParsers } from '@/helpers/get-parsers';
import Link from 'next/link';

interface IProps {
  userId: number;
  parsers: {
    [key: string]: TParser;
  };
}

export const Parsers = ({ parsers, userId }: IProps) => {
  return (
    <div>
      <ul>
        {getParsers(parsers).map((parser) => (
          <li key={parser.channel}>
            <Link href={`/parsers/${userId}/${parser.channel}`}>
              {parser.channel} - {parser.instagram}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
