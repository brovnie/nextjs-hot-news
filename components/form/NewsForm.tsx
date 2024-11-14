'use client';
import { savePost } from '@/actions/post';
import { useAuth } from '@/context/auth';
import { useActionState } from 'react';

const NewsForm = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  const [state, action, isPending] = useActionState(savePost, null);
  return (
    <form action={action}>
      {state?.error && (
        <div>
          <p>{state?.error.message}</p>
        </div>
      )}
      <textarea name="news" placeholder="Enter news"></textarea>
      <button>Add news</button>
    </form>
  );
};

export default NewsForm;
