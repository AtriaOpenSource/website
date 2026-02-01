# Specification: OSAtria Platform

## 1. Project Vision

**OSAtria** is the central hub for the institution's largest open-source event, a collaboration between **Apex Community** and **OSCode**. It serves as a landing page, a custom form engine, and a future contributor dashboard.

## 2. Design System & Ethics

### Visual Identity

* **Vibe:** Premium, High-Tech, Cyber-Minimalist.
* **Color Palette:**
* **Primary:** Indigo (`#4f46e5`) - Represents trust and the "Apex" lead.
* **Accent:** Orange (`#f97316`) - Represents energy and action.
* **Neutrals:** Deep Grays (`#0f172a`, `#1e293b`) and Slate for surfaces.


* **Typography:**
* **Headings:** a premium font for a modern, geometric look.
* **Mono:** *JetBrains Mono* for technical details/slugs.



### UI Ethics

* **Micro-interactions:** Smooth CSS transitions on hover; no "abrupt" layout shifts.
* **Accessibility:** High contrast ratios (WCAG AA compliant) despite the dark theme.
* **Clarity:** Use skeleton loaders for form fetching to reduce perceived latency.

---

## 3. Technical Stack

* **Framework:** Next.js 16+ (App Router).
* **Database & Auth:** Firebase (Firestore + Auth).
* **Styling:** Tailwind CSS + Shadcn UI + Framer Motion (for the "techy" vibe).
* **Data Handling:** `lucide-react` (icons), `xlsx` (export), `react-hook-form` (validation).

---

## 4. Feature Specifications

### 4.1. The Landing Page (`/`)

* **Hero Section:** High-impact typography with a gradient text effect (Indigo to Orange).
* **Collaboration Badge:** A floating UI element showing "Apex Community × OSCode."
* **Live Stats:** (Placeholder for now) Total contributors, PRs merged, etc.

### 4.2. Form Builder (`/admin/builder`)

* **Capabilities:**
* Input Types: Short Text, Paragraph, Radio (Single), Checkbox (Multi), Select (Dropdown).
* Drag-and-drop ordering (optional) or simple list-based adding.


* **Slug Management:** Input field to define the custom URL (e.g., `osatria.in/forms/beta-testing`).
* **Firebase Integration:** Save form structure as a JSON object in Firestore under `forms/{slug}`.

### 4.3. Form Engine (`/forms/[slug]`)

* **Logic:**
1. Check if `slug` exists in Firestore.
2. Check Auth state. If not logged in, show "Sign in with Google to Continue."
3. **Constraint:** Query `submissions` collection for `userEmail` + `formSlug`. If found, block entry.


* **UI:** Clean, centered card layout with a progress bar.

### 4.4. Analytics & Export (`/admin/responses/[slug]`)

* **View:** Data table showing all entries.
* **Export:** Two buttons:
* `Export .csv`: Using a standard CSV string builder.
* `Export .xlsx`: Using the `xlsx` library to generate a formatted sheet.



---

## 5. Database Schema (Firestore)

### `forms` Collection

```typescript
{
  slug: string; // Document ID
  title: string;
  description: string;
  fields: [
    {
      id: string;
      type: "text" | "paragraph" | "radio" | "checkbox" | "select";
      label: string;
      options?: string[]; // Only for radio/checkbox/select
      required: boolean;
    }
  ];
  createdBy: string;
  createdAt: timestamp;
}

```

### `submissions` Collection

```typescript
{
  formSlug: string;
  userId: string;
  userEmail: string;
  userName: string;
  responses: Record<string, any>; // fieldId: value
  submittedAt: timestamp;
}

```

---

## 6. Route Map

* `GET /`: Landing Page.
* `GET /forms/[slug]`: Public response entry.
* `GET /admin/builder`: Create/Edit forms.
* `GET /admin/responses/[slug]`: View and export data.
* `GET /dashboard`: (Future) GitHub Login / Global Leaderboard.

---

## 7. Performance Requirements

* **Form Load Time:** < 1.5s on 4G.
* **Auth Redirects:** Seamless transition from Google Sign-in back to the specific form slug.

---
