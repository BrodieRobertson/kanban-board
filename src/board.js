/**
 * Creates a new board object
 */
export function createBoard(title, notes) {
  return { title: title, notes: notes, edit: false, color: "#d3d3d3" };
}
