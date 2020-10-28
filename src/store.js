const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let expanded = false;

// this function will find if tje current Bookmark has any ID.. if not will add a new ID.
const findById = (id) => {
  return this.bookmarks.find((currentBookmark) => currentBookmark.id === id);
};

// function to add a new bookmark to our empty array
const addBookmark = (bookmark) => {
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
};

// this function will determine the status of the expanded to FALSE.
// this is the toggle function
const whenExpanded = (id) => {
  let bookmark = this.findById(id);
  bookmark.expanded = !bookmark.expanded;
};

const findAndDelete = () => {
  this.bookmarks = this.bookmarks.filter(
    (currentItem) => currentItem.id !== id
  );
};

const configFilter = (num) => {
  this.filter = num;
};

const configError = (message) => {
  this.error = message;
};

const getError = () => {
  return this.error;
};

const cleanError = () => {
  this.error = null;
};

export default {
  addBookmark,
  findById,
  whenExpanded,
  findAndDelete,
  configFilter,
  configError,
  getError,
  cleanError,
};
