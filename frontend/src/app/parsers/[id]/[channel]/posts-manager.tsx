'use client';

import { fetchData } from '@/store';
import { TInstagramPost } from '../../../../../../src/types/instagram';
import { TParser } from '../../../../../../src/types/firebase';
import { Button } from '@/components/button';

interface IProps {
  userId: number;
  channel: string;
  parser: TParser;
}
export const PostsManager = ({ userId, channel, parser }: IProps) => {
  console.log(parser);
  // const [lastPublishedPost, setLastPublishedPost] =
  //   useState<TInstagramPost | null>(null);
  // const [nextPost, setNextPost] = useState<TInstagramPost | null>(null);
  // const [allPosts, setAllPost] = useState<TInstagramPost[]>([]);

  const getLastPublishedPost = async () => {
    try {
      const response = await fetchData<TInstagramPost>(
        'instagram/get-last-published-post',
        {
          userId,
          channel,
        },
      );
      if (response.data) {
        setLastPublishedPost(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getNextPost = async () => {
    try {
      const response = await fetchData<TInstagramPost>(
        'instagram/get-next-post',
        {
          userId,
          channel,
        },
      );
      if (response.data) {
        setNextPost(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await fetchData<TInstagramPost[]>(
        'instagram/get-posts',
        {
          instagram: parser.instagram,
        },
      );
      if (response && response.data) {
        setAllPost(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendPost = async () => {
    const response = await fetchData('telegram/send-post', {
      userId: userId,
      channel: channel,
    });

    console.log(response);
  };

  const fetchPosts = async () => {
    const response = await fetchData('instagram/fetch-posts', {
      instagram: parser.instagram,
    });
    console.log(response);
  };

  const authorizeInstagram = async () => {
    const response = await fetchData('instagram/set-session');
    console.log(response);
  };

  return (
    <div>
      <div>
        <Button onClick={getLastPublishedPost}>Get last published post</Button>
        <Button onClick={getNextPost}>Get next post</Button>
        <Button onClick={getAllPosts}>Get all posts</Button>
        <Button onClick={sendPost}>Send post</Button>
        <Button onClick={fetchPosts}>Fetch posts</Button>
        <Button onClick={authorizeInstagram}>Authorize instagram</Button>
      </div>
      <div>Last published:</div>
      <div></div>
    </div>
  );
};
