import React, { useState, useRef, useCallback } from "react";
import { produce } from "immer";

/* Ben Awad - youtube channel */
const numRows = 25;
const numCols = 25;
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () =>
  Array.from({ length: numRows }).map(() =>
    Array.from({ length: numCols }).fill(0)
  );

const GameOfLife = () => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: numRows }).map(() =>
      Array.from({ length: numCols }).fill(0)
    )
  );

  //   const rows = [];
  //   for (let i = 0; i < numRows; i++) {
  //     rows.push(Array.from(Array(numCols), () => 0));
  //   }
  //   return rows;

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const onBtnClick = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const onGridClick = (rowIndex, colIndex) => {
    // Immer produces immutable data with mutated state
    const newGrid = produce(grid, gridCopy => {
      gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    });

    setGrid(newGrid);
  };

  const getRandomColour = useCallback(
    () => "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    []
  );

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;

            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 500);
  }, []);

  const onRandomBtnClick = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }

    setGrid(rows);
  };

  const onClearBtnClick = () => {
    setGrid(generateEmptyGrid());
    setRunning(false);
    runningRef.current = false;
  };

  return (
    <div style={{ margin: "0 auto", width: "70%" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2>Game Of Life</h2>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          Game of Life - Rules
        </a>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-start" onClick={onBtnClick}>
          {running ? "Stop" : "Start"}
        </button>
        <button className="btn btn-random" onClick={onRandomBtnClick}>
          Random
        </button>
        <button className="btn btn-clear" onClick={onClearBtnClick}>
          Clear
        </button>
      </div>
      <div style={{ margin: "0 auto", width: "50%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 25px)`,
            marginTop: "10px"
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => onGridClick(i, k)}
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: grid[i][k] ? getRandomColour() : undefined,
                  border: "solid 1px black"
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
