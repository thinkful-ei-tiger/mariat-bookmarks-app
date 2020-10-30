import $ from "jquery";
import cuid from "cuid";
import store from "./store";
import api from "./api";

// Error Functions
const generateError = function (message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $(".error-container").html(el);
  } else {
    $(".error-container").empty();
  }
};

const handleCloseError = function () {
  $("main").on("click", "#cancel-error", () => {
    store.setError(null);
    renderError();
  });
};

// RENDER Function <3 you're everywhere
const render = () => {
  if (store.adding) {
    $(".js-mainBM").html(templateAdd());
    // consoleLog to check workflow
    console.log("adding Bookmark");
  } else {
    const htmlStr = templateMain();
    console.log("render main template");
    $(".js-mainBM").html(htmlStr);
  }
  renderError();
};

// Initialization of my PROMISE to get the Bookmarks.
const init = () => {
  api.getBookmark().then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    //console.log(bookmarks);
    render();
  });
};
//
const getID = (bookmark) => {
  return $(bookmark).closest(".jsBMElement").data("bookmark-id");
};

// this function is to generate the stars unicode as strings to use them in the ratings.
const templateStars = (starNum) => {
  let starStr = "";
  for (let i = 0; i < 5; i++) {
    if (i < starNum) {
      // unicode for white star
      starStr += "&#9733";
    } else {
      // unicode for black star
      starStr += "&#9734";
    }
  }
  return starStr;
};

// This is in charge of create the template forEach element that is added to the bookmark app.
const formBMList = () => {
  let itemStr = " ";
  store.bookmarks.forEach(function (bookmark) {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded) {
        itemStr += `<li class = 'jsBMElement' data-bookmark-id = '${
          bookmark.id
        }'><p class="upper-case"> ${bookmark.title} <p>
                <p>Visit Site:👉🏻<a target="_blank" href='${
                  bookmark.url
                }'> Click Here! </a> </p>
                <p> Rating: ${templateStars(bookmark.rating)} </p>
                <label> Description👇🏻</label>
                <div class= "box">
                <p> ${bookmark.desc}</p>
                </div>
                <div class = "deleteBM">
                 <button class = "btnDel" name = "btnDelete" type = "button"> Delete </button>
                </div> 
                </li>
                `;
      } else {
        //  this is the "collapsiable" thing reduce to a single button with Title + Rating.
        itemStr += ` <button class="jsBMElement" data-bookmark-id = '${
          bookmark.id
        }'>
                <span class='stars'>${templateStars(bookmark.rating)}</span>
                ${bookmark.title} </button>`;
      }
    }
  });
  return itemStr;
};

const templateMain = () => `<section class="containerUp">
        <div class="newBM">
          <button class="btnNew" name="btnNew" type="button">
            +New Bookmark
          </button>
        </div>
        <div class="filterBy">
          <select id="js-filter" name="filter">
            <option value="" selected="selected"> Filter By &#9733 </option>
            <option value="1">${templateStars(1)}</option>
            <option value="2">${templateStars(2)}</option>
            <option value="3">${templateStars(3)}</option>
            <option value="4">${templateStars(4)}</option>
            <option value="5">${templateStars(5)}</option>
          </select>
        </div>
      </section> 
      <section role ="tabs" class="bookmarks" aria="true">
      <ul aria-label="Bookmark tabs" class ='js-ulBM'>
       ${formBMList()}
      </ul> 
     </section>
    <div class="error-container">
      <section class="error-content">
       <button id='cancel-error'>X</button>
        <p> </p>
     </section>
    </div>
      `;

const templateAdd = () => {
  return `<form class="addBMForm">
        <fieldset name="formField">
          <label for="urlNB">Bookmark Link:</label>
          <input id = "url" type="text" minlength="5" name="url" placeholder="http://..." required />
          <label for="title">Title: </label>
          <input id= "title" type="text" name="title" placeholder=" Site Title" />
          <label for="desc">Description:</label>
         <textarea id ="desc" type="text" name="desc" minlength="1"
            placeholder="Add a description..." ></textarea>
          <label for="addFilter">Star Rating: </label>
          <select id="js-filter-NB" name="addfilter">
            <option value="" selected="selected">Filter</option>
             <option value="1">${templateStars(1)}</option>
            <option value="2">${templateStars(2)}</option>
            <option value="3">${templateStars(3)}</option>
            <option value="4">${templateStars(4)}</option>
            <option value="5">${templateStars(5)}</option>
          </select>
          <div class='submit-cancel'>
          <button class="btnSubmitNB" type="submit">Submit</button>
          <button class="btnCancel" type="button">Cancel</button>
          </div>
           </section>
           <div class="error-container">
               <section class ="error-content">
                <button id='cancel-error'>X</button>
                <p> </p>
              </section>
           </div>
        </fieldset>
      </form>
          `;
};

// NOW EVENT LISTENERS...
// this one is in charge of Filter the bookmarks depending on the rating.
const handleFilter = () => {
  $(".js-mainBM").on("change", "#js-filter", function () {
    let filter = $(this).val();
    store.setFilter(filter);
    render();
  });
};

// when the add button is clicked....
const handleAdd = () => {
  $(".js-mainBM").on("click", ".btnNew", function () {
    store.adding = true;
    console.log(store.adding);
    render();
  });
};

// You can either submit a new bookmark or go to the next Event Listener
const handleSubmitBookmark = () => {
  $(".js-mainBM").on("submit", ".addBMForm", function (event) {
    event.preventDefault();
    let newBookmark = {
      id: cuid(),
      title: `${$(this).find("#title").val()}`,
      url: `${$(this).find("#url").val()}`,
      desc: `${$(this).find("#desc").val()}`,
      rating: `${$(this).find("#js-filter-NB").val()}`,
    };
    //console.log(newBookmark);
    //Promise when creating a new Bookmark
    api
      .createBookmark(newBookmark)
      .then((newBM) => {
        console.log(newBM);
        store.adding = false;
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

// this listen to the cancel Button in the form and then in the event delegation it comes back to the state #1.
const HandleCancel = () => {
  $(".js-mainBM").on("click", ".btnCancel", function () {
    store.adding = false;
    render();
  });
};

// this event listener is for the element, so when it toggles it expanded and unexpanded the whole element.
const handleExpandClick = () => {
  $(".js-mainBM").on("click", ".jsBMElement", function (event) {
    let id = getID(event.currentTarget);
    store.whenExpanded(id);
    render();
  });
};
// this is to Delete a selected Bookmark.
const handleDelete = () => {
  $(".js-mainBM").on("click", ".btnDel", function (event) {
    event.preventDefault();
    const id = getID(event.currentTarget);
    // PROMISE when a bookmark is deteled
    api
      .deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        console.log(store.bookmarks);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        render();
      });
  });
};

const bindEventListeners = () => {
  handleAdd();
  handleExpandClick();
  handleSubmitBookmark();
  HandleCancel();
  handleDelete();
  handleFilter();
  handleCloseError();
};

// I'm exporting this functions so that in the main() they can be called.
export default {
  bindEventListeners,
  init,
};
