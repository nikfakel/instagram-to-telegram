'use client';

import { useState } from 'react';
import { fetchData } from '@/store';
import { TInstagramPost } from '../../../../../../src/types/instagram';
import { TParser } from '../../../../../../src/types/firebase';

interface IProps {
  userId: number;
  channel: string;
  parser: TParser;
}
export const PostsManager = ({ userId, channel, parser }: IProps) => {
  console.log(parser);
  const [lastPublishedPost, setLastPublishedPost] =
    useState<TInstagramPost | null>(null);
  const [nextPost, setNextPost] = useState<TInstagramPost | null>(null);
  const [allPosts, setAllPost] = useState<TInstagramPost[]>([]);

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
          instagram: 'rihannaofficiall',
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
      channel: 'rihanna_instagram',
    });

    console.log(response);
  };

  console.log(lastPublishedPost);
  console.log(nextPost);
  console.log(allPosts);

  return (
    <div>
      <div>
        <button onClick={getLastPublishedPost}>Get last published post</button>
        <button onClick={getNextPost}>Get next post</button>
        <button onClick={getAllPosts}>Get all posts</button>
        <button onClick={sendPost}>Send post</button>
      </div>
      <div>Last published:</div>
      <div></div>
    </div>
  );
};
