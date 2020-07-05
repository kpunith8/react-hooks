import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FavoriteNumber from "../favorite-number";

test("initial state: display the proper label, text and the error message", () => {
  const { container, getByLabelText } = render(<FavoriteNumber />);

  const input = container.querySelector(".num-input");
  const errMsg = container.querySelector(".err-msg");

  getByLabelText("Favorite Number");
  expect(input.getAttribute("value")).toBe("0");
  expect(errMsg.textContent).toBe("The number is invalid");
});

test("on input change: it should display the proper number", () => {
  const { container } = render(<FavoriteNumber min={10} max={99} />);

  const input = container.querySelector(".num-input");

  fireEvent.change(input, { target: { value: 10 } });

  expect(input.getAttribute("value")).toBe("10");
});

test("on input change: outside the boundary, it should display the error message", () => {
  const { container } = render(<FavoriteNumber min={10} max={99} />);

  const input = container.querySelector(".num-input");
  const errMsg = container.querySelector(".err-msg");

  fireEvent.change(input, { target: { value: 100 } });

  expect(input.getAttribute("value")).toBe("100");
  expect(errMsg.textContent).toBe("The number is invalid");
});
