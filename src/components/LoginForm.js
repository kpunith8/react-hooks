import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Toggle } from "./Toggle";

// Form to demostragte the enter key behavior if the button type is
// not mentioned
const LoginForm = () => {
  const [values, handleChange] = useForm({ name: "", email: "" });
  const [showToggle, setShowToggle] = useState(true);

  // not mentioning second param to useEffect causes it
  // to re-render whenever form updated(on input change for every char)
  // That can be avoided by adding dependeny inside the array,
  // specifying empty array makes it load only on initial mount
  // useEffect(() => {
  //   console.log("Form rendered");
  // }, []);

  // Multiple useEffect can be added to the component, they run in an order
  // useEffect(() => {
  //   console.log("Another useEffect executed in order");
  // }, []);

  // mousemove event listener, cleanup in useEffect()
  // useEffect(() => {
  //   const onMouseMove = e => {
  //     console.log(e.clientX, e.clientY, e.screenX, e.screenY, e.pageX, e.pageY);
  //   };

  //   window.addEventListener("mousemove", onMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", onMouseMove);
  //   };
  // }, []);

  const onFormSubmit = event => {
    event.preventDefault();

    console.log(`Name: ${values.name}, E-mail: ${values.email}`);
  };

  const onCancelClick = event => {
    event.preventDefault();
  };

  /*
    Cancel button triggers on Enter key by default, when button type is not mentioned for buttons inside a form.
    First button in the form gets trigerred on Enter, if the type="button"
    is not mentioned for any other button than the actual submit button
    Only one button in the form should have type="submit", other buttons if
    any should have the type other than the type 'submit'`);
  */

  return (
    <div>
      <div className="login-form">
        <form onSubmit={onFormSubmit}>
          <label htmlFor="name">Name:</label>
          <br />

          <input
            style={{
              height: "30px",
              marginBottom: "20px ",
              width: "80%",
              fontSize: "16px"
            }}
            type="text"
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <br />
          <label htmlFor="email">E-mail</label>
          <br />

          <input
            style={{
              height: "30px",
              width: "80%",
              fontSize: "16px"
            }}
            type="email"
            value={values.email}
            onChange={handleChange}
            name="email"
          />

          <br />
          <button
            style={{ marginTop: "20px", padding: "10px", width: "40%" }}
            onClick={onCancelClick}
            type="button"
          >
            Cancel
          </button>

          <button
            style={{ padding: "10px", marginLeft: "10px", width: "40%" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="use-effect-cleanup">
        <button
          style={{ padding: "10px", marginTop: "10px", width: "40%" }}
          onClick={() => setShowToggle(!showToggle)}
        >
          Toggle
        </button>
        <br />
        {showToggle && <Toggle />}
      </div>
    </div>
  );
};

export default LoginForm;
