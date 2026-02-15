import { db } from './config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

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

export const getMaintainerRepositories = async (maintainerId: string, githubUsername?: string | null) => {
    try {
        const repositoriesRef = collection(db, 'repositories');
        const snapshots = [];

        const byIdQuery = query(repositoriesRef, where("maintainerId", "==", maintainerId));
        snapshots.push(await getDocs(byIdQuery));

        if (githubUsername) {
            const byUsernameQuery = query(repositoriesRef, where("maintainerUsername", "==", githubUsername));
            snapshots.push(await getDocs(byUsernameQuery));
        }

        const merged = new Map<string, Repository>();
        snapshots.forEach((snapshot) => {
            snapshot.docs.forEach((repoDoc) => {
                merged.set(repoDoc.id, { id: repoDoc.id, ...repoDoc.data() } as Repository);
            });
        });

        return Array.from(merged.values());
    } catch (error) {
        console.error("Error getting maintainer repositories: ", error);
        return [];
    }
}
