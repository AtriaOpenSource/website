export type UploadFileTypeKey =
    | "images"
    | "pdf"
    | "documents"
    | "spreadsheets"
    | "archives"
    | "audio"
    | "video";

export interface UploadFileTypeOption {
    key: UploadFileTypeKey;
    label: string;
    accept: string[];
}

export const UPLOAD_FILE_TYPE_OPTIONS: UploadFileTypeOption[] = [
    { key: "images", label: "Images (JPG, PNG, WEBP)", accept: [".jpg", ".jpeg", ".png", ".webp"] },
    { key: "pdf", label: "PDF", accept: [".pdf"] },
    { key: "documents", label: "Documents (DOC, DOCX, TXT)", accept: [".doc", ".docx", ".txt"] },
    { key: "spreadsheets", label: "Spreadsheets (XLS, XLSX, CSV)", accept: [".xls", ".xlsx", ".csv"] },
    { key: "archives", label: "Archives (ZIP, RAR)", accept: [".zip", ".rar"] },
    { key: "audio", label: "Audio (MP3, WAV)", accept: [".mp3", ".wav"] },
    { key: "video", label: "Video (MP4, MOV)", accept: [".mp4", ".mov"] },
];

export const DEFAULT_UPLOAD_FILE_TYPES: UploadFileTypeKey[] = ["images", "pdf", "documents"];

export function getUploadAcceptList(selectedTypes?: UploadFileTypeKey[]): string[] {
    const resolvedTypes = selectedTypes?.length ? selectedTypes : DEFAULT_UPLOAD_FILE_TYPES;
    const selectedSet = new Set(resolvedTypes);
    return UPLOAD_FILE_TYPE_OPTIONS
        .filter((option) => selectedSet.has(option.key))
        .flatMap((option) => option.accept);
}

export function isFileAllowedByType(fileName: string, selectedTypes?: UploadFileTypeKey[]): boolean {
    const lowerName = fileName.toLowerCase();
    return getUploadAcceptList(selectedTypes).some((ext) => lowerName.endsWith(ext));
}
