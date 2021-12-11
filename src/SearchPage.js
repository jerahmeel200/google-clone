import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import "./SearchPage.css";
import { useStateValue } from "./StateProvider";
import useGoogleSearch from "./useGoogleSearch";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
function SearchPage() {
  const [{ term = "tesla" }, dispatch] = useStateValue();

  const { data } = useGoogleSearch(term);
  // https://developers.google.com/custom-search/v1/using_rest
  // https://cse.googl.com/cse/create/new
  // d79152ad20ec3859f
  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButton />
          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="all">All</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionIcon />
                <Link to="news">News</Link>
              </div>
              <div className="searchPage__option">
                <ImageIcon />
                <Link to="images">images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOfferIcon />
                <Link to="shopping">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <RoomIcon />
                <Link to="maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to="more">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage__result">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href={item.link} target="_blank">
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                    />
                  )}
                {item.displayLink} ✔
              </a>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                className="searchPage__resultTitle"
                href={item.link}
                target="_blank"
              >
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
