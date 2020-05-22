import React, { useState } from "react";

const RefExample = ({ focusRef }) => {
  const [name, setName] = useState("");

  const onInputChange = event => {
    setName(event.target.value);
  };

  const onButtonClick = event => {
    event.preventDefault();
    focusRef.current.focus();
  };

  return (
    <>
      <input type="text" ref={focusRef} value={name} onChange={onInputChange} />
      <button onClick={onButtonClick}>Input Focus</button>
    </>
  );
};

export default RefExample;
