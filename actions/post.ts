'use server';

import { db } from '@/firebase/config';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
  orderBy,
} from 'firebase/firestore';
import { Post } from './types';

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
    let orderedQuery = query(collectionRef, orderBy('created_at', 'desc'));
    onSnapshot(
      orderedQuery,
      (snapshot) => {
        const posts: Post[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            data: {
              ...data,
              created_at:
                data.created_at instanceof Timestamp
                  ? data.created_at.toMillis()
                  : null,
            },
          } as Post;
        });
        resolve(posts);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
