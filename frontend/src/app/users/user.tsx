import { TUser } from '../../../../src/types/firebase';
import { Parsers } from './parsers';

const isActiveParsers = (user: TUser) => {
  return !!user.parsers;
};

interface IProps {
  user: TUser;
}

export const User = ({ user }: IProps) => {
  return (
    <li key={user.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {user.firstName}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {user.lastName}
          </p>
        </div>
      </div>
      <div className="sm:flex sm:flex-col">
        {user.parsers && <Parsers parsers={user.parsers} userId={user.id} />}
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">Role</p>
        {isActiveParsers(user) ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last post <time dateTime={'123'}>{'123'}</time>
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Online</p>
          </div>
        )}
      </div>
    </li>
  );
};
