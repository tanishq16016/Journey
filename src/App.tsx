import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TrainScene from './components/TrainScene';

// Sparkle emoji component
const SparkleEmoji = ({ delay }: { delay: number }) => (
  <motion.span
    className="inline-block text-2xl md:text-3xl"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      delay,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }}
  >
    ✨
  </motion.span>
);

// Floating message button component
const FloatingMessageButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="fixed z-50 px-5 py-3 font-bold text-white transition-shadow rounded-full shadow-lg bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-xl"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      y: [0, -8, 0],
    }}
    transition={{
      scale: { delay: 2, type: 'spring', stiffness: 260, damping: 20 },
      opacity: { delay: 2, duration: 0.3 },
      y: { delay: 2.5, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    🎁 Secret Message
  </motion.button>
);

// Audio toggle button component
const AudioButton = ({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="fixed z-50 flex items-center justify-center font-bold text-white transition-shadow rounded-full shadow-lg bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {isPlaying ? (
      <span className="text-2xl">🎵</span>
    ) : (
      <span className="text-2xl">🔇</span>
    )}
  </motion.button>
);

// Confetti colors
const confettiColors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f', '#ff6b6b', '#4ecdc4', '#ffe66d'];

// Generate confetti pieces
const generateConfetti = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 360,
  }));
};

