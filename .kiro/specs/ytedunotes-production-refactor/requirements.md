# Requirements Document

## Introduction

YtEduNotes is a React (Vite) single-page application that allows users to paste a YouTube video URL, watch the video inline, and take timestamped notes. Notes are persisted in localStorage and can be exported as a PDF. This document covers the full production-ready refactor: TypeScript migration, responsive design, accessibility, modern UI with shadcn/ui, dark mode, performance optimizations, and Render deployment configuration.

The refactor is purely a React application — there is no Vue, Angular, or other framework involved.

---

## Glossary

- **App**: The YtEduNotes React single-page application.
- **Note**: A user-created record containing a title, description, and a video timestamp (in seconds).
- **NoteStore**: The Zustand global state store managing notes, video state, and PDF export.
- **VideoPlayer**: The YouTube IFrame API-powered video player component.
- **NotesPanel**: The UI panel containing the note input form and the notes list.
- **HomeView**: The landing page where users enter a YouTube URL.
- **EduNotesView**: The main workspace page showing the VideoPlayer and NotesPanel side by side.
- **Navbar**: The top navigation bar component.
- **Footer**: The bottom footer component.
- **DesignSystem**: The shared set of color, spacing, and typography tokens defined in Tailwind CSS configuration.
- **ToastService**: The notification system that displays transient feedback messages.
- **SkeletonLoader**: A placeholder UI element shown while content is loading.
- **PDF_Exporter**: The module responsible for generating and downloading PDF exports of notes.
- **Router**: React Router DOM v7 managing client-side navigation.
- **Validator**: The module responsible for validating user inputs such as YouTube URLs and note fields.
- **ThemeProvider**: The component managing light/dark mode state and applying the correct CSS class to the document root.

---

## Requirements

### Requirement 1: Remove Mobile Block and Implement Full Responsive Layout

**User Story:** As a mobile or tablet user, I want to use YtEduNotes on any device, so that I am not locked out of the application.

#### Acceptance Criteria

1. THE App SHALL remove the `lg:hidden` desktop-only block from `main.jsx` so that all device sizes can access the application.
2. THE App SHALL implement a mobile-first layout using Tailwind CSS breakpoints (`sm`, `md`, `lg`, `xl`).
3. WHEN the viewport width is below `768px`, THE EduNotesView SHALL stack the VideoPlayer above the NotesPanel vertically.
4. WHEN the viewport width is `768px` or above, THE EduNotesView SHALL display the VideoPlayer and NotesPanel side by side in a two-column layout.
5. THE Navbar SHALL display a functional hamburger menu on viewports below `768px` that opens and closes a mobile navigation drawer.
6. THE Footer SHALL use `position: static` (not `position: fixed`) so that it does not overlap page content.
7. THE App SHALL be visually usable and functional at viewport widths of `320px`, `768px`, `1024px`, and `1440px`.

---

### Requirement 2: TypeScript Migration

**User Story:** As a developer, I want the codebase to be written in TypeScript, so that I benefit from static type checking and improved maintainability.

#### Acceptance Criteria

1. THE App SHALL migrate all `.jsx` and `.js` source files to `.tsx` and `.ts` respectively.
2. THE App SHALL define explicit TypeScript interfaces or types for all data structures, including `Note`, `NoteStore`, and component props.
3. THE App SHALL configure `tsconfig.json` with `strict: true`.
4. WHEN a TypeScript compilation error exists, THE App SHALL fail the build so that type errors are caught before deployment.
5. THE NoteStore SHALL be typed using Zustand's `StateCreator` generic so that all state and actions have inferred types.

---

### Requirement 3: Shared Design System

**User Story:** As a developer, I want a shared design system with consistent tokens, so that the UI is visually coherent and easy to maintain.

#### Acceptance Criteria

1. THE DesignSystem SHALL define a color palette with primary, secondary, neutral, success, warning, and error semantic tokens in the Tailwind CSS configuration.
2. THE DesignSystem SHALL define a typography scale (font sizes, weights, line heights) as Tailwind CSS tokens.
3. THE DesignSystem SHALL define a spacing scale as Tailwind CSS tokens.
4. THE App SHALL apply DesignSystem tokens consistently across all components — no hardcoded hex color values or arbitrary pixel values outside of the token system.
5. THE DesignSystem SHALL support both light and dark color variants for every semantic token.

