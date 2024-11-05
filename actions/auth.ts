'use server';
import { redirect } from 'next/navigation';
import { auth as auth_firebase } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export async function signup(prevState, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const errors = {};
  if ((email && !email.includes('@')) || (password && password.length < 8)) {
    return {
      error: {
        message: 'Invalid data',
      },
    };
  }

  if (email && password) {
    console.warn('test');
    createUserWithEmailAndPassword(auth_firebase, email, password);
    redirect('/');
  }
}

export async function login(prevState, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (
    (email && !email.includes('@')) ||
    (password && password.length < 8) ||
    !email ||
    !password
  ) {
    return {
      error: {
        message: 'Invalid login',
      },
    };
  }

  try {
    await signInWithEmailAndPassword(auth_firebase, email, password);
  } catch (err) {
    switch (err.code) {
      case 'auth/invalid-credential':
        console.warn('Invalid credentials');
        return {
          error: {
            message: 'You have entered an invalid username or password',
          },
        };
      case 'auth/too-many-requests':
        console.warn('Invalid credentials');
        return {
          error: {
            message:
              'Access to this account has been temporarily disabled due to many failed login attempts. Try again later or reset your password.',
          },
        };
      default:
        console.warn(err.code);
        return {
          error: {
            message: 'An unexpected error has occurred. Please try again.',
          },
        };
    }
  }
  redirect('/');
}

export async function auth(mode: string, prevState, formData: FormData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }

  return signup(prevState, formData);
}
