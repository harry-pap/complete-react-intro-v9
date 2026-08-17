import { createRoot } from "react-dom/client";
import Order from "./Order";
import { StrictMode } from "react";
import { PizzaOfTheDay } from "./PizzaOfTheDay.jsx"

const App = () => {
  return (
    // it's good to do that
    <StrictMode>
      <div>
        <h1 className="logo">Padre Gino's - Order now</h1>
        <Order />
        <PizzaOfTheDay/>
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
