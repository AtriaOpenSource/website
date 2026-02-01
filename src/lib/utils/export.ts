import { Submission, FormField } from '../types/form';

/**
 * Export submissions data to CSV format
 */
export function exportToCSV(
    submissions: Submission[],
    formFields: FormField[],
    filename: string
): void {
    if (submissions.length === 0) {
        return;
    }

    // Build CSV header
    const headers = [
        'Submitted At',
        'Name',
        'Email',
        ...formFields.map((field) => field.label),
    ];

    // Build CSV rows
    const rows = submissions.map((submission) => {
        const submittedAt = submission.submittedAt instanceof Date
            ? submission.submittedAt.toLocaleString()
            : new Date(submission.submittedAt.seconds * 1000).toLocaleString();

        return [
            submittedAt,
            submission.userName,
            submission.userEmail,
            ...formFields.map((field) => {
                const value = submission.responses[field.id];
                if (Array.isArray(value)) {
                    return value.join('; ');
                }
                return value || '';
            }),
        ];
    });

    // Convert to CSV string
    const csvContent = [
        headers.join(','),
        ...rows.map((row) =>
            row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ),
    ].join('\n');

    // Trigger download
    downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Export submissions data to XLSX format
 */
export async function exportToXLSX(
    submissions: Submission[],
    formFields: FormField[],
    filename: string
): Promise<void> {
    if (submissions.length === 0) {
        alert('No data to export');
        return;
    }

    const XLSX = await import('xlsx');

    // Prepare data for XLSX
    const data = submissions.map((submission) => {
        const submittedAt = submission.submittedAt instanceof Date
            ? submission.submittedAt.toLocaleString()
            : new Date(submission.submittedAt.seconds * 1000).toLocaleString();

        const row: Record<string, any> = {
            'Submitted At': submittedAt,
            'Name': submission.userName,
            'Email': submission.userEmail,
        };

        formFields.forEach((field) => {
            const value = submission.responses[field.id];
            if (Array.isArray(value)) {
                row[field.label] = value.join('; ');
            } else {
                row[field.label] = value || '';
            }
        });

        return row;
    });

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');

    // Auto-size columns
    const maxWidth = 50;
    const colWidths = Object.keys(data[0] || {}).map((key) => {
        const maxLength = Math.max(
            key.length,
            ...data.map((row) => String(row[key] || '').length)
        );
        return { wch: Math.min(maxLength + 2, maxWidth) };
    });
    worksheet['!cols'] = colWidths;

    // Trigger download
    XLSX.writeFile(workbook, filename);
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
