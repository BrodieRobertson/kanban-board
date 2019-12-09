import React from "react";
import BoardContainer from "./BoardContainer";

/**
 * The home page for the kanban board
 */
const HomePage = () => {
  return (
    <React.Fragment>
      <h1>Kanban Board</h1>
      <BoardContainer></BoardContainer>
    </React.Fragment>
  );
};

export default HomePage;
