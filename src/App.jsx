import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Games from "./pages/Games";
import ChatAI from "./pages/ChatAI";
import Profile from "./pages/Profile";

// Games
import PopTheBubble from "./games/PopTheBubble";
import BreathingExercise from "./games/BreathingExercise";
import GlowTapping from "./games/GlowTapping";
import SlidePuzzle from "./games/SlidePuzzle";
import ColorMatch from "./games/ColorMatch";
import ZenBlocks from "./games/ZenBlocks";
import MoodPainting from "./games/MoodPainting";
import StressBall from "./games/StressBall";
import LightTherapy from "./games/LightTherapy";
import SandGame from "./games/SandGame";
import CalmPiano from "./games/CalmPiano";
import MandalaCreator from "./games/MandalaCreator";

function App() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/chatAI" element={<ChatAI />} />
      <Route path="/profile" element={<Profile />} />

      {/* Game routes */}
      <Route path="/play/bubble" element={<PopTheBubble />} />
      <Route path="/play/breathing" element={<BreathingExercise />} />
      <Route path="/play/glow" element={<GlowTapping />} />
      <Route path="/play/slidepuzzle" element={<SlidePuzzle />} />
      <Route path="/play/colormatch" element={<ColorMatch />} />
      <Route path="/play/zen" element={<ZenBlocks />} />
      <Route path="/play/moodpainting" element={<MoodPainting />} />
      <Route path="/play/stressball" element={<StressBall />} />
      <Route path="/play/lighttherapy" element={<LightTherapy />} />
      
      {/* Other apps */}
      <Route path="/sand" element={<SandGame />} />
      <Route path="/piano" element={<CalmPiano />} />
      <Route path="/mandala" element={<MandalaCreator />} />
    </Routes>
  );
}

export default App;
