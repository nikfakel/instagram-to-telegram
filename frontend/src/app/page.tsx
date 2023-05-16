'use client';

import { useEffect, useState } from 'react';
import { fetchData } from '../store';
import { UsersList } from './users-list';
import { TUser } from '../../../src/types/firebase';

export default function Home() {
  const [users, setUsers] = useState<TUser[]>([]);
  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const response = await fetchData<TUser[]>('get-users');
      if (response.data) {
        setUsers(response.data);
      }
    };

    getUsers();
  }, []);

  return (
    <main>
      <UsersList users={users} />
    </main>
  );
}
