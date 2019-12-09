import React from "react";
import NoteElement from "./NoteElement";
import { selectFontColor } from "./colorUtils";
import "./styles/BoardElement.css";
import "./styles/Layout.css";
import "./styles/Border.css";

/**
 * A board component to display the notes
 */
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
  changeBoardColor,
  moveNoteLeft,
  moveNoteRight,
  moveNoteDown,
  moveNoteUp,
  moveBoardLeft,
  moveBoardRight
}) => {
  /**
   * Prompts the user before deleting a board
   */
  function askBeforeDelete() {
    if (window.confirm("Would you like to delete this board?")) {
      deleteBoard(boardIndex);
    }
  }
  return (
    <div
      className="padding-small border-curved-small"
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
          placeholder="Title"
          defaultValue={board.title}
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
                moveNoteUp={moveNoteUp}
                moveNoteDown={moveNoteDown}
                moveNoteRight={moveNoteRight}
                moveNoteLeft={moveNoteLeft}
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
      <button
        className="margin-left-small"
        onClick={() => moveBoardLeft(boardIndex)}
      >
        <span role="img" aria-label="left arrow" aria-labelledby="">
          ⬅️
        </span>
      </button>
      <button
        className="margin-left-small"
        onClick={() => moveBoardRight(boardIndex)}
      >
        <span role="img" aria-label="right arrow" aria-labelledby="">
          ➡️
        </span>
      </button>
    </div>
  );
};

export default BoardElement;
