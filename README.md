# Happy Journey Buddy 🚆✨

A beautiful single-page React + TypeScript web app with modern UI animations displaying a heartfelt "Happy Journey Monika" greeting with mountain scenery and train animation.

## Features

- 🏔️ Animated mountain scenery with parallax effect
- 🚆 Smooth train animation using Lottie
- ✨ Beautiful text animations with Framer Motion
- 🎵 Optional ambient audio toggle
- 💎 Glassmorphism card design
- 📱 Fully responsive design
- 🌈 Gradient sky with floating particles

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lottie React** - Train animation
- **Howler.js** - Audio playback

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd JOURNY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Adding Ambient Audio (Optional)

To add ambient audio:
1. Place your audio file in `public/audio/` as `ambient.mp3` or `ambient.ogg`
2. The audio toggle button will automatically enable when the file is detected

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. For production:
   ```bash
   vercel --prod
   ```

### ngrok (For quick sharing)

1. Build the project:
   ```bash
   npm run build
   ```

2. Serve the dist folder:
   ```bash
   npx serve dist
   ```

3. In another terminal, start ngrok:
   ```bash
   ngrok http 3000
   ```

4. Share the ngrok URL!

### GitHub Pages

1. Update `vite.config.ts` base to your repo name:
   ```ts
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

2. Build and deploy to `gh-pages` branch

## Project Structure

```
JOURNY/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── public/
│   ├── audio/
│   │   └── ambient.mp3 (optional)
│   └── vite.svg
└── src/
    ├── main.tsx
    ├── index.css
    ├── App.tsx
    ├── components/
    │   ├── TrainScene.tsx
    │   ├── MessageCard.tsx
    │   └── AudioToggle.tsx
    └── assets/
        └── train.json
```

## Customization

### Change the message
Edit `App.tsx` and modify the text in the heading and `MessageCard` component props.

### Change colors
Edit `tailwind.config.js` or modify the gradient classes in the components.

### Change train animation
Replace `src/assets/train.json` with a different Lottie animation file.

---

Made with 💜 by T

