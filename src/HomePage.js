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
      {notes.map((board, boardIndex) => {
        return (
          <div>
            {!board.edit ? (
              <h2 onClick={() => editBoard(boardIndex)}>{board.title}</h2>
            ) : (
              <input
                onBlur={e => saveBoardEdit(e, boardIndex)}
                placeholder={board.title}
              />
            )}
            <ul>
              {board.notes.map((note, noteIndex) => {
                return (
                  <React.Fragment>
                    <li
                      onClick={() => editNote(noteIndex, boardIndex)}
                      onBlur={e => saveNoteEdit(e, noteIndex, boardIndex)}
                    >
                      {!note.edit ? (
                        <React.Fragment>{note.content}</React.Fragment>
                      ) : (
                        <input placeholder={note.content} />
                      )}
                    </li>
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