---

### Requirement 4: Dark Mode Support

**User Story:** As a user, I want to toggle between light and dark mode, so that I can use the app comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE ThemeProvider SHALL persist the user's theme preference to `localStorage` under the key `"ytedunotes-theme"`.
2. WHEN the App initializes, THE ThemeProvider SHALL read the stored theme preference and apply it before the first render to prevent a flash of unstyled content.
3. WHEN no stored preference exists, THE ThemeProvider SHALL default to the user's OS-level `prefers-color-scheme` setting.
4. THE Navbar SHALL include a theme toggle button that switches between light and dark mode.
5. WHEN dark mode is active, THE App SHALL apply the `dark` CSS class to the `<html>` element and all components SHALL render their dark-mode variants via Tailwind's `dark:` prefix.
6. THE theme toggle button SHALL display a sun icon in dark mode and a moon icon in light mode.

---

### Requirement 5: shadcn/ui Integration

**User Story:** As a developer, I want to use shadcn/ui components, so that the UI is built on accessible, well-tested primitives.

#### Acceptance Criteria

1. THE App SHALL install and configure shadcn/ui with the Tailwind CSS v4 adapter.
2. THE App SHALL use the shadcn/ui `Button` component for all interactive buttons throughout the application.
3. THE App SHALL use the shadcn/ui `Input` and `Textarea` components for all form fields.
4. THE App SHALL use the shadcn/ui `Dialog` component for confirmation modals (e.g., clear all notes confirmation).
5. THE App SHALL use the shadcn/ui `Drawer` component for the mobile navigation menu.
6. THE App SHALL use the shadcn/ui `Skeleton` component for all loading placeholder states.
7. THE App SHALL use the shadcn/ui `Tooltip` component to display descriptive labels on icon-only buttons.
8. THE App SHALL use the shadcn/ui `Badge` component to display the formatted timestamp on each note card.

---

### Requirement 6: Toast Notifications

**User Story:** As a user, I want to see brief feedback messages after actions, so that I know whether my actions succeeded or failed.

#### Acceptance Criteria

1. THE ToastService SHALL display a success toast WHEN a note is successfully added.
2. THE ToastService SHALL display an error toast WHEN the user submits an empty note title.
3. THE ToastService SHALL display an error toast WHEN the user submits an invalid or non-YouTube URL.
4. THE ToastService SHALL display a success toast WHEN the PDF export completes successfully.
5. THE ToastService SHALL display a success toast WHEN all notes are cleared.
6. WHEN a toast is displayed, THE ToastService SHALL automatically dismiss it after `4000ms`.
7. THE App SHALL replace all existing `alert()` calls with ToastService notifications.

---

### Requirement 7: Note Management (Add, Edit, Delete, Seek)

**User Story:** As a user, I want to manage my notes with full CRUD operations and click-to-seek, so that I can efficiently review and update my notes.

#### Acceptance Criteria

1. WHEN the user clicks the "Add Note" button with a non-empty title, THE NoteStore SHALL add a new Note with the current video timestamp, title, and description.
2. WHEN the user clicks a note in the NotesPanel, THE VideoPlayer SHALL seek to the note's stored timestamp.
3. THE NotesPanel SHALL display an edit button on each note card that opens an inline edit form pre-populated with the note's current title and description.
4. WHEN the user saves an edited note, THE NoteStore SHALL update the note in state and persist the change to `localStorage`.
5. THE NotesPanel SHALL display a delete button on each note card.
6. WHEN the user clicks the delete button on a note, THE App SHALL display a confirmation dialog before removing the note.
7. WHEN the user confirms deletion, THE NoteStore SHALL remove the note from state and from `localStorage`.
8. THE NotesPanel SHALL display notes sorted by timestamp in ascending order.
9. THE NotesPanel SHALL display the formatted timestamp (e.g., `1:23`) on each note card using a Badge component.

---

### Requirement 8: Form Validation and UX Feedback

**User Story:** As a user, I want clear validation feedback on forms, so that I understand what is required before submitting.

#### Acceptance Criteria

