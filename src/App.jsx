import { createRoot } from "react-dom/client";
import Pizza from "./Pizza.jsx";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order now</h1>
      <Pizza
        name="Pepperoni"
        description="pep, cheese n shit"
        image={"/public/pizzas/pepperoni.webp"}
      />
      <Pizza
        name="Hawaian"
        description="Pineapple, my favourite"
        image={"/public/pizzas/hawaiian.webp"}
      />
      <Pizza
        name="Pepperoni"
        description="French Fries n shit"
        image={"/public/pizzas/pepperoni.webp"}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
