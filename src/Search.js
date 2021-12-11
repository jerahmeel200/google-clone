import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Search({ hideButton = false }) {
  const [{}, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    console.log("you hit the serch", input);

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });

    // when you click enter useHistory will push you to the search page
    history.push("/search");
  };
  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <MicIcon />
      </div>

      {!hideButton ? (
        <div className="search__button">
          <Button type="submit" onClick={search} varient="outlined">
            Google Search
          </Button>
          <Button varient="outlined">I'm feeling lucky</Button>
        </div>
      ) : (
        <div className="search__button">
          <Button
            className="search__buttonsHidden"
            type="submit"
            onClick={search}
            varient="outlined"
          >
            Google Search
          </Button>
          <Button className="search__buttonsHidden" varient="outlined">
            I'm feeling lucky
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;
