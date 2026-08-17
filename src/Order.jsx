import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Order() {
  const [selectedPizzaType, setSelectedPizzaType] = useState("pepperoni");
  const [selectedPizzaSize, setSelectedPizzaSize] = useState("M");
  const [cart, setCart] = useState([]);
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  let price, formattedPrice, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => selectedPizzaType === pizza.id);
    price = selectedPizza.sizes[selectedPizzaSize];
    formattedPrice = intl.format(price);
  }

  // else {
  //   // this wasn't included in the course, I added it
  //   selectedPizza = {
  //     id: "koukou",
  //     name: "koukou",
  //     description: "koukou",
  //   };
  // }

  // this is a side effect function, we don't want it to be called every single time
  // the Order function is called on every single render
  async function fetchPizzaTypes() {
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000);
    // });

    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();

    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  useEffect(
    // the effect should never be a Promise
    () => {
      fetchPizzaTypes();

      // the below is how we would add cleanup after our effects
      // return () => { clearTimeout(timeout); };
    },
    [],
    // [selectedPizzaSize], // here we put what value to check if they are different from the
    // previous render(for example selectedPizzaType), in order to execute again.
    // [] means it's executed only once
  );
  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              {
                pizza: selectedPizza,
                size: selectedPizzaSize,
                price: price,
              },
            ]);
          }}
        >
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={selectedPizzaType}
              onChange={(e) => setSelectedPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizzaType) => (
                <option key={pizzaType.id} value={pizzaType.id}>
                  {pizzaType.name}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={selectedPizzaSize === "S"}
                    onChange={() => setSelectedPizzaSize("S")}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={selectedPizzaSize === "M"}
                    onChange={() => setSelectedPizzaSize("M")}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={selectedPizzaSize === "L"}
                    onChange={() => setSelectedPizzaSize("L")}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{formattedPrice}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? <p>Loading...</p> : <Cart cart={cart} checkout={() => {}} />}
    </div>
  );
}
