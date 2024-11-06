'use client';
import { auth } from '@/actions/auth';
import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

const Form = (props: { mode: string }) => {
  const { login } = useAuth();
  const router = useRouter();
  const [state, action, isPending] = useActionState(
    auth.bind(null, props.mode),
    null
  );
  useEffect(() => {
    if (state?.status === 200) {
      login();
      router.push('/');
    }
  }, [state]);

  return (
    <form action={action}>
      {state?.error && (
        <div>
          <p>{state?.error.message}</p>
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Enter password" />
      </div>
      <div>
        <button type="submit" disabled={isPending}>
          {props.mode === 'login' ? 'Sign in' : 'Sign up'}
        </button>
        {props.mode === 'login' ? (
          <Link href="/signup">Create new account</Link>
        ) : (
          <Link href="/login">Login to existing account</Link>
        )}
      </div>
    </form>
  );
};

export default Form;
