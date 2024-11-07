'use server';

import { db } from '@/firebase/config';
import { addDoc, collection, query, Timestamp } from 'firebase/firestore';
import { getPossibleInstrumentationHookFilenames } from 'next/dist/build/utils';

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
    await addDoc(collection(db, 'posts'), {
      userId: 1,
      news,
      created_at: Timestamp.now(),
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

export async function getPosts() {
  return new Promise((resolve, reject) => {
    let collectionRef = collection(db, 'posts');
    let orderedQuery = query(collectionRef, orderBy('created_at'));
  });
}
