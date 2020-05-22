// import React from "react";
// import ReactDOM from "react-dom";
// import { act } from "react-dom/test-utils";
// import StopWatch from "../hooks/stop-watch-set-state";

// let container;

// // using test-utils
// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

// describe("Test the stop watch", () => {
//   it("Can render stop watch and render", () => {
//     let mockSetName = jest.fn();
//     act(() => {
//       ReactDOM.render(<StopWatch setName={mockSetName} />, container);
//     });

//     const label = container.querySelector("label");
//     const button = container.querySelector("button");

//     expect(label.textContent).toBe("0ms");
//     expect(button.textContent).toBe("START");

//     // Test second render and effect
//     act(() => {
//       button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     });

//     expect(button.textContent).toBe("STOP");

//     const buttonClear = container.querySelector(".btn-clear");
//     // Click on clear button
//     act(() => {
//       buttonClear.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     });

//     expect(label.textContent).toBe("0ms");
//     expect(button.textContent).toBe("START");
//   });
// });
