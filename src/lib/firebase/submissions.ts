import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    orderBy,
    deleteDoc,
} from 'firebase/firestore';
import { db } from './config';
import { Submission } from '../types/form';

const SUBMISSIONS_COLLECTION = 'submissions';

/**
 * Check if a user has already submitted to a specific form
 */
export async function checkDuplicateSubmission(
    userEmail: string,
    formSlug: string
): Promise<boolean> {
    const submissionsRef = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(
        submissionsRef,
        where('userEmail', '==', userEmail),
        where('formSlug', '==', formSlug)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

/**
 * Submit a form response
 */
export async function submitForm(
    submissionData: Omit<Submission, 'id' | 'submittedAt'>
): Promise<string> {
    const submissionsRef = collection(db, SUBMISSIONS_COLLECTION);

    const docRef = await addDoc(submissionsRef, {
        ...submissionData,
        submittedAt: serverTimestamp(),
    });

    return docRef.id;
}

/**
 * Get all submissions for a specific form
 */
export async function getSubmissions(formSlug: string): Promise<Submission[]> {
    const submissionsRef = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(
        submissionsRef,
        where('formSlug', '==', formSlug),
        orderBy('submittedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Submission[];
}

/**
 * Get submission count for a form
 */
export async function getSubmissionCount(formSlug: string): Promise<number> {
    const submissionsRef = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(submissionsRef, where('formSlug', '==', formSlug));

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
}

/**
 * Get all submissions (admin only)
 */
export async function getAllSubmissions(): Promise<Submission[]> {
    const submissionsRef = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(submissionsRef, orderBy('submittedAt', 'desc'));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Submission[];
}

/**
 * Delete a submission
 */
export async function deleteSubmission(submissionId: string): Promise<void> {
    const submissionRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
    await deleteDoc(submissionRef);
}
