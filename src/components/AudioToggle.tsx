import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Howler sound
    soundRef.current = new Howl({
      src: ['/audio/ambient.mp3', '/audio/ambient.ogg'],
      loop: true,
      volume: 0.3,
      onload: () => setIsLoaded(true),
      onloaderror: () => {
        console.log('Audio file not found - audio feature disabled');
        setIsLoaded(false);
      },
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const toggleAudio = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 glassmorphism rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
      onClick={toggleAudio}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      title={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
    >
      {isPlaying ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </motion.svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      )}
      
      {/* Audio status indicator */}
      {isLoaded && (
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            isPlaying ? 'bg-green-400' : 'bg-white/50'
          }`}
          animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default AudioToggle;
