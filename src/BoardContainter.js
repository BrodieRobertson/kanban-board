import React, { useState } from "react";
import { deepCopy } from "./deepCopy";
import BoardElement from "./BoardElement";
import { createNote } from "./note";
import { createBoard } from "./board";
import "./styles/Layout.css";

const BoardContainer = () => {
  const [notes, setNotes] = useState([]);

  // Note Functions
  function addNote(index) {
    var workingNotes = deepCopy(notes);
    workingNotes[index].notes.push(createNote("note", "new"));
    setNotes(workingNotes);
  }

  function editNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes[noteIndex].edit = true;
    setNotes(workingNotes);
  }

  function saveNoteEdit(event, noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes[noteIndex].content = event.target.value;
    workingNotes[boardIndex].notes[noteIndex].edit = false;
    setNotes(workingNotes);
  }

  function deleteNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes.splice(noteIndex, 1);
    setNotes(workingNotes);
  }

  function changeNoteColor(event, noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes[noteIndex].color = event.target.value;
    setNotes(workingNotes);
  }

  // Board Functions
  function addBoard() {
    setNotes([...notes, createBoard("New Board", [])]);
  }

  function deleteBoard(boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes.splice(boardIndex, 1);
    setNotes(workingNotes);
  }

  function editBoard(boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].edit = true;
    setNotes(workingNotes);
  }

  function saveBoardEdit(event, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].title = event.target.value;
    workingNotes[boardIndex].edit = false;
    setNotes(workingNotes);
  }

  return (
    <div>
      <div className="grid-container">
        {notes.map((board, boardIndex) => {
          return (
            <BoardElement
              board={board}
              boardIndex={boardIndex}
              addNote={addNote}
              deleteNote={deleteNote}
              editNote={editNote}
              editBoard={editBoard}
              saveNoteEdit={saveNoteEdit}
              saveBoardEdit={saveBoardEdit}
              deleteBoard={deleteBoard}
              changeNoteColor={changeNoteColor}
            ></BoardElement>
          );
        })}
      </div>
      <button
        className="margin-top-small margin-bottom-small"
        onClick={addBoard}
      >
        New Board
      </button>
    </div>
  );
};

export default BoardContainer;
