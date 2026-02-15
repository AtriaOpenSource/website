export type DashboardRole = "admin" | "maintainer" | "contributor";

export const dashboardRoutes = {
    admin: {
        base: "/dashboard/admin",
        repos: "/dashboard/admin/repos",
        users: "/dashboard/admin/users",
        builder: "/dashboard/admin/builder",
        responses: "/dashboard/admin/responses",
    },
    maintainer: {
        base: "/dashboard/maintainer",
        repos: "/dashboard/maintainer/repos",
        reviewPRs: "/dashboard/maintainer/review-prs",
        profile: "/dashboard/maintainer/profile",
    },
    contributor: {
        base: "/dashboard/contributor",
        yourRepos: "/dashboard/contributor/your-repos",
        profile: "/dashboard/contributor/profile",
    },
} as const;

export function getDashboardBase(role?: string | null): string {
    switch (role) {
        case "admin":
            return dashboardRoutes.admin.base;
        case "maintainer":
            return dashboardRoutes.maintainer.base;
        case "contributor":
            return dashboardRoutes.contributor.base;
        default:
            return dashboardRoutes.contributor.base;
    }
}
