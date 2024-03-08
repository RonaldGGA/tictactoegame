import React, { useEffect, useState } from "react";
import "./App.css";

interface idsProps {
  id1: string;
  id2: string;
  id3: string;
  id4: string;
  id5: string;
  id6: string;
  id7: string;
  id8: string;
  id9: string;
}

const App: React.FC = () => {
  const [player, setPlayer] = useState<string>("X");
  const [end, setEnd] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [ids, setIds] = useState<idsProps>({
    id1: "",
    id2: "",
    id3: "",
    id4: "",
    id5: "",
    id6: "",
    id7: "",
    id8: "",
    id9: "",
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { id } = e.currentTarget;
    setIds((prevIds) => ({
      ...prevIds,
      [id]:
        prevIds[id as keyof idsProps] === ""
          ? player
          : prevIds[id as keyof idsProps],
    }));
    setPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  useEffect(() => {
    if (end) {
      document.location.reload();
    }
  }, [end]);

  useEffect(() => {
    const checkWinningCombinations = () => {
      const winningCombos: Array<Array<keyof idsProps>> = [
        ["id1", "id2", "id3"],
        ["id1", "id5", "id9"],
        ["id1", "id4", "id7"],
        ["id2", "id5", "id8"],
        ["id3", "id6", "id9"],
        ["id4", "id5", "id6"],
        ["id7", "id8", "id9"],
        ["id3", "id5", "id7"],
      ];

      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (ids[a] && ids[a] === ids[b] && ids[a] === ids[c]) {
          setWinner(ids[a]);

          setEnd(true);
          return;
        }
      }

      if (Object.values(ids).every((val) => val !== "")) {
        setEnd(true);
      }
    };

    checkWinningCombinations();
  }, [ids]);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <div className="board">
        {["id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9"].map(
          (cellId: string) => (
            <div
              key={cellId}
              className="cell"
              id={cellId}
              onClick={handleClick}>
              {ids[cellId as keyof idsProps]}
            </div>
          )
        )}
      </div>
      <div className="results">
        {end && winner ? <p>Winner is {winner}</p> : null}
        {end && !winner ? <p>It's a draw!</p> : null}
      </div>
    </div>
  );
};

export default App;
