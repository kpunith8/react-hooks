import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "../use-counter-custom-hook";

// Using @testing-library/react-hooks library
test("should use counter", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe("function");
});

test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
    result.current.increment();
  });

  expect(result.current.count).toBe(2);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(3);
});

test("should display initialValue and increment if passed", () => {
  const { result } = renderHook(() => useCounter(300));

  expect(result.current.count).toBe(300);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(301);
});

test("should reset counter to updated initial value", () => {
  let initialValue = 0;
  const { result, rerender } = renderHook(() => useCounter(initialValue));

  initialValue = 10;
  rerender();

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});
