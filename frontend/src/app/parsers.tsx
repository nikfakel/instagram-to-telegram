import {TParser} from "../../../src/types/firebase";
import Link from "next/link";

interface IProps {
  userId: number;
  parsers: {
    [key: string]: TParser
  }
}

const getParsers = (parsers: {[key: string]: TParser}) => {
  return Object.entries(parsers).map(([key, value]) => ({channel: key, ...value }))
}

export const Parsers = ({ parsers, userId }: IProps) => {
  return (
    <div>
      <ul>
        {getParsers(parsers).map(parser => (
          <li key={parser.channel}>
            <Link href={`/parsers/${parser.channel}`}>{parser.channel} - {parser.instagram}</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}
