/**
 * Creates a new note object
 */
export function createNote(type, content) {
  return { type: type, content: content, edit: false, color: "#ffffff" };
}
