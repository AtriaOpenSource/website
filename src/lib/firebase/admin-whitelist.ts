/**
 * Admin Email Whitelist
 * Checks if a given email is authorized as an admin
 */

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];

export function isAdmin(email: string | null | undefined): boolean {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email);
}

export function getAdminEmails(): string[] {
    return ADMIN_EMAILS;
}
