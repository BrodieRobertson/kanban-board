import React from "react";
import { hexToRgb, brightness } from "./colorUtils";

const NoteElement = ({
  note,
  noteIndex,
  boardIndex,
  editNote,
  saveNoteEdit,
  deleteNote,
  changeNoteColor
}) => {
  function selectFontColor(background) {
    if (background) {
      let rgb = hexToRgb(background);
      let brightnessLevel = brightness(rgb[0], rgb[1], rgb[2]);
      console.log(brightnessLevel);
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
    <React.Fragment>
      <div
        style={{
          background: note.color ? note.color : "#ffffff",
          color: selectFontColor(note.color)
        }}
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
        value={note.color}
      />
    </React.Fragment>
  );
};

export default NoteElement;
