import React from "react";
import ReactDOM from "react-dom";
import { FavoriteNumber } from "../hooks/favorite-number";
import { getQueriesForElement } from "@testing-library/dom";

// Using react-dom
describe("Test favorite number functional component", () => {
  it('Renders a number input with a label "Favorite Number"', () => {
    const container = document.createElement("div");
    ReactDOM.render(<FavoriteNumber />, container);

    //   console.log(container.outerHTML);

    const labelNode = container.querySelector("label");
    const inputNode = container.querySelector("input");

    expect(labelNode.textContent).toBe("Favorite Number");
    expect(inputNode.type).toBe("number");
  });

  // using dom-testing-library @testing-library@dom
  // if someone adds another label on top of existing favorite number
  // Above unit will fail
  it('dom-testing-library - Renders a number input with a label "Favorite Number"', () => {
    const container = document.createElement("div");
    ReactDOM.render(<FavoriteNumber />, container);

    const queries = getQueriesForElement(container);

    expect(queries.getByLabelText(/favorite Number/i).type).toBe("number");
  });
});
