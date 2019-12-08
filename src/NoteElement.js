import React from "react";
import { selectFontColor } from "./colorUtils";
import "./styles/Layout.css";
import "./styles/NoteElement.css";

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
    <div className="flex-container margin-bottom-small">
      <div
        className="note-text padding-small margin-right-small"
        style={{
          background: note.color ? note.color : "#ffffff",
          color: selectFontColor(note.color)
        }}
        onClick={() => editNote(noteIndex, boardIndex)}
        onBlur={e => saveNoteEdit(e, noteIndex, boardIndex)}
      >
        {!note.edit ? (
          <p>{note.content}</p>
        ) : (
          <textarea>{note.content}</textarea>
        )}
      </div>
      <div className="margin-auto">
        <button onClick={() => deleteNote(noteIndex, boardIndex)}>x</button>
        <input
          type="color"
          onChange={e => changeNoteColor(e, noteIndex, boardIndex)}
          value={note.color}
        />
      </div>
    </div>
  );
};

export default NoteElement;
