import React from "react";

function FavoriteNumber({ min = 1, max = 9 }) {
  const [number, setNumber] = React.useState(0);
  function handleChange(event) {
    setNumber(Number(event.target.value));
  }
  const isValid = number >= min && number <= max;
  return (
    <div>
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        className="num-input"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : (
        <div className="err-msg">The number is invalid</div>
      )}
    </div>
  );
}

export default FavoriteNumber;
