# Contact App

## Overview

This Contact App is a robust, user-friendly application designed to help you efficiently manage your contacts. The app leverages React for the frontend, Tailwind CSS for styling, Redux Toolkit for state management, and Ant Design for UI components, ensuring a high-performance and visually appealing user interface.

## Features

- **Contact Creation and Editing:** Easily create new contact or edit existing ones with an intuitive form.
- **Contact Searching:** Search contacts based on their name and email to focus on what matters most.
- **Contact Deletion:** Remove contact that are no longer needed.
- **Interactive UI:** Leveraging Ant Design components for a polished and interactive user interface.
- **Global State Management:** Using Redux Toolkit to handle the state of contacts across the application efficiently.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **Redux & Redux Toolkit:** A predictable state container for JavaScript apps, with tools to streamline the development process.
- **Ant Design:** A rich set of open-source UI components for React.
- **TypeScript:** Superset of JavaScript that adds static types for improved code quality and maintainability.

## Installation

1.  **Clone the repository:**

### git clone https://github.com/IlhomBek-F/contact-app.git

2.  **Install dependencies:**

### npm install

3.  **Start the application:**

### npm start

The app should now be running on http://localhost:3000

## Folder Structure

```
├── public/
├── src/
│ ├── api/
│ │ ├── index.tsx
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── Content.tsx
│ │ ├── ContactDrawer.
│ ├── contexts/
│ │ ├── MessageProvider.tsx
│ ├── core/
│ │  ├── models/
│ │  │   └── ContactModel.ts
│ │  │   └── DrawerStateModel.ts
│ │  │   └── StateModel.ts
│ ├── hooks/
│ │ ├── useDebounce.tsx
│ ├── store/
│ │   ├── slices/
│ │   │   └── contactSlice.ts
│ │   └── contactStore.
│ ├── utils/
│ │ ├── index.tsx
│ ├── App.tsx
│ ├── index.tsx
├── README.md
├── package.json
└── tsconfig.json
```
