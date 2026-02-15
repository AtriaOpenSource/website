
interface GithubPR {
    number: number;
    title: string;
    html_url: string;
    user: {
        login: string;
        avatar_url: string;
    };
    body: string;
    created_at: string;
    labels: { name: string }[];
}

interface GithubForkRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    owner: {
        login: string;
    };
    parent?: {
        full_name: string;
    };
    source?: {
        full_name: string;
    };
    updated_at?: string;
}

export const fetchRepoPRs = async (owner: string, repo: string) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all`);
        if (!response.ok) return [];
        const data: GithubPR[] = await response.json();

        // Filter by #asoc in body or title, OR 'asoc' label
        return data.filter(pr =>
            pr.body?.includes('#asoc') ||
            pr.title.includes('#asoc') ||
            pr.labels.some(l => l.name.toLowerCase() === 'asoc')
        );
    } catch (error) {
        console.error("Error fetching GitHub PRs:", error);
        return [];
    }
};

export const fetchRepoForkByUser = async (owner: string, repo: string, githubUsername: string): Promise<GithubForkRepo | null> => {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/forks?per_page=100`);
        if (!response.ok) return null;
        const data: GithubForkRepo[] = await response.json();
        const normalizedUser = githubUsername.toLowerCase();
        return data.find((fork) => fork.owner.login.toLowerCase() === normalizedUser) ?? null;
    } catch (error) {
        console.error("Error fetching repo forks:", error);
        return null;
    }
};
