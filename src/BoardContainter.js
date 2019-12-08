import React, { useState } from "react";
import { deepCopy } from "./deepCopy";
import BoardElement from "./BoardElement";
import { createNote } from "./note";
import { createBoard } from "./board";
import "./styles/Layout.css";

const BoardContainer = () => {
  const [notes, setNotes] = useState([]);

  // Note Functions
  /**
   */
  function addNote(index) {
    var workingNotes = deepCopy(notes);
    workingNotes[index].notes.push(createNote("note", "new"));
    setNotes(workingNotes);
  }

  /**
   */
  function editNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes[noteIndex].edit = true;
    setNotes(workingNotes);
  }

  /**
   */
  function saveNoteEdit(event, noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes[noteIndex].content = event.target.value;
    workingNotes[boardIndex].notes[noteIndex].edit = false;
    setNotes(workingNotes);
  }

  /**
   */
  function deleteNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes.splice(noteIndex, 1);
    setNotes(workingNotes);
  }

  /**
   */
  function changeNoteColor(event, noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].notes[noteIndex].color = event.target.value;
    setNotes(workingNotes);
  }

  // Board Functions
  /**
   */
  function addBoard() {
    setNotes([...notes, createBoard("New Board", [])]);
  }

  /**
   */
  function deleteBoard(boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes.splice(boardIndex, 1);
    setNotes(workingNotes);
  }

  /**
   */
  function editBoard(boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].edit = true;
    setNotes(workingNotes);
  }

  /**
   */
  function saveBoardEdit(event, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].title = event.target.value;
    workingNotes[boardIndex].edit = false;
    setNotes(workingNotes);
  }

  /**
   */
  function changeBoardColor(event, boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes[boardIndex].color = event.target.value;
    setNotes(workingNotes);
  }

  // Data Functions
  /**
   */
  function create(text, type) {
    var file = new Blob([text], { type: type });
    return URL.createObjectURL(file);
  }

  /**
   */
  function downloadData() {
    let a = document.createElement("a");
    a.href = create(JSON.stringify(notes), "application/json");
    a.download = "kanban-data.json";
    a.click();
  }

  /**
   */
  function uploadData(e) {
    let file = e.target.files[0];

    if (!file || file.type !== "application/json") {
      window.alert("Invalid file type");
      return;
    } else {
      const reader = new FileReader();
      reader.onload = e => {
        setNotes(JSON.parse(e.target.result));
      };
      reader.readAsText(file);
    }
  }

  /**
   * Click on the file upload button
   */
  function clickImport() {
    let upload = document.getElementById("import-btn");
    upload.click();
  }

  return (
    <div>
      <div className="grid-container margin-bottom-small">
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
              changeBoardColor={changeBoardColor}
            ></BoardElement>
          );
        })}
      </div>
      <button
        className="margin-bottom-small margin-right-small"
        onClick={addBoard}
      >
        New Board
      </button>
      <button
        onClick={clickImport}
        className="margin-bottom-small margin-right-small"
      >
        Import Data
      </button>
      <input
        id="import-btn"
        type="file"
        className="display-none"
        onChange={e => uploadData(e)}
      />
      <button
        onClick={downloadData}
        className="margin-bottom-small margin-right-small"
      >
        Export Data
      </button>
    </div>
  );
};

export default BoardContainer;
