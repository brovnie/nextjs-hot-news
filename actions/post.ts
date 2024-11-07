'use server';

import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export async function savePost(prevData, formData: FormData) {
  const news = formData.get('news')?.toString();
  if (news && news.trim().length === 0) {
    return {
      status: 400,
      error: {
        message: 'Please enter some news',
      },
    };
  }

  try {
    console.log('try');
    await addDoc(collection(db, 'posts'), {
      userId: 1,
      news,
    });
  } catch (error) {
    return {
      status: 400,
      error: {
        message: 'An error occurred while saving the post',
      },
    };
  }
}
