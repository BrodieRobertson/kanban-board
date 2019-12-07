import React from "react";

const NoteElement = ({
  note,
  noteIndex,
  boardIndex,
  editNote,
  saveNoteEdit,
  deleteNote,
  changeNoteColor
}) => {
  return (
    <React.Fragment>
      <div
        style={{ background: note.color ? note.color : "white" }}
        onClick={() => editNote(noteIndex, boardIndex)}
        onBlur={e => saveNoteEdit(e, noteIndex, boardIndex)}
      >
        {!note.edit ? (
          <React.Fragment>{note.content}</React.Fragment>
        ) : (
          <input placeholder={note.content} />
        )}
      </div>
      <button onClick={() => deleteNote(noteIndex, boardIndex)}>x</button>
      <input
        type="color"
        onChange={e => changeNoteColor(e, noteIndex, boardIndex)}
      />
    </React.Fragment>
  );
};

export default NoteElement;
