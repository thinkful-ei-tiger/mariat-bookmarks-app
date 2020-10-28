import $ from "jquery";
import "./style.css";
import list from "./bookmarks";

const main = () => {
  list.init();
  list.bindEventListeners();
};

$(main);
