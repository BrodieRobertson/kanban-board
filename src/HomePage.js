import React from "react";
import BoardContainer from "./BoardContainter";

const HomePage = () => {
  return (
    <React.Fragment>
      <h1>Kanban Board</h1>
      <BoardContainer></BoardContainer>
    </React.Fragment>
  );
};

export default HomePage;
