import React, { useState } from "react";
import { deepCopy } from "./deepCopy";
import { createNote } from "./note";
import { createBoard } from "./board";

const HomePage = ({}) => {
  const [notes, setNotes] = useState([]);

  function addNote(index) {
    var workingNotes = deepCopy(notes);
    workingNotes[index].notes.push(createNote("note", "new"));
    setNotes(workingNotes);
  }

  function addBoard() {
    setNotes([...notes, createBoard("New Board", [])]);
  }

  function deleteNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes.splice(noteIndex, 1);
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
            <h2>{board.title}</h2>
            <ul>
              {board.notes.map((note, noteIndex) => {
                return (
                  <React.Fragment>
                    <li>{note.content}</li>
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
