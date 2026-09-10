import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "hawaiian",
  name: "The great Hawaiian",
  category: "Supreme",
  description: "The great pizza with Pineapple",
  image: "/public/images/hawaiian.webp",
  sizes: { S: 25, M: 30, L: 50 },
};

test("returns null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  // render the hook in a component that gets discarded and return the result
  const { result } = renderHook(usePizzaOfTheDay);
  expect(result.current).toBeNull();
});

test("calls the API and returns the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(usePizzaOfTheDay);
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toHaveBeenCalledExactlyOnceWith("/api/pizza-of-the-day");
});
