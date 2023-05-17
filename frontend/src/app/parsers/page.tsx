import { fetchData } from '@/store';
import { TParser, TUser } from '../../../../src/types/firebase';
import { getParsers } from '@/helpers/get-parsers';
import Link from 'next/link';

async function getUsers() {
  const res = await fetchData<TUser[]>('get-users', {});

  if (res.ok) {
    return res.data;
  } else {
    throw new Error(res.error);
  }
}

export default async function ParsersPage() {
  const data = await getUsers();

  type Parsers = TParser & {
    userId: number;
    channel: string;
  };

  const allParsers = !data
    ? []
    : data.reduce((acc: Parsers[], user: TUser) => {
        return user.parsers
          ? [
              ...acc,
              ...getParsers(user.parsers).map((parser) => ({
                userId: user.id,
                ...parser,
              })),
            ]
          : acc;
      }, []);

  return (
    <main>
      <h1>Parsers</h1>
      <ul>
        {allParsers &&
          allParsers.map((parser) => (
            <li key={parser.channel} className="">
              <div>
                <div>Channel name</div>
                <div>
                  <Link href={`parsers/${parser.userId}/${parser.channel}`}>
                    {parser.channel}
                  </Link>
                </div>
              </div>
              <div>Instagram: {parser.instagram}</div>
              <div>Last posted: {parser.postedTimestamp}</div>
            </li>
          ))}
      </ul>
    </main>
  );
}
