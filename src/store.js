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

// this function will determine the status of the expanded to FALSE.
// this is the toggle function
const whenExpanded = (id) => {
  let bookmark = findById(id);
  bookmark.expanded = !bookmark.expanded;
};

const findAndDelete = () => {
  bookmarks = bookmarks.filter((currentItem) => currentItem.id !== id);
};

const configFilter = (num) => {
  filter = num;
};

const configError = (message) => {
  error = message;
};

const getError = () => {
  return error;
};

const cleanError = () => {
  error = null;
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
  configFilter,
  configError,
  getError,
  cleanError,
};
