import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import { PizzaOfTheDay } from "./PizzaOfTheDay.jsx";
import Header from "./Header";
import { CartContext } from "./contexts.jsx";

const App = () => {
  const cartHook = useState([]);

  return (
    // it's a good practise to use strict mode
    <StrictMode>
      <CartContext value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
