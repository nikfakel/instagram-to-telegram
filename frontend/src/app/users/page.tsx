import { UsersList } from '@/app/users/users-list';
import { TUser } from '../../../../src/types/firebase';
import { fetchData } from '@/store';
import { PageTitle } from '@/components/page-title';

const getUsers = async () => {
  try {
    const response = await fetchData<TUser[]>('users/get-users');
    if (response.data) {
      return response.data;
    } else {
      throw new Error('Cannot fetch users');
    }
  } catch (e) {
    console.log(e);
  }
};

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main>
      <PageTitle title={'Users'} />
      {users && <UsersList users={users} />}
    </main>
  );
}
