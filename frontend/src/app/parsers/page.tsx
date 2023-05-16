import { fetchData } from '@/store';
import { TUser } from '../../../../src/types/firebase';

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

  return (
    <main>
      <h1>Parsers</h1>
      <ul>
        {data?.map((user) => (
          <li>{user.username}</li>
        ))}
      </ul>
    </main>
  );
}
