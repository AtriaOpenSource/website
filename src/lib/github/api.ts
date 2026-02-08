
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
