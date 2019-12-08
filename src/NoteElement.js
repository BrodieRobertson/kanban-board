import React from "react";
import { hexToRgb, brightness } from "./colorUtils";
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
  /**
   * Selects a colour for the note font based on the brightness of the
   * background colour
   */
  function selectFontColor(background) {
    if (background) {
      let rgb = hexToRgb(background);
      let brightnessLevel = brightness(rgb[0], rgb[1], rgb[2]);
      if (brightnessLevel > 128) {
        return "black";
      } else {
        return "white";
      }
    } else {
      return "black";
    }
  }

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
