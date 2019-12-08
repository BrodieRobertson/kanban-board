import React from "react";
import { selectFontColor } from "./colorUtils";
import "./styles/Layout.css";
import "./styles/Border.css";
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
  function askBeforeDelete() {
    if (window.confirm("Would you like to delete this note?")) {
      deleteNote(noteIndex, boardIndex);
    }
  }
  return (
    <div className="flex-container margin-bottom-small">
      <div
        className="note-text padding-small margin-right-small border-curved-small"
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
          <textarea placeholder="Note" defaultValue={note.content} />
        )}
      </div>
      <div className="margin-auto">
        <button onClick={askBeforeDelete}>x</button>
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
