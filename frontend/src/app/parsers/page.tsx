import { fetchData } from '@/store';
import { TParser, TUser } from '../../../../src/types/firebase';
import { getParsers } from '@/helpers/get-parsers';
import Link from 'next/link';
import { PageTitle } from '@/components/page-title';

async function getUsers() {
  try {
    const res = await fetchData<TUser[]>('users/get-users', {});

    if (res.ok) {
      return res.data;
    } else {
      throw new Error(res.error);
    }
  } catch (e) {
    console.log(e);
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
      <PageTitle title={'Parsers'} />
      <div>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Channel name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Instagram account
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Last post</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-right">Active</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y classNamee-gray-100">
                {allParsers &&
                  allParsers.map((parser) => (
                    <tr key={parser.channel}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          <Link
                            href={`parsers/${parser.userId}/${parser.channel}`}
                          >
                            {parser.channel.toLocaleUpperCase()}
                          </Link>{' '}
                          <a
                            href={`https://t.me/${parser.channel}`}
                            target="_blank"
                            className="font-semibold text-xs text-blue-600"
                          >
                            Open channel
                          </a>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          <a
                            href={`https://instagram.com/${parser.instagram}`}
                            target={'_blank'}
                            className="text-blue-600 underline"
                          >
                            {parser.instagram}
                          </a>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {parser.postedTimestamp
                            ? new Date(parser.postedTimestamp).toLocaleString()
                            : 'Not posted yet'}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-right">
                          {!parser.isStopped ? 'Yes' : 'No'}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
