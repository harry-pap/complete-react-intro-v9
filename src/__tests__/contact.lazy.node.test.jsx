import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

// `vi` is the name of the spy inside vitest
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("should submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const messageTextAreaInput =
    screen.getByPlaceholderText("Enter your message");

  const testData = {
    name: "Harry",
    email: "some@email.com",
    message: "Great pizzas",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageTextAreaInput.value = testData.message;

  const button = screen.getByRole("button");

  button.click();

  // use polling to get the heading element
  const h3 = await screen.findByRole("heading", { level: 3 });

  expect(h3.innerText).toContain("Submitted successfully!");

  const requests = fetchMocker.requests();
  expect(requests).toHaveLength(1);
  expect(new URL(requests[0].url).pathname).toBe("/api/contact");
  expect(fetchMocker).toHaveBeenCalledExactlyOnceWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
});