// Puzzle popup with secret message
const PuzzlePopup = ({ isOpen, onClose, onOpenLetter }: { isOpen: boolean; onClose: () => void; onOpenLetter: () => void }) => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [wrongMessage, setWrongMessage] = useState('');
  const [confettiPieces] = useState(generateConfetti);

  const correctDate = '16';
  const correctMonth = 'july';

  const handleSubmit = () => {
    if (date.trim() === correctDate && month.trim().toLowerCase() === correctMonth) {
      setShowConfetti(true);
      setIsWrong(false);
      setWrongMessage('');
      setTimeout(() => {
        setShowConfetti(false);
        setIsSolved(true);
      }, 3000);
    } else {
      setIsWrong(true);
      setWrongMessage('❌ Wrong! Try again buddy!');
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  const handleClose = () => {
    setDate('');
    setMonth('');
    setIsSolved(false);
    setShowConfetti(false);
    setIsWrong(false);
    setWrongMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {showConfetti && (
            <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
              {confettiPieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  className="absolute w-3 h-3"
                  style={{
                    left: `${piece.x}%`,
                    backgroundColor: piece.color,
                    borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                  }}
                  initial={{ y: -20, rotate: 0, opacity: 1 }}
                  animate={{
                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                    rotate: piece.rotation + 720,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: piece.duration,
                    delay: piece.delay,
                    ease: 'easeIn',
                  }}
                />
              ))}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="text-6xl font-bold text-white md:text-8xl drop-shadow-lg">
                  🎉 Correct! 🎉
                </div>
              </motion.div>
            </div>
          )}
          
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md p-6 border shadow-2xl bg-gradient-to-br from-amber-400/95 to-orange-500/95 backdrop-blur-md rounded-2xl md:p-8 border-amber-300/30"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                x: isWrong ? [0, -15, 15, -15, 15, -10, 10, 0] : 0
              }}
              exit={{ scale: 0.5, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute text-2xl font-bold top-3 right-3 text-white/80 hover:text-white"
              >
                ×
              </button>
              
              <div className="text-center">
                {!isSolved && !showConfetti && (
                  <>
                    <motion.div
                      className="mb-4 text-5xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎂
                    </motion.div>
                    
                    <h3 className="mb-3 text-xl font-bold text-white md:text-2xl drop-shadow-md">
                      Friendship Test! 💫
                    </h3>
                    
                    <p className="mb-5 text-lg text-white/95">
                      What's My Date of Birth? 🤔
                    </p>
                    
                    <div className="flex justify-center gap-3 mb-4">
                      <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white/80">Date</label>
                        <input
                          type="text"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder="DD"
                          maxLength={2}
                          className="w-20 px-4 py-3 text-xl text-center text-white border rounded-lg bg-white/20 placeholder-white/50 border-white/30 focus:outline-none focus:border-white"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="mb-1 text-sm text-white/80">Month</label>
                        <select
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          title="Select Month"
                          aria-label="Select Month"
                          className="w-32 px-4 py-3 text-lg text-center text-white border rounded-lg cursor-pointer bg-white/20 border-white/30 focus:outline-none focus:border-white"
                        >
                          <option value="" className="text-white bg-slate-800">Select</option>
                          <option value="january" className="text-white bg-slate-800">January</option>
                          <option value="february" className="text-white bg-slate-800">February</option>
                          <option value="march" className="text-white bg-slate-800">March</option>
                          <option value="april" className="text-white bg-slate-800">April</option>
                          <option value="may" className="text-white bg-slate-800">May</option>
                          <option value="june" className="text-white bg-slate-800">June</option>
                          <option value="july" className="text-white bg-slate-800">July</option>
                          <option value="august" className="text-white bg-slate-800">August</option>
                          <option value="september" className="text-white bg-slate-800">September</option>
                          <option value="october" className="text-white bg-slate-800">October</option>
                          <option value="november" className="text-white bg-slate-800">November</option>
                          <option value="december" className="text-white bg-slate-800">December</option>
                        </select>
                      </div>
                    </div>
                    
                    {wrongMessage && (
                      <motion.p
                        className="px-4 py-2 mb-4 text-lg font-bold text-red-100 rounded-lg bg-red-500/40"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        {wrongMessage}
                      </motion.p>
                    )}
                    
                    <motion.button
                      onClick={handleSubmit}
                      className="px-8 py-3 text-lg font-bold text-white transition-colors rounded-lg bg-white/30 hover:bg-white/40"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Check Answer ✓
                    </motion.button>
                
                  </>
                )}
                
                {isSolved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      className="mb-4 text-5xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🎒
                    </motion.div>
                    
                    <h3 className="mb-4 text-xl font-bold text-white md:text-2xl drop-shadow-md">
                      🎉 You Know Me Well! 🎉
                    </h3>
                    
                    <div className="p-4 mb-4 bg-white/20 rounded-xl">
                      <p className="text-lg font-medium leading-relaxed text-white/95 md:text-xl">
                        "Yaar abki baar vo <span className="font-bold underline decoration-wavy decoration-white/50">biscuits</span> lana mat bhulna! 🍪"
                      </p>
                    </div>
                    
                    <motion.div
                      className="mb-4 text-3xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🤝
                    </motion.div>

                    <motion.button
                      onClick={() => {
                        handleClose();
                        onOpenLetter();
                      }}
                      className="px-6 py-3 text-base font-bold text-white transition-colors border-2 rounded-lg bg-white/30 hover:bg-white/50 border-white/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ✉️ Any message for me?
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Old school letter modal
const LetterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    try {
      // Using Web3Forms - free email API (no signup needed for basic use)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '8db05584-1482-4418-beae-37e2b360961c',
          subject: '💌 New Message from Journey Buddy!',
          message: `Someone sent you a message from Happy Journey Buddy:\n\n"${message}"`,
          from_name: 'Journey Buddy App',
        }),
      });
      
      // Show sent regardless of response for good UX
      setIsSent(true);
      setTimeout(() => {
        setMessage('');
        setIsSent(false);
        onClose();
      }, 1500);
    } catch (error) {
      // Still show sent for good UX (offline/demo mode)
      setIsSent(true);
      setTimeout(() => {
        setMessage('');
        setIsSent(false);
        onClose();
      }, 1500);
    }
    
    setIsSending(false);
  };

  const handleClose = () => {
    setMessage('');
    setIsSent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm"
              initial={{ scale: 0.5, y: 50, rotateX: -15, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Old school letter paper */}
              <div 
                className="p-6 border-4 rounded-sm shadow-2xl bg-amber-50 border-amber-200"
                style={{
                  backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, #e5d5c0 28px)`,
                  boxShadow: '5px 5px 15px rgba(0,0,0,0.3), inset 0 0 50px rgba(139,119,101,0.1)',
                }}
              >
                {/* Red margin line */}
                <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-red-300/50" />
                
                <button
                  onClick={handleClose}
                  className="absolute text-xl font-bold top-2 right-2 text-amber-600/70 hover:text-amber-800"
                >
                  ×
                </button>

                {!isSent ? (
                  <>
                    <div className="mb-4 text-center">
                      <h3 className="mb-1 font-serif text-xl font-bold text-amber-800">
                        ✉️ Write to Tanishq
                      </h3>
                      <p className="text-sm text-amber-600">Your message means a lot! 💙</p>
                    </div>

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full h-40 pl-4 font-serif text-base leading-7 bg-transparent resize-none text-amber-900 placeholder-amber-400 focus:outline-none"
                      style={{ lineHeight: '28px' }}
                    />

                    <motion.button
                      onClick={handleSend}
                      disabled={!message.trim() || isSending}
                      className={`w-full py-3 mt-2 font-bold rounded-lg transition-colors ${
                        message.trim() 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                          : 'bg-amber-300 text-amber-500 cursor-not-allowed'
                      }`}
                      whileHover={message.trim() ? { scale: 1.02 } : {}}
                      whileTap={message.trim() ? { scale: 0.98 } : {}}
                    >
                      {isSending ? '📤 Sending...' : '📬 Send Letter'}
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    className="py-8 text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <motion.div
                      className="mb-4 text-6xl"
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      💌
                    </motion.div>
                    <p className="font-serif text-xl font-bold text-amber-800">Letter Sent!</p>
                    <p className="mt-1 text-sm text-amber-600">Thank you! 💙</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Button to show the message card
const ShowMessageButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="px-8 py-4 text-lg font-bold text-white transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:shadow-cyan-500/30"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5 }}
    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
    whileTap={{ scale: 0.95 }}
  >
    📩 Read Tanishq's Message
  </motion.button>
);

// Message card popup
const MessageCard = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isVisible && (
      <>
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg p-6 border shadow-2xl bg-slate-800/95 backdrop-blur-md rounded-2xl md:p-8 border-cyan-400/30"
            initial={{ scale: 0.5, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute text-2xl font-bold transition-colors top-3 right-3 text-white/60 hover:text-white"
            >
              ×
            </button>

            <div className="text-center">
              <motion.div
                className="mb-4 text-5xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚂
              </motion.div>
              
              <h3 className="mb-6 text-2xl font-bold text-transparent md:text-3xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                From Tanishq 💙
              </h3>
              
              <div className="space-y-4 text-gray-200">
                <motion.p
                  className="text-lg leading-relaxed md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hey Buddy! 🌟
                </motion.p>
                
                <motion.p
                  className="text-base leading-relaxed text-gray-300 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Wishing you a super safe and amazing journey! May the mountains be beautiful, the chai be hot, and the vibes be immaculate! ✨🏔️
                </motion.p>
                
                <motion.p
                  className="text-base leading-relaxed text-gray-300 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Take care and have the best time. See you soon with all the stories! 🎒 <br />
                  And haan… say hello to your whole family from my side too — hope everyone’s doing well! 😊🙏
                </motion.p>
              </div>

              <motion.div
                className="pt-4 mt-6 border-t border-cyan-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="font-semibold text-cyan-400">— Your friend, Tanishq 🤘</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

function App() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio('/audio/Ilahi LoFi Mix DJ KEDROCK x SD Style(MumbaiRemix.Com).mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.currentTime = 8;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Handle start click - plays audio and hides overlay
  const handleStart = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.log('Audio play failed');
      }
    }
    setShowStartOverlay(false);
  };

  // Toggle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const title = 'Happy Journey Buddy!';

  // Start overlay - click to begin with music
  if (showStartOverlay) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"
        onClick={handleStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="mb-8 text-8xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚂
          </motion.div>
          <motion.h1
            className="mb-6 text-3xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Happy Journey Buddy!
          </motion.h1>
          <motion.p
            className="mb-8 text-xl md:text-2xl text-amber-300"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🎵 Tap anywhere to start the journey 🎵
          </motion.p>
          <motion.div
            className="text-6xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            👆
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      <TrainScene />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-16 md:pt-24">
        <motion.div
          className="mb-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <SparkleEmoji delay={0.2} />
            <SparkleEmoji delay={0.3} />
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
                style={{
                  textShadow: '0 0 40px rgba(56, 189, 248, 0.5)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2">
            <SparkleEmoji delay={0.4} />
            <SparkleEmoji delay={0.5} />
          </div>
        </motion.div>

        <motion.p
          className="max-w-2xl mb-8 text-xl font-medium text-center md:text-2xl text-amber-300 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          May your journey be filled with beautiful and safe moments! 🏔️✨
        </motion.p>

        <ShowMessageButton onClick={() => setIsCardOpen(true)} />
      </div>

      <FloatingMessageButton onClick={() => setIsMessageOpen(true)} />

      <AudioButton isPlaying={isAudioPlaying} onClick={toggleAudio} />

      <PuzzlePopup
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        onOpenLetter={() => setIsLetterOpen(true)}
      />

      <MessageCard
        isVisible={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      <LetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
    </div>
  );
}

export default App;
