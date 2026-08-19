import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { PizzaOfTheDay } from "../PizzaOfTheDay.jsx";
import Header from "../Header.jsx";
import { CartContext } from "../contexts.jsx";

// in this file we store the common code for all routing

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);

    return (
      // we use the diamond to return CartContext and TanStackRouterDevtools
      // under a parent node (wraps both siblings in an array)
      <>
        <CartContext value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext>
        <TanStackRouterDevtools />
      </>
    );
  },
});
