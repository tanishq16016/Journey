import { motion } from 'framer-motion';

// Snowflakes component
const Snowflakes = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.x}%`,
            top: -10,
            opacity: flake.opacity,
          }}
          animate={{
            y: [0, 1200],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Stars component for night sky
const Stars = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 40,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

// Beautiful Train SVG Component - Long train!
const TrainSVG = () => (
  <svg viewBox="0 0 700 130" className="w-full h-full">
    {/* Smoke puffs */}
    <g>
      <motion.ellipse 
        cx="75" cy="20" rx="15" ry="12" 
        fill="rgba(255,255,255,0.7)"
        animate={{ cy: [20, 5], opacity: [0.7, 0], scale: [1, 1.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.ellipse 
        cx="60" cy="15" rx="12" ry="10" 
        fill="rgba(255,255,255,0.5)"
        animate={{ cy: [15, -5], opacity: [0.5, 0], scale: [1, 1.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.ellipse 
        cx="50" cy="10" rx="10" ry="8" 
        fill="rgba(255,255,255,0.4)"
        animate={{ cy: [10, -10], opacity: [0.4, 0], scale: [1, 1.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </g>
    
    {/* === ENGINE === */}
    {/* Engine body - Red */}
    <rect x="40" y="50" width="110" height="55" rx="8" fill="#DC2626" />
    <rect x="25" y="65" width="30" height="40" rx="6" fill="#EF4444" />
    
    {/* Chimney */}
    <rect x="70" y="25" width="22" height="30" rx="4" fill="#374151" />
    <rect x="66" y="18" width="30" height="10" rx="3" fill="#4B5563" />
    
    {/* Engine cabin */}
    <rect x="110" y="35" width="50" height="70" rx="6" fill="#1F2937" />
    <rect x="118" y="42" width="35" height="28" rx="4" fill="#7DD3FC" />
    
    {/* Captain with hat in engine cabin */}
    <g>
      {/* Captain's face */}
      <circle cx="135" cy="56" r="8" fill="#FDBF6F" />
      {/* Eyes */}
      <circle cx="132" cy="54" r="1.5" fill="#1F2937" />
      <circle cx="138" cy="54" r="1.5" fill="#1F2937" />
      {/* Smile */}
      <path d="M131 59 Q135 63, 139 59" stroke="#1F2937" strokeWidth="1.5" fill="none" />
      {/* Captain's hat */}
      <rect x="126" y="44" width="18" height="6" rx="1" fill="#1E3A8A" />
      <rect x="123" y="48" width="24" height="3" rx="1" fill="#1E40AF" />
      {/* Hat badge */}
      <circle cx="135" cy="47" r="2" fill="#FCD34D" />
      {/* Waving hand */}
      <motion.g
        animate={{ rotate: [0, 20, 0, -10, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ originX: '145px', originY: '65px' }}
      >
        <ellipse cx="148" cy="58" rx="4" ry="3" fill="#FDBF6F" />
      </motion.g>
    </g>
    
    {/* Headlight */}
    <circle cx="28" cy="82" r="10" fill="#FEF08A">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="0.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="28" cy="82" r="6" fill="#FBBF24" />
    
    {/* Engine details */}
    <rect x="45" y="58" width="60" height="8" rx="2" fill="#991B1B" />
    <circle cx="60" cy="75" r="6" fill="#FCA5A5" />
    <circle cx="85" cy="75" r="6" fill="#FCA5A5" />
    
    {/* Connector to car 1 */}
    <rect x="155" y="85" width="25" height="12" rx="3" fill="#6B7280" />
    
    {/* === CAR 1 - Blue Passenger === */}
    <rect x="180" y="50" width="100" height="55" rx="6" fill="#2563EB" />
    <rect x="190" y="58" width="28" height="22" rx="3" fill="#BFDBFE" />
    <rect x="228" y="58" width="28" height="22" rx="3" fill="#BFDBFE" />
    <rect x="185" y="90" width="90" height="10" rx="2" fill="#1E40AF" />
    <rect x="266" y="58" width="8" height="35" rx="2" fill="#1D4ED8" />
    
    {/* Person 1 in Car 1 - Window 1 */}
    <g>
      <circle cx="204" cy="66" r="6" fill="#FDBF6F" />
      <circle cx="201" cy="64" r="1.2" fill="#1F2937" />
      <circle cx="207" cy="64" r="1.2" fill="#1F2937" />
      <path d="M200 69 Q204 72, 208 69" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="212" cy="62"
        rx="3" ry="2.5"
        fill="#FDBF6F"
        animate={{ rotate: [0, 25, 0, -15, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
      />
    </g>
    
    {/* Person 2 in Car 1 - Window 2 */}
    <g>
      <circle cx="242" cy="66" r="6" fill="#D4A574" />
      <circle cx="239" cy="64" r="1.2" fill="#1F2937" />
      <circle cx="245" cy="64" r="1.2" fill="#1F2937" />
      <path d="M238 69 Q242 72, 246 69" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="250" cy="62"
        rx="3" ry="2.5"
        fill="#D4A574"
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.3 }}
      />
    </g>
    
    {/* Connector */}
    <rect x="280" y="85" width="20" height="12" rx="3" fill="#6B7280" />
    
    {/* === CAR 2 - Green Passenger === */}
    <rect x="300" y="50" width="100" height="55" rx="6" fill="#059669" />
    <rect x="310" y="58" width="28" height="22" rx="3" fill="#A7F3D0" />
    <rect x="348" y="58" width="28" height="22" rx="3" fill="#A7F3D0" />
    <rect x="305" y="90" width="90" height="10" rx="2" fill="#047857" />
    <rect x="386" y="58" width="8" height="35" rx="2" fill="#059669" />
    
    {/* Person 3 in Car 2 - Window 1 */}
    <g>
      <circle cx="324" cy="66" r="6" fill="#8D5524" />
      <circle cx="321" cy="64" r="1.2" fill="#1F2937" />
      <circle cx="327" cy="64" r="1.2" fill="#1F2937" />
      <path d="M320 69 Q324 72, 328 69" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="332" cy="62"
        rx="3" ry="2.5"
        fill="#8D5524"
        animate={{ rotate: [0, 30, 0, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
      />
    </g>
    
    {/* Person 4 in Car 2 - Window 2 */}
    <g>
      <circle cx="362" cy="66" r="6" fill="#FDBF6F" />
      <circle cx="359" cy="64" r="1.2" fill="#1F2937" />
      <circle cx="365" cy="64" r="1.2" fill="#1F2937" />
      <path d="M358 69 Q362 72, 366 69" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="370" cy="62"
        rx="3" ry="2.5"
        fill="#FDBF6F"
        animate={{ rotate: [0, -25, 0, 15, 0] }}
        transition={{ duration: 0.65, repeat: Infinity, delay: 0.4 }}
      />
    </g>
    
    {/* Connector */}
    <rect x="400" y="85" width="20" height="12" rx="3" fill="#6B7280" />
    
    {/* === CAR 3 - Orange Passenger === */}
    <rect x="420" y="50" width="100" height="55" rx="6" fill="#EA580C" />
    <rect x="430" y="58" width="28" height="22" rx="3" fill="#FED7AA" />
    <rect x="468" y="58" width="28" height="22" rx="3" fill="#FED7AA" />
    <rect x="425" y="90" width="90" height="10" rx="2" fill="#C2410C" />
    <rect x="506" y="58" width="8" height="35" rx="2" fill="#EA580C" />
    
    {/* Person 5 in Car 3 - Window 1 */}
    <g>
      <circle cx="444" cy="66" r="6" fill="#FDBF6F" />
      <circle cx="441" cy="64" r="1.2" fill="#1F2937" />
      <circle cx="447" cy="64" r="1.2" fill="#1F2937" />
      <path d="M440 69 Q444 72, 448 69" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="452" cy="62"
        rx="3" ry="2.5"
        fill="#FDBF6F"
        animate={{ rotate: [0, 20, 0, -20, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
      />
    </g>
    
    {/* Person 6 in Car 3 - Window 2 */}
    <g>
      <circle cx="482" cy="66" r="6" fill="#8D5524" />
      <circle cx="479" cy="64" r="1.2" fill="#1F2937" />
      <circle cx="485" cy="64" r="1.2" fill="#1F2937" />
      <path d="M478 69 Q482 72, 486 69" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="490" cy="62"
        rx="3" ry="2.5"
        fill="#8D5524"
        animate={{ rotate: [0, -30, 0, 10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
      />
    </g>
    
    {/* Connector */}
    <rect x="520" y="85" width="20" height="12" rx="3" fill="#6B7280" />
    
    {/* === CABOOSE - Dark Red === */}
    <rect x="540" y="45" width="85" height="60" rx="6" fill="#9F1239" />
    <rect x="550" y="52" width="25" height="20" rx="3" fill="#FDA4AF" />
    <rect x="585" y="52" width="25" height="20" rx="3" fill="#FDA4AF" />
    <rect x="575" y="28" width="30" height="22" rx="5" fill="#881337" />
    <rect x="545" y="92" width="75" height="8" rx="2" fill="#831843" />
    
    {/* Person 7 in Caboose - Window 1 */}
    <g>
      <circle cx="562" cy="60" r="6" fill="#FDBF6F" />
      <circle cx="559" cy="58" r="1.2" fill="#1F2937" />
      <circle cx="565" cy="58" r="1.2" fill="#1F2937" />
      <path d="M558 63 Q562 66, 566 63" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="570" cy="56"
        rx="3" ry="2.5"
        fill="#FDBF6F"
        animate={{ rotate: [0, 25, 0, -15, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, delay: 0.5 }}
      />
    </g>
    
    {/* Person 8 in Caboose - Window 2 */}
    <g>
      <circle cx="597" cy="60" r="6" fill="#8D5524" />
      <circle cx="594" cy="58" r="1.2" fill="#1F2937" />
      <circle cx="600" cy="58" r="1.2" fill="#1F2937" />
      <path d="M593 63 Q597 66, 601 63" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      {/* Waving hand */}
      <motion.ellipse
        cx="605" cy="56"
        rx="3" ry="2.5"
        fill="#8D5524"
        animate={{ rotate: [0, -20, 0, 25, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
      />
    </g>
    
    {/* Red lantern on caboose */}
    <circle cx="620" cy="75" r="6" fill="#EF4444">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
    </circle>
    
    {/* === WHEELS === */}
    {/* Engine wheels */}
    <g>
      <circle cx="65" cy="112" r="15" fill="#1F2937" />
      <circle cx="65" cy="112" r="7" fill="#9CA3AF" />
      <circle cx="115" cy="112" r="15" fill="#1F2937" />
      <circle cx="115" cy="112" r="7" fill="#9CA3AF" />
    </g>
    
    {/* Car 1 wheels */}
    <g>
      <circle cx="210" cy="112" r="13" fill="#1F2937" />
      <circle cx="210" cy="112" r="5" fill="#9CA3AF" />
      <circle cx="260" cy="112" r="13" fill="#1F2937" />
      <circle cx="260" cy="112" r="5" fill="#9CA3AF" />
    </g>
    
    {/* Car 2 wheels */}
    <g>
      <circle cx="330" cy="112" r="13" fill="#1F2937" />
      <circle cx="330" cy="112" r="5" fill="#9CA3AF" />
      <circle cx="380" cy="112" r="13" fill="#1F2937" />
      <circle cx="380" cy="112" r="5" fill="#9CA3AF" />
    </g>
    
    {/* Car 3 wheels */}
    <g>
      <circle cx="450" cy="112" r="13" fill="#1F2937" />
      <circle cx="450" cy="112" r="5" fill="#9CA3AF" />
      <circle cx="500" cy="112" r="13" fill="#1F2937" />
      <circle cx="500" cy="112" r="5" fill="#9CA3AF" />
    </g>
    
    {/* Caboose wheels */}
    <g>
      <circle cx="565" cy="112" r="13" fill="#1F2937" />
      <circle cx="565" cy="112" r="5" fill="#9CA3AF" />
      <circle cx="610" cy="112" r="13" fill="#1F2937" />
      <circle cx="610" cy="112" r="5" fill="#9CA3AF" />
    </g>
  </svg>
);

// Beautiful Snowy Mountains SVG
const SnowyMountains = () => (
  <div className="absolute bottom-0 left-0 right-0 h-[60vh]">
    {/* Far mountains - bluish/dark */}
    <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 450" preserveAspectRatio="none">
      <defs>
        <linearGradient id="farMountain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="40%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <path
        d="M0,450 L0,320 L120,180 L240,280 L360,120 L480,220 L600,60 L720,180 L840,80 L960,200 L1080,100 L1200,180 L1320,140 L1440,200 L1440,450 Z"
        fill="url(#farMountain)"
      />
      {/* Snow caps - far */}
      <path d="M360,120 L310,200 L410,200 Z" fill="#F8FAFC" />
      <path d="M600,60 L530,160 L670,160 Z" fill="#FFFFFF" />
      <path d="M840,80 L770,180 L910,180 Z" fill="#F8FAFC" />
      <path d="M1080,100 L1010,200 L1150,200 Z" fill="#FFFFFF" />
    </svg>
    
    {/* Mid mountains */}
    <svg className="absolute bottom-0 w-full h-[50vh]" viewBox="0 0 1440 400" preserveAspectRatio="none">
      <defs>
        <linearGradient id="midMountain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="35%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <path
        d="M0,400 L0,280 L100,180 L200,250 L350,100 L500,200 L650,70 L800,180 L950,90 L1100,170 L1250,110 L1350,180 L1440,150 L1440,400 Z"
        fill="url(#midMountain)"
      />
      {/* Snow caps - mid */}
      <path d="M350,100 L280,200 L420,200 Z" fill="#FFFFFF" />
      <path d="M650,70 L560,190 L740,190 Z" fill="#FFFFFF" />
      <path d="M950,90 L860,200 L1040,200 Z" fill="#F8FAFC" />
      <path d="M1250,110 L1180,200 L1320,200 Z" fill="#FFFFFF" />
    </svg>
    
    {/* Front mountains - brightest/closest with more snow */}
    <svg className="absolute bottom-0 w-full h-[38vh]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <defs>
        <linearGradient id="frontMountain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#F1F5F9" />
          <stop offset="60%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <path
        d="M0,320 L0,220 L80,150 L180,200 L300,90 L420,170 L550,60 L680,150 L820,70 L960,160 L1100,80 L1220,150 L1340,100 L1440,160 L1440,320 Z"
        fill="url(#frontMountain)"
      />
      {/* Snow caps - front (larger) */}
      <path d="M300,90 L220,180 L380,180 Z" fill="#FFFFFF" />
      <path d="M550,60 L450,175 L650,175 Z" fill="#FFFFFF" />
      <path d="M820,70 L720,180 L920,180 Z" fill="#FFFFFF" />
      <path d="M1100,80 L1000,185 L1200,185 Z" fill="#FFFFFF" />
      <path d="M1340,100 L1270,180 L1410,180 Z" fill="#FFFFFF" />
      
      {/* Extra snow details */}
      <path d="M550,60 L500,120 L550,100 L600,120 Z" fill="#FFFFFF" />
      <path d="M820,70 L770,130 L820,110 L870,130 Z" fill="#FFFFFF" />
    </svg>
  </div>
);

const TrainScene = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Night Sky Gradient - Deep blue/purple tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900" />
      
      {/* Stars */}
      <Stars />
      
      {/* Moon with glow */}
      <motion.div
        className="absolute top-8 right-12 md:top-12 md:right-20"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div 
          className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative"
          style={{
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.5), 0 0 100px rgba(200, 210, 255, 0.3)',
          }}
        >
          {/* Moon craters */}
          <div className="absolute top-3 left-5 w-4 h-4 rounded-full bg-gray-300/50" />
          <div className="absolute top-10 right-4 w-5 h-5 rounded-full bg-gray-300/40" />
          <div className="absolute bottom-5 left-7 w-3 h-3 rounded-full bg-gray-300/30" />
        </div>
      </motion.div>
      
      {/* Snowflakes */}
      <Snowflakes />
      
      {/* Snowy Mountains */}
      <SnowyMountains />
      
      {/* Snowy ground */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-200 via-gray-100 to-white" />
      
      {/* Snow sparkle on ground */}
      <div className="absolute bottom-28 left-0 right-0 h-2 bg-white/60 blur-sm" />
      
      {/* Train Track with wooden sleepers */}
      <div className="absolute bottom-24 left-0 right-0 h-4 bg-stone-600">
        <div className="absolute inset-0 flex items-center">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="w-6 h-3 bg-amber-800 mx-2" />
          ))}
        </div>
      </div>
      
      {/* Rails */}
      <div className="absolute bottom-[100px] left-0 right-0 h-1 bg-gray-400" />
      <div className="absolute bottom-[92px] left-0 right-0 h-1 bg-gray-400" />

      {/* Animated Train - Moving RIGHT to LEFT (engine leading) */}
      <motion.div
        className="absolute bottom-24 h-32 md:h-36"
        style={{ width: '700px', right: '-700px', transform: 'scaleX(-1)' }}
        animate={{ x: [0, -2500] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <TrainSVG />
      </motion.div>
    </div>
  );
};

export default TrainScene;