1. WHEN the user submits the HomeView URL form with an empty input, THE Validator SHALL display an inline error message below the input field.
2. WHEN the user submits the HomeView URL form with a URL that does not match a valid YouTube URL pattern, THE Validator SHALL display an inline error message describing the issue.
3. WHEN the user submits the note form with an empty title field, THE Validator SHALL display an inline error message below the title input.
4. WHEN the user corrects a validation error and the input becomes valid, THE Validator SHALL clear the inline error message.
5. THE HomeView URL input SHALL display a visual error state (e.g., red border) when validation fails.
6. THE note title input SHALL display a visual error state when validation fails.

---

### Requirement 9: Loading States and Skeleton Loaders

**User Story:** As a user, I want to see loading indicators while content is being prepared, so that I know the app is working.

#### Acceptance Criteria

1. WHEN the VideoPlayer is initializing the YouTube IFrame API, THE App SHALL display a SkeletonLoader in place of the video area.
2. WHEN the VideoPlayer has finished loading, THE App SHALL replace the SkeletonLoader with the video iframe.
3. WHEN notes are being loaded from `localStorage` on initial mount, THE NotesPanel SHALL display SkeletonLoader placeholders for note cards.
4. WHEN the PDF export is in progress, THE App SHALL display a loading spinner on the Export PDF button and disable the button to prevent duplicate submissions.

---

### Requirement 10: Accessibility

**User Story:** As a user relying on assistive technology, I want the app to be accessible, so that I can use it with a keyboard or screen reader.

#### Acceptance Criteria

