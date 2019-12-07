import React from "react";
import NoteElement from "./NoteElement";

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
  changeNoteColor
}) => {
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
      <button onClick={() => deleteBoard(boardIndex)}>x</button>
    </div>
  );
};

export default BoardElement;
