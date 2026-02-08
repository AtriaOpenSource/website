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
    },
    contributor: {
        base: "/dashboard/contributor",
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
