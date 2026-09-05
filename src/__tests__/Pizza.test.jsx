import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

afterEach(cleanup);

// tests arrow functions don't to be async, but it's a good practise to always
// make them async, in case you need to call an async function later
test("alt text renders on Pizza image", async () => {
  const name = "Pineapple pizza";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza name={name} description="Super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("to have default image if none is provided", async () => {
  const screen = render(
    <Pizza name="something" description="Super cool pizza" />,
  );

  const img = screen.getByRole("img");

  expect(img.src).not.toBe("");
});
