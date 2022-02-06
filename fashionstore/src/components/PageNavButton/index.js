import React from "react";
import Button from "../../forms/Button";
import "./styles.scss";
const PageNavButton = ({ prev, next, handlePage, page }) => {
  return (
    <div className="navBtn">
      {prev && (
        <Button>
          <span onClick={() => handlePage("prev")}>Previous</span>
        </Button>
      )}
      Page {page}
      {next && (
        <Button>
          <span onClick={() => handlePage("next")}>Next</span>
        </Button>
      )}
    </div>
  );
};

export default PageNavButton;
