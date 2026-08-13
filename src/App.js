import React from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),

    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni",
    }),
    React.createElement(Pizza, {
      name: "Americano Pizza",
      description: "French Fries and hot dogs",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "Ham and pineapple, my favourite :)",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
