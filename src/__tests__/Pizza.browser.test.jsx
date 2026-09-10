import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

test("renders alt text on image", async () => {
  const name = "Pineapple pizza";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza name={name} description="Super cool pizza" image={src} />,
  );

  const image = await screen.getByRole("img");

  await expect.element(image).toBeInTheDocument();
  await expect.element(image).toHaveAttribute("src", src);
  await expect.element(image).toHaveAttribute("alt", name);
});
