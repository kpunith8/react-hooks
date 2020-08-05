import React, { useReducer } from "react";

const generateGrid = (rows, cols, mapper) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill().map(mapper));

const flatGrid = (arr) => arr.reduce((acc, arr) => [...acc, ...arr], []);

const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));

const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  turn: "X",
  status: "inProgress",
});

const NEXT_TURN = {
  O: "X",
  X: "O",
};

const checkThree = (a, b, c) => {
  if (!a || !b || !c) return false;

  return a === b && b === c;
};

const checkForWin = (flatGrid) => {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid;

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  );
};

const checkForDraw = (flatGrid) =>
  !checkForWin(flatGrid) && flatGrid.filter(Boolean).length === flatGrid.length;

const reducer = (state, action) => {
  // Don't allow the click on a grid if anyone wins
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }

  switch (action.type) {
    case "CLICK": {
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }

      const newState = cloneDeep(state);
      newState.grid[y][x] = turn;
      // check for win here
      const flatenGrid = flatGrid(newState.grid);

      if (checkForWin(flatenGrid)) {
        newState.status = "success";
        return newState;
      }

      if (checkForDraw(flatenGrid)) {
        return getInitialState();
      }

      newState.turn = NEXT_TURN[turn];

      return newState;
    }
    case "RESET": {
      return getInitialState();
    }
    default:
      return state;
  }
};

const Grid = ({ grid, handleClick }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          backgroundColor: "#444",
          display: "grid",
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((col, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              value={col}
              onClick={() => handleClick(colIdx, rowIdx)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Cell = ({ value, onClick }) => {
  return (
    <div style={{ backgroundColor: "#fff", width: 80, height: 80 }}>
      <button
        type="button"
        style={{ width: "100%", height: "100%" }}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

const TicTacToeGame = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const { grid, turn, status } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const handleReset = () => dispatch({ type: "RESET" });

  return (
    <div style={{ display: "inline-block" }}>
      <h2>Tic Tac Toe</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div>Next turn: {turn}</div>
        <div>{status === "success" && `${turn} Won!`} </div>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  );
};

export default TicTacToeGame;
