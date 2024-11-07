import React from 'react';

type Props = {
  news: string;
  userId: string;
};

const PostItem = (props: Props) => {
  return (
    <li>
      <p>{props.news}</p>
      <p>{props.userId}</p>
    </li>
  );
};

export default PostItem;
