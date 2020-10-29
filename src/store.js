const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let expanded = false;

// BOOKMARK FUNCTIONS
const addBookmark = (bookmark) => {
  bookmark.expanded = false;
  bookmarks.push(bookmark);
};

const findById = (id) => {
  return bookmarks.find((currentBookmark) => currentBookmark.id === id);
};

const whenExpanded = (id) => {
  let bookmark = findById(id);
  bookmark.expanded = !bookmark.expanded;
};

const findAndDelete = () => {
  bookmarks = bookmarks.filter((currentItem) => currentItem.id !== id);
};

const setFilter = function (num) {
  this.filter = num;
};

const setError = function (message) {
  this.error = message;
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  findById,
  whenExpanded,
  findAndDelete,
  setFilter,
  setError,
};
