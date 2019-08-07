import React from "react";
import { fireEvent, render } from "react-testing-library";
import LocalStorageSample from "../hooks-useLocalStorage";

afterEach(() => {
  // clean up local storage so that we have clear localstorage for another test
  window.localStorage.removeItem("count");
});

test("counter increments the count", () => {
  const { container } = render(<LocalStorageSample />);
  const button = container.firstChild;
  expect(button.textContent).toBe("0");
  fireEvent.click(button);
  expect(button.textContent).toBe("1");
});

test("Reads and writes to local storage", () => {
  window.localStorage.setItem("count", "3");

  const { container } = render(<LocalStorageSample />);
  const button = container.firstChild;
  expect(button.textContent).toBe("3");

  fireEvent.click(button);
  expect(window.localStorage.getItem("count")).toBe("4");
  expect(button.textContent).toBe("4");
});
