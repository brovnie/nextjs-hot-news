'use client';
import { getPosts } from '@/actions/post';
import { Post } from '@/actions/types';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    getPosts()
      .then((data) => {
        if (data) {
          data && setPosts(data as []);
        }
      })
      .catch((err) => setError('error has occurred'));
  }, []);
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <ul>
      {posts.map((item) => (
        <PostItem
          key={item.id}
          news={item.data.news}
          userId={item.data.userId}
        />
      ))}
    </ul>
  );
};

export default PostsList;
