import React, { useState } from "react";
import { deepCopy } from "./deepCopy";
import BoardElement from "./BoardElement";
import { createNote } from "./note";
import { createBoard } from "./board";
import "./styles/Layout.css";

/**
 * Container element for holding the boards
 */
const BoardContainer = () => {
  const [notes, setNotes] = useState([
    {
      title: "1",
      notes: [
        {
          type: "note",
          content: "more different data",
          edit: false,
          color: "#ffffff"
        },
        { type: "note", content: "data", edit: false, color: "#ffffff" }
      ],
      edit: false,
      color: "#d3d3d3"
    },
    {
      title: "2",
      notes: [
        { type: "note", content: "1", edit: false, color: "#ffffff" },
        { type: "note", content: "2", edit: false, color: "#ffffff" },
        { type: "note", content: "3", edit: false, color: "#ffffff" }
      ],
      edit: false,
      color: "#d3d3d3"
    }
  ]);

  /**
   * Checks that a board index is valid
   */
  function checkValidBoardIndex(boardIndex) {
    return boardIndex < notes.length;
  }

  /**
   * Checks that a note index is within the boards
   */
  function checkValidNoteIndex(noteIndex, boardIndex) {
    return (
      boardIndex < notes.length && noteIndex < notes[boardIndex].notes.length
    );
  }

  // Note Functions
  /**
   * Adds a new note into one of the boards of notes specified by the index
   */
  function addNote(index) {
    var workingNotes = deepCopy(notes);
    if (checkValidBoardIndex(index)) {
      workingNotes[index].notes.push(createNote("note", "new"));
    }
    setNotes(workingNotes);
  }

  /**
   * Switches the specified note into edit mode
   */
  function editNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      workingNotes[boardIndex].notes[noteIndex].edit = true;
    }
    setNotes(workingNotes);
  }

  /**
   * Saves the edits made to the content of a specified note
   */
  function saveNoteEdit(event, noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (!checkValidNoteIndex(noteIndex, boardIndex)) {
      return;
    }

    // Use the content of the changed note or the placeholder text if
    // no text is available
    if (event.target.value === "") {
      workingNotes[boardIndex].notes[noteIndex].content =
        event.target.placeholder;
    } else {
      workingNotes[boardIndex].notes[noteIndex].content = event.target.value;
    }
    workingNotes[boardIndex].notes[noteIndex].edit = false;
    setNotes(workingNotes);
  }

  /**
   * Deletes specified note from the boards of notes
   */
  function deleteNote(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      workingNotes[boardIndex].notes.splice(noteIndex, 1);
    }
    setNotes(workingNotes);
  }

  /**
   * Changes the background color of a specified note
   */
  function changeNoteColor(event, noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      workingNotes[boardIndex].notes[noteIndex].color = event.target.value;
    }
    setNotes(workingNotes);
  }

  /**
   * Moves a note up a position within the same board, or wraps to bottom if
   * already at the top
   */
  function moveNoteUp(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      let newIndex =
        noteIndex - 1 >= 0
          ? noteIndex - 1
          : workingNotes[boardIndex].notes.length - 1;
      let note = workingNotes[boardIndex].notes.splice(noteIndex, 1)[0];
      workingNotes[boardIndex].notes.splice(newIndex, 0, note);
    }
    setNotes(workingNotes);
  }

  /**
   * Moves a note down a position within the same board, or wraps to the top if
   * already at the bottom
   */
  function moveNoteDown(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      let newIndex =
        noteIndex + 1 < workingNotes[boardIndex].notes.length
          ? noteIndex + 1
          : 0;
      let note = workingNotes[boardIndex].notes.splice(noteIndex, 1)[0];
      workingNotes[boardIndex].notes.splice(newIndex, 0, note);
    }
    setNotes(workingNotes);
  }

  /**
   * Moves a note to the board to the left of the board it's in, or wraps
   * around to the right if already in the left most board
   */
  function moveNoteLeft(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      let newIndex =
        boardIndex - 1 >= 0 ? boardIndex - 1 : workingNotes.length - 1;
      let note = workingNotes[boardIndex].notes.splice(noteIndex, 1)[0];
      workingNotes[newIndex].notes.push(note);
    }
    setNotes(workingNotes);
  }

  /**
   * Moves a note to the board to the right of the board it's in, or wraps
   * around to the left if already in the right most board
   */
  function moveNoteRight(noteIndex, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidNoteIndex(noteIndex, boardIndex)) {
      let newIndex = boardIndex + 1 < workingNotes.length ? boardIndex + 1 : 0;
      let note = workingNotes[boardIndex].notes.splice(noteIndex, 1)[0];
      workingNotes[newIndex].notes.push(note);
    }
    setNotes(workingNotes);
  }

  // Board Functions
  /**
   * Adds a new board into the list of boards
   */
  function addBoard() {
    setNotes([...notes, createBoard("New Board", [])]);
  }

  /**
   * Deletes a specified board from the list of boards
   */
  function deleteBoard(boardIndex) {
    var workingNotes = deepCopy(notes);
    workingNotes.splice(boardIndex, 1);
    setNotes(workingNotes);
  }

  /**
   * Switches a specified board into edit mode
   */
  function editBoard(boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidBoardIndex(boardIndex)) {
      workingNotes[boardIndex].edit = true;
    }
    setNotes(workingNotes);
  }

  /**
   * Saves edits made to the specified board, or sets the text to the
   * placeholder if no text is provided
   */
  function saveBoardEdit(event, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (!checkValidBoardIndex(boardIndex)) {
      return;
    }

    // Use the content of the changed board or the placeholder text if
    // no text is available
    if (event.target.value === "") {
      workingNotes[boardIndex].title = event.target.placeholder;
    } else {
      workingNotes[boardIndex].title = event.target.value;
    }

    workingNotes[boardIndex].edit = false;
    setNotes(workingNotes);
  }

  /**
   * Change the background color of the specified board
   */
  function changeBoardColor(event, boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidBoardIndex(boardIndex)) {
      workingNotes[boardIndex].color = event.target.value;
    }
    setNotes(workingNotes);
  }

  /**
   * Moves a board to the left or wraps around around to the right
   * if already in the left most position
   */
  function moveBoardLeft(boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidBoardIndex(boardIndex)) {
      let newIndex =
        boardIndex - 1 >= 0 ? boardIndex - 1 : workingNotes.length - 1;
      let note = workingNotes.splice(boardIndex, 1)[0];
      workingNotes.splice(newIndex, 0, note);
    }
    setNotes(workingNotes);
  }

  /**
   * Moves a board to the right or wraps around to the left if
   * already in the right most position
   */
  function moveBoardRight(boardIndex) {
    var workingNotes = deepCopy(notes);

    if (checkValidBoardIndex(boardIndex)) {
      let newIndex = boardIndex + 1 < workingNotes.length ? boardIndex + 1 : 0;
      let note = workingNotes.splice(boardIndex, 1)[0];
      workingNotes.splice(newIndex, 0, note);
    }
    setNotes(workingNotes);
  }

  // Data Functions
  /**
   * Creates a new file blob and returns a url to it
   */
  function create(text, type) {
    var file = new Blob([text], { type: type });
    return URL.createObjectURL(file);
  }

  /**
   * Prompts the user to download the board data
   */
  function downloadData() {
    let a = document.createElement("a");
    a.href = create(JSON.stringify(notes), "application/json");
    a.download = "kanban-data.json";
    a.click();
  }

  /**
   * If the file type is JSON it will be parsed and stored on the page.
   */
  function uploadData(e) {
    let file = e.target.files[0];

    // Only accept JSON files
    if (!file || file.type !== "application/json") {
      window.alert("Invalid file type");
      return;
    } else {
      // Parse the data and set the value of notes to it
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
              moveNoteUp={moveNoteUp}
              moveNoteDown={moveNoteDown}
              moveNoteLeft={moveNoteLeft}
              moveNoteRight={moveNoteRight}
              moveBoardRight={moveBoardRight}
              moveBoardLeft={moveBoardLeft}
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
