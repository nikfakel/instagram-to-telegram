'use client';

import { TUser } from '../../../../src/types/firebase';
import { User } from './user';
import { PageTitle } from '@/components/page-title';

interface IProps {
  users: TUser[];
}

export const UsersList = ({ users }: IProps) => {
  return (
    <main>
      <PageTitle title={'Users'} />
      <ul role="list" className="divide-y divide-gray-100">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </ul>
    </main>
  );
};
