import {
    collection,
    doc,
    getDoc,
    setDoc,
    getDocs,
    serverTimestamp,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from './config';
import { Form, FormBuilderState } from '../types/form';

const FORMS_COLLECTION = 'forms';

/**
 * Create a new form in Firestore
 */
export async function createForm(
    formData: FormBuilderState,
    createdBy: string
): Promise<void> {
    const formRef = doc(db, FORMS_COLLECTION, formData.slug);

    await setDoc(formRef, {
        ...formData,
        createdBy,
        createdAt: serverTimestamp(),
    });
}

/**
 * Update an existing form
 */
export async function updateForm(
    slug: string,
    formData: Partial<FormBuilderState>
): Promise<void> {
    const formRef = doc(db, FORMS_COLLECTION, slug);
    await updateDoc(formRef, formData);
}

/**
 * Get a form by its slug
 */
export async function getForm(slug: string): Promise<Form | null> {
    const formRef = doc(db, FORMS_COLLECTION, slug);
    const formSnap = await getDoc(formRef);

    if (formSnap.exists()) {
        return formSnap.data() as Form;
    }
    return null;
}

/**
 * Get all forms
 */
export async function getAllForms(): Promise<Form[]> {
    const formsRef = collection(db, FORMS_COLLECTION);
    const querySnapshot = await getDocs(formsRef);

    return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        slug: doc.id,
    })) as Form[];
}

/**
 * Delete a form
 */
export async function deleteForm(slug: string): Promise<void> {
    const formRef = doc(db, FORMS_COLLECTION, slug);
    await deleteDoc(formRef);
}

/**
 * Check if a slug is available
 */
export async function isSlugAvailable(slug: string): Promise<boolean> {
    const formRef = doc(db, FORMS_COLLECTION, slug);
    const formSnap = await getDoc(formRef);
    return !formSnap.exists();
}