1. THE App SHALL use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`) in place of generic `<div>` wrappers where appropriate.
2. THE Navbar SHALL include a `<nav>` element with an `aria-label="Main navigation"` attribute.
3. THE VideoPlayer container SHALL include an `aria-label` describing the embedded video.
4. ALL icon-only buttons SHALL include an `aria-label` attribute describing their action.
5. ALL form inputs SHALL have associated `<label>` elements linked via `htmlFor` and `id` attributes.
6. THE App SHALL be fully operable using keyboard navigation alone, including focus management when modals and drawers open and close.
7. WHEN a modal or drawer opens, THE App SHALL trap focus within the modal or drawer until it is closed.
8. THE App SHALL maintain a visible focus indicator on all interactive elements.
9. ALL color combinations used in the DesignSystem SHALL meet WCAG 2.1 AA contrast ratio requirements (minimum 4.5:1 for normal text, 3:1 for large text).
10. THE App SHALL include a `lang="en"` attribute on the `<html>` element.

---

### Requirement 11: Performance — Lazy Loading and Code Splitting

**User Story:** As a user, I want the app to load quickly, so that I can start using it without waiting.

#### Acceptance Criteria

1. THE App SHALL use `React.lazy` and `Suspense` to lazy-load the `EduNotesView` route so that its bundle is not included in the initial page load.
2. THE App SHALL configure Vite's `build.rollupOptions.output.manualChunks` to split vendor libraries (React, React Router, Zustand, jsPDF) into separate chunks.
3. THE App SHALL use `React.memo` on the `VideoPlayer` component to prevent unnecessary re-renders when unrelated state changes.
4. THE NoteStore SHALL use Zustand's selector pattern so that components only re-render when the specific slice of state they consume changes.
5. THE App SHALL lazy-load the `jsPDF` library dynamically at the time of PDF export rather than including it in the initial bundle.

---

### Requirement 12: Memoization and Anti-Pattern Removal

**User Story:** As a developer, I want the codebase to be free of React anti-patterns, so that the app is stable and performant.

#### Acceptance Criteria

1. THE NotesSection component SHALL remove the `useEffect` that lists `UpdateNote` (a function defined inside the component) as a dependency, as this causes an infinite re-render loop.
2. THE App SHALL call `loadNotes` once on application initialization (e.g., in the NoteStore's initial state or in a top-level effect with an empty dependency array) rather than inside a component effect with a function dependency.
3. THE App SHALL use `useCallback` to memoize event handler functions passed as props to child components.
4. THE App SHALL use `useMemo` to memoize derived values (e.g., sorted notes list) that are computed from state.
5. THE Navbar component SHALL remove the unused `onResizerClick` prop and replace the broken mobile "Get Started" button with a functional navigation link.

---

### Requirement 13: Standardized Folder Structure

**User Story:** As a developer, I want a consistent, scalable folder structure, so that I can find and maintain code easily.

#### Acceptance Criteria

1. THE App SHALL organize source files under `src/` using the following top-level directories: `components/`, `pages/`, `store/`, `hooks/`, `lib/`, `types/`, and `assets/`.
2. THE `components/` directory SHALL contain a `ui/` subdirectory for shadcn/ui primitive components and a top-level directory for application-specific composite components.
3. THE `hooks/` directory SHALL contain all custom React hooks extracted from components.
4. THE `lib/` directory SHALL contain utility functions including the YouTube URL validator and PDF export logic.
5. THE `types/` directory SHALL contain all shared TypeScript interface and type definitions.
6. WHEN a new component is created, THE App SHALL place it in the appropriate subdirectory according to this structure.

---

### Requirement 14: PDF Export with Page Overflow Protection

**User Story:** As a user, I want to export my notes as a well-formatted PDF, so that I can review them offline without content being cut off.

#### Acceptance Criteria

1. THE PDF_Exporter SHALL check the remaining vertical space on the current page before rendering each note.
2. WHEN the remaining vertical space is insufficient for the next note's content, THE PDF_Exporter SHALL insert a page break before rendering that note.
3. THE PDF_Exporter SHALL wrap long description text to fit within the page width using jsPDF's `splitTextToSize` method.
4. THE PDF_Exporter SHALL include a header on each page displaying the document title and page number.
5. WHEN the notes array is empty, THE PDF_Exporter SHALL display a toast notification informing the user there are no notes to export, and SHALL NOT generate a PDF file.

---

### Requirement 15: YouTube URL Parsing (Round-Trip Integrity)

**User Story:** As a developer, I want the YouTube URL parser to be reliable and well-tested, so that video IDs are always extracted correctly.

#### Acceptance Criteria

1. THE Validator SHALL extract an 11-character video ID from standard `youtube.com/watch?v=` URLs.
2. THE Validator SHALL extract an 11-character video ID from shortened `youtu.be/` URLs.
3. THE Validator SHALL extract an 11-character video ID from `youtube.com/embed/` URLs.
4. IF a URL does not match any recognized YouTube URL pattern, THEN THE Validator SHALL return `null` and not set the video ID in state.
5. THE Validator SHALL accept URLs containing additional query parameters (e.g., `&t=`, `&list=`) without failing extraction.
6. FOR ALL valid YouTube URLs, extracting the video ID and reconstructing a canonical `youtube.com/watch?v={id}` URL SHALL produce a URL from which the same video ID can be re-extracted (round-trip property).

---

### Requirement 16: Render Deployment Configuration

**User Story:** As a developer, I want a complete Render deployment configuration, so that I can deploy the app to production without manual setup.

#### Acceptance Criteria

1. THE App SHALL include a `render.yaml` file at the project root defining a static site service with `buildCommand: "npm install && npm run build"` and `publishDir: "dist"`.
2. THE `render.yaml` SHALL specify `envVars` for any required environment variables with placeholder values and comments.
3. THE App SHALL include a `_redirects` file in the `public/` directory containing `/* /index.html 200` to support client-side routing on Render.
4. THE App's `README.md` SHALL include a "Deployment" section with step-by-step instructions for deploying to Render, including how to set environment variables and trigger a manual deploy.
5. THE `vite.config.ts` SHALL set `build.outDir` to `"dist"` explicitly to match the Render `publishDir`.

---

### Requirement 17: Modern UI Redesign

**User Story:** As a user, I want a clean, modern, and polished UI, so that the app is pleasant and intuitive to use.

#### Acceptance Criteria

1. THE HomeView SHALL display a hero section with the app name, a brief description, and the URL input form centered on the page.
2. THE HomeView SHALL display a visually distinct call-to-action button that navigates to the EduNotesView.
3. THE NotesPanel SHALL display each note as a card with visible title, formatted timestamp badge, and action buttons (seek, edit, delete).
4. THE Navbar SHALL display the app logo/name on the left and navigation links on the right, with consistent spacing and typography from the DesignSystem.
5. THE Footer SHALL display the app name, description, and contact information in a structured layout without overlapping page content.
6. THE App SHALL apply smooth CSS transitions (duration `150ms`–`300ms`) to interactive elements including buttons, cards, and the theme toggle.
7. THE App SHALL use consistent border-radius values from the DesignSystem across all card and button components.
