'use server';
import { auth as auth_firebase } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export async function signup(prevState, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if ((email && !email.includes('@')) || (password && password.length < 8)) {
    return {
      status: 422,
      error: {
        message: 'Invalid data',
      },
    };
  }

  if (email && password) {
    try {
      await createUserWithEmailAndPassword(auth_firebase, email, password);
      return {
        status: 200,
        email,
      };
    } catch (err) {
      return {
        status: 400,
        error: {
          message: 'User already exists',
        },
      };
    }
  }
}

export async function saveProfile(prevState, formData: FormData) {
  const userName = formData.get('username');
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
          status: 400,
          error: {
            message: 'You have entered an invalid username or password',
          },
        };
      case 'auth/too-many-requests':
        console.warn('Invalid credentials');
        return {
          status: 400,
          error: {
            message:
              'Access to this account has been temporarily disabled due to many failed login attempts. Try again later or reset your password.',
          },
        };
      default:
        return {
          status: 400,
          error: {
            message: 'An unexpected error has occurred. Please try again.',
          },
        };
    }
  }
  return {
    status: 200,
  };
}

export async function logout() {
  try {
    await signOut(auth_firebase);
    return {
      status: 200,
    };
  } catch (err) {
    return {
      status: 400,
      error: {
        message: 'An unexpected error has occurred. Please try again.',
      },
    };
  }
}

export async function auth(mode: string, prevState, formData: FormData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }

  return signup(prevState, formData);
}
