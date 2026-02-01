import { Timestamp } from 'firebase/firestore';

// Field Types
export type FieldType = 'text' | 'paragraph' | 'radio' | 'checkbox' | 'select';

// Form Field Interface
export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    options?: string[];
    required: boolean;
}

// Form Interface
export interface Form {
    slug: string;
    title: string;
    description: string;
    fields: FormField[];
    createdBy: string;
    createdAt: Timestamp | Date;
}

// Submission Interface
export interface Submission {
    id?: string;
    formSlug: string;
    userId: string;
    userEmail: string;
    userName: string;
    responses: Record<string, any>;
    submittedAt: Timestamp | Date;
}

// Form Builder State
export interface FormBuilderState {
    slug: string;
    title: string;
    description: string;
    fields: FormField[];
}
