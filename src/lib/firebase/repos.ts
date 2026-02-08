import { db } from './config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, getDoc } from 'firebase/firestore';

export interface Repository {
    id: string;
    owner: string;
    name: string;
    description: string;
    html_url: string;
    maintainerId: string | null; // UID of the maintainer
    maintainerUsername: string | null; // GitHub username for easier display
    tier?: 'gold' | 'silver' | 'bronze'; // Tier for points calculation
}

export const addRepository = async (repo: Omit<Repository, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, 'repositories'), repo);
        return docRef.id;
    } catch (error) {
        console.error("Error adding repository: ", error);
        throw error;
    }
};

export const getRepositories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'repositories'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Repository));
    } catch (error) {
        console.error("Error getting repositories: ", error);
        return [];
    }
};

export const deleteRepository = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'repositories', id));
    } catch (error) {
        console.error("Error deleting repository: ", error);
        throw error;
    }
};

export const updateRepositoryMaintainer = async (repoId: string, maintainerId: string, maintainerUsername: string) => {
    try {
        const repoRef = doc(db, 'repositories', repoId);
        await updateDoc(repoRef, { maintainerId, maintainerUsername });
    } catch (error) {
        console.error("Error updating repository maintainer: ", error);
        throw error;
    }
};

export const getMaintainerRepositories = async (maintainerId: string) => {
    try {
        const q = query(collection(db, 'repositories'), where("maintainerId", "==", maintainerId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Repository));
    } catch (error) {
        console.error("Error getting maintainer repositories: ", error);
        return [];
    }
}
