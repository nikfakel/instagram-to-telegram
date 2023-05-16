'use client';

import { TUser } from '../../../src/types/firebase';
import { User } from './user';

interface IProps {
  users: TUser[];
}

export const UsersList = ({ users }: IProps) => {
  return (
    <div className="">
      <ul role="list" className="divide-y divide-gray-100">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};
