# Project: Safari Kids 🦁

**Safari Kids** is a playful, educational web application for children designed to teach them about animals through interactive cards and a "hide-and-seek" style game. It is built as a Single Page Application (SPA).

## 🛠 Tech Stack

-   **Framework:** [React](https://react.dev/) (v18)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4), configured with PostCSS.
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animations/Effects:**
    -   `canvas-confetti` for winning celebrations.
    -   Native CSS animations (shake, fade-in) and `card-bounce` effects.
    -   Framer Motion (installed as dependency, potentially for future complex animations).
-   **Audio:** Browser Native `SpeechSynthesisUtterance` for text-to-speech.

## 📂 Project Structure

-   **`src/App.jsx`**: Main application logic. Handles routing (view state: `home`, `learn`, `play`) and orchestrates the Game and Learn views.
-   **`src/components/AnimalCard.jsx`**: Reusable component for displaying animal cards. Used in both "Learn" (with name) and "Game" (without name) modes.
-   **`src/data/animals.js`**: Data source containing animal objects (`id`, `name`, `emoji`, `color`, `shadow`, `soundText`).
-   **`maquette.html`**: A static HTML/JS prototype of the application, useful for reference or styling comparisons.
-   **`index.html`**: Vite entry point.

## 🚀 Building & Running

### Development
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
Build the application for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

### Linting
Run ESLint to check for code quality issues:
```bash
npm run lint
```

## 🎨 Design System & Conventions

-   **Theme:**
    -   Background: `bg-[#f0fdf4]` (Light mint green).
    -   Typography: 'Fredoka' (Google Font) or sans-serif fallback.
    -   **Buttons/Cards:** Designed with a "3D" feel using heavy bottom shadows (e.g., `shadow-[0_8px_0_#...]`) and transform effects on active/hover states to simulate physical buttons.
-   **Interactions:**
    -   **Click:** Triggers sound or game logic.
    -   **Feedback:** Visual shake on wrong answers, confetti + sound on correct answers.
-   **Code Style:**
    -   Functional React components with Hooks (`useState`, `useEffect`).
    -   Tailwind utility classes for all styling (no separate CSS files for components usually).
    -   French language localization (`fr-FR`) for speech and text.
