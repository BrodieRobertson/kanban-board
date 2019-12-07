import React from "react";

const NoteElement = ({
  note,
  noteIndex,
  boardIndex,
  editNote,
  saveNoteEdit,
  deleteNote
}) => {
  return (
    <React.Fragment>
      <div
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
    </React.Fragment>
  );
};

export default NoteElement;
