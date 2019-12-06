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

  function deleteNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].splice(noteIndex, 1);
    setNotes(workingNotes);
  }

  function deleteBoard(boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes.splice(boardIndex, 1);
    setNotes(workingNotes);
  }

  return (
    <div>
      {notes.map((board, boardIndex) => {
        return (
          <div>
            <ul>
              {board.map((note, noteIndex) => {
                return (
                  <React.Fragment>
                    <li>{note}</li>
                    <button onClick={() => deleteNote(noteIndex, boardIndex)}>
                      x
                    </button>
                  </React.Fragment>
                );
              })}
            </ul>
            <button onClick={() => addNote(boardIndex)}>New Note</button>
            <button onClick={() => deleteBoard(boardIndex)}>x</button>
          </div>
        );
      })}
      <button onClick={addBoard}>New Board</button>
    </div>
  );
};

export default HomePage;
