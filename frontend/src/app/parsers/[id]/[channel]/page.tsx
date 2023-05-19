import { fetchData } from '@/store';
import { TUser } from '../../../../../../src/types/firebase';
import { PostsManager } from '@/app/parsers/[id]/[channel]/posts-manager';

const getUser = async (id: number) => {
  try {
    const user = await fetchData<TUser>('users/get-user', {
      userId: id,
    });

    if (user.ok) {
      return user.data;
    } else {
      throw new Error('Cant get data');
    }
  } catch (e) {
    console.log(e);
  }
};

interface IProps {
  params: {
    id: string;
    channel: string;
  };
}
export default async function ParserPage({ params: { id, channel } }: IProps) {
  const user = await getUser(Number(id));

  if (!user) {
    return <div>Cannot get user</div>;
  }

  if (!user.parsers) {
    return <div>User has no active parsers</div>;
  }

  const parser = user.parsers[channel];
  return (
    <div>
      {parser && (
        <div>
          <div>Parser: {parser.instagram}</div>
          <div>
            Last posted: {new Date(parser.postedTimestamp).toLocaleString()}
          </div>
        </div>
      )}
      <PostsManager
        userId={user.id}
        channel={channel}
        parser={user.parsers[channel]}
      />
    </div>
  );
}
