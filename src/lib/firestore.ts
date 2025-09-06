
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import type { AnalysisResult } from './types';

const HISTORY_COLLECTION = 'history';

export async function saveAnalysisHistory(
  userId: string,
  analysisData: AnalysisResult
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, HISTORY_COLLECTION), {
      ...analysisData,
      userId,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Could not save analysis history.');
  }
}

export async function getAnalysisHistory(userId: string): Promise<AnalysisResult[]> {
  const q = query(
    collection(db, HISTORY_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as AnalysisResult));
}
