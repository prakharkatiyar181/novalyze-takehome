import React from "react";
import AppRouter from "./routes/Router";
import NeuralBackground from "./components/NeuralBackground";

const App: React.FC = () => {
  return (
    <div>
      <NeuralBackground />
      <AppRouter />
    </div>
  );
};

export default App;
