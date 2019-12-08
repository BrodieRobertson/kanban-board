import React from "react";
import NoteElement from "./NoteElement";
import "./styles/BoardElement.css";
import "./styles/Layout.css";
import { selectFontColor } from "./colorUtils";

const BoardElement = ({
  board,
  boardIndex,
  addNote,
  deleteNote,
  editNote,
  saveNoteEdit,
  editBoard,
  saveBoardEdit,
  deleteBoard,
  changeNoteColor,
  changeBoardColor
}) => {
  function askBeforeDelete() {
    if (window.confirm("Would you like to delete this board?")) {
      deleteBoard(boardIndex);
    }
  }
  return (
    <div
      className="padding-small"
      style={{
        background: board.color ? board.color : "#d3d3d3",
        color: selectFontColor(board.color)
      }}
    >
      {!board.edit ? (
        <h2 onClick={() => editBoard(boardIndex)}>{board.title}</h2>
      ) : (
        <input
          onBlur={e => saveBoardEdit(e, boardIndex)}
          className="margin-bottom-small"
          value={board.title}
        />
      )}
      <div>
        {board.notes.map((note, noteIndex) => {
          return (
            <React.Fragment>
              <NoteElement
                note={note}
                noteIndex={noteIndex}
                boardIndex={boardIndex}
                editNote={editNote}
                saveNoteEdit={saveNoteEdit}
                deleteNote={deleteNote}
                changeNoteColor={changeNoteColor}
              ></NoteElement>
            </React.Fragment>
          );
        })}
      </div>
      <button onClick={() => addNote(boardIndex)}>New Note</button>
      <input
        type="color"
        className="margin-left-small"
        onChange={e => changeBoardColor(e, boardIndex)}
        value={board.color}
      />
      <button className="margin-left-small" onClick={askBeforeDelete}>
        x
      </button>
    </div>
  );
};

export default BoardElement;
