import { db } from './config';
import { collection, getDocs, doc, updateDoc, query, where, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface PullRequest {
    id: string; // This can be the GitHub PR ID or a composite key
    repoId: string;
    repoName: string; // owner/repo
    prNumber: number;
    title: string;
    html_url: string;
    user: {
        login: string;
        avatar_url: string;
    };
    status: 'pending' | 'review' | 'changes' | 'rejected' | 'merged';
    points: number;
    feedback: string;
    criteriaScores: {
        [key: string]: number;
    };
    submittedAt: unknown;
    updatedAt: unknown;
}

export const syncPullRequest = async (prData: Omit<PullRequest, 'id' | 'status' | 'points' | 'feedback' | 'criteriaScores' | 'submittedAt' | 'updatedAt'>) => {
    // We use a composite ID: repoId_prNumber
    const docId = `${prData.repoName.replace('/', '_')}_${prData.prNumber}`;
    const docRef = doc(db, 'pull_requests', docId);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        await setDoc(docRef, {
            ...prData,
            status: 'pending',
            points: 0,
            feedback: '',
            criteriaScores: {},
            submittedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    }
    // We don't overwrite existing local data (status, points) with GitHub data every time, 
    // unless we want to sync status from GitHub (e.g. if merged there).
    return docId;
};

export const getRepoPullRequests = async (repoName: string) => {
    try {
        const q = query(collection(db, 'pull_requests'), where("repoName", "==", repoName));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PullRequest));
    } catch (error) {
        console.error("Error getting PRs: ", error);
        return [];
    }
}

export const updatePullRequestStatus = async (id: string, updates: Partial<PullRequest>) => {
    try {
        const docRef = doc(db, 'pull_requests', id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating PR: ", error);
        throw error;
    }
}

export const getMaintainerPullRequests = async (repoNames: string[]) => {
    if (repoNames.length === 0) return [];
    try {
        // Firestore 'in' query supports up to 10 values. If more, we need to batch or do multiple queries.
        // For now assuming < 10 repos per maintainer or we implementation batching later.
        const q = query(collection(db, 'pull_requests'), where("repoName", "in", repoNames));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PullRequest));
    } catch (error) {
        console.error("Error getting maintainer PRs: ", error);
        return [];
    }
}

export const getContributorPullRequests = async (githubUsername: string) => {
    try {
        const q = query(collection(db, 'pull_requests'), where("user.login", "==", githubUsername));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PullRequest));
    } catch (error) {
        console.error("Error getting contributor PRs: ", error);
        return [];
    }
}
