import $ from "jquery";
import ".index.css";
import list from "/.bookmarks";

const main = () => {
  list.init();
  list.bindEventListeners();
};

$(main);
