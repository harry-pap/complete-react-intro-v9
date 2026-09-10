import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

// snapshot testing works in both workspaces

test("snapshot with empty cart", async () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

test("snapshot with items in cart", async () => {
  const testPizza = {
    id: "hawaiian",
    name: "The great Hawaiian",
    category: "Supreme",
    description: "The great pizza with Pineapple",
    image: "/public/images/hawaiian.webp",
    sizes: { S: 25, M: 30, L: 50 },
  };

  expect(testPizza).toMatchSnapshot();
});
