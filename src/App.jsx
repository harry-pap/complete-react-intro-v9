import { createRoot } from "react-dom/client";
import Order from "./Order";
import { StrictMode } from "react";

const App = () => {
  return (
    // it's good to do that
    <StrictMode>
      <div>
        <h1>Padre Gino's - Order now</h1>
        <Order />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
