import { fetchData } from '@/store';
import { TUser } from '../../../../../src/types/firebase';

async function getData() {
  const res = await fetchData<TUser[]>('get-users', {});

  console.log(res);

  if (res.ok) {
    return res;
  } else {
    throw new Error(res.error);
  }
}

interface IProps {
  params: {
    id: string;
  };
}
export default function Parser({ params }: IProps) {
  const data = getData();

  console.log(data);

  return (
    <div>
      <h1>Parser - {params.id}</h1>
    </div>
  );
}
