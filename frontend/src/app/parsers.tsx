import {TParser} from "../../../src/types/firebase";

interface IProps {
  parsers: {
    [key: string]: TParser
  }
}

const getParsers = (parsers: {[key: string]: TParser}) => {
  return Object.entries(parsers).map(([key, value]) => ({channel: key, ...value }))
}

export const Parsers = ({ parsers }: IProps) => {
  return (
    <div>
      <ul>
        {getParsers(parsers).map(parser => (
          <li key={parser.channel}>{parser.channel} - {parser.instagram}</li>
        ))}
      </ul>
    </div>
  )
}
