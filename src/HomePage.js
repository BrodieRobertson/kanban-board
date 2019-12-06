import React, { useState } from "react";
import { deepCopy } from "./deepCopy";

const HomePage = ({}) => {
  const [notes, setNotes] = useState([["hi"], ["yo"]]);

  function addNote(index) {
    var workingNotes = deepCopy(notes);
    workingNotes[index].push("new");
    setNotes(workingNotes);
  }

  function addBoard() {
    setNotes([...notes, []]);
  }

  return (
    <div>
      {notes.map((book, index) => {
        return (
          <div>
            <ul>
              {book.map(note => {
                return <li>{note}</li>;
              })}
            </ul>
            <button onClick={() => addNote(index)}>New Note</button>
          </div>
        );
      })}
      <button onClick={addBoard}>New Board</button>
    </div>
  );
};

export default HomePage;
