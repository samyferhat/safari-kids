import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BookOpen, Play, ArrowLeft, Volume2 } from 'lucide-react';
import { animals } from './data/animals';
import { AnimalCard } from './components/AnimalCard';

// --- Utilitaires Audio Identiques à la maquette ---
const speak = (text) => {
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'fr-FR';
  msg.rate = 0.8;
  window.speechSynthesis.speak(msg);
};

// --- Vues ---

const HomeView = ({ onNavigate }) => (
  <div className="flex flex-col items-center gap-8 animate-in fade-in duration-500 w-full max-w-2xl">
    <h1 className="text-6xl md:text-8xl font-bold text-green-500 drop-shadow-lg text-center">
      Safari Kids 🦁
    </h1>
    <p className="text-2xl text-gray-600 font-medium">Prêt pour l&apos;aventure ?</p>
    
    <div className="flex flex-col md:flex-row gap-8 w-full px-4">
      <button 
        onClick={() => onNavigate('learn')}
        className="flex-1 bg-blue-400 text-white rounded-[40px] p-8 shadow-[0_12px_0_#3b82f6] hover:translate-y-1 hover:shadow-[0_8px_0_#3b82f6] active:translate-y-3 active:shadow-none transition-all"
      >
        <div className="flex justify-center mb-4">
          <BookOpen size={80} />
        </div>
        <span className="text-4xl font-bold">Apprendre</span>
      </button>
      
      <button 
        onClick={() => onNavigate('play')}
        className="flex-1 bg-orange-400 text-white rounded-[40px] p-8 shadow-[0_12px_0_#f97316] hover:translate-y-1 hover:shadow-[0_8px_0_#f97316] active:translate-y-3 active:shadow-none transition-all"
      >
        <div className="flex justify-center mb-4">
          <Play size={80} />
        </div>
        <span className="text-4xl font-bold">Jouer</span>
      </button>
    </div>
  </div>
);

const LearnView = ({ onBack }) => (
  <div className="w-full h-full flex flex-col overflow-hidden max-w-7xl mx-auto">
    <header className="flex items-center p-4">
      <button onClick={onBack} className="bg-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform">
        <ArrowLeft size={32} className="text-blue-500" />
      </button>
      <h2 className="text-4xl font-bold text-blue-500 ml-6">Mes Amis Animaux</h2>
    </header>
    
    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 overflow-y-auto">
      {animals.map((animal) => (
        <AnimalCard 
          key={animal.id} 
          animal={animal} 
          onClick={() => speak(animal.soundText)}
          className="card-bounce"
        />
      ))}
    </div>
  </div>
);

const GameView = ({ onBack }) => {
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [shakeId, setShakeId] = useState(null);

  const startRound = () => {
    const newTarget = animals[Math.floor(Math.random() * animals.length)];
    let opts = [newTarget];
    
    // Remplir avec d'autres animaux uniques
    while (opts.length < 3) {
      const random = animals[Math.floor(Math.random() * animals.length)];
      if (!opts.find(a => a.id === random.id)) opts.push(random);
    }
    
    // Mélanger
    opts.sort(() => 0.5 - Math.random());
    
    setTarget(newTarget);
    setOptions(opts);
    setTimeout(() => speak(`Où est... ${newTarget.name} ?`), 500);
  };

  useEffect(() => {
    startRound();
  }, []);

  const handleAnswer = (animal) => {
    if (animal.id === target.id) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      speak("Bravo ! C'est gagné !");
      setScore(s => s + 1);
      setTimeout(startRound, 2000);
    } else {
      setShakeId(animal.id);
      speak("Oups ! Réessaie !");
      setTimeout(() => setShakeId(null), 500);
    }
  };

  if (!target) return null;

  return (
    <div className="w-full h-full flex flex-col max-w-5xl mx-auto">
      <header className="flex items-center justify-between p-4">
        <button onClick={onBack} className="bg-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform">
          <ArrowLeft size={32} className="text-orange-500" />
        </button>
        <div className="bg-white px-8 py-3 rounded-full shadow-lg text-3xl font-bold text-orange-500">
          ⭐ <span>{score}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-12 py-8">
        <div className="text-center">
          <p className="text-3xl text-gray-500 mb-2 font-medium">Où se cache...</p>
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-6xl font-bold text-purple-600 uppercase tracking-wide">
              {target.name}
            </h2>
            <button 
              onClick={() => speak(`Où est... ${target.name} ?`)}
              className="bg-yellow-400 p-4 rounded-full shadow-md text-white hover:scale-105 transition-transform"
            >
              <Volume2 size={32} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-4 w-full">
          {options.map((animal) => (
            <div 
              key={animal.id} 
              className={`${shakeId === animal.id ? 'animate-shake' : ''}`}
            >
              <AnimalCard 
                animal={animal} 
                showName={false} 
                size="large"
                className="border-8 border-white transition-all"
                onClick={handleAnswer} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="h-screen w-screen bg-[#f0fdf4] font-sans flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-none">
      {view === 'home' && <HomeView onNavigate={setView} />}
      {view === 'learn' && <LearnView onBack={() => setView('home')} />}
      {view === 'play' && <GameView onBack={() => setView('home')} />}
    </div>
  );
}