import $ from "jquery";
import cuid from "cuid";
import store from "./store";
import api from "./api";
import "./style.css";

const templateError = () => {
  return `<div id='the-x' class ='x-modal' aria-modal = 'true'>
    <div class = 'X-content'>
    <span class = 'close'> X </span>
    <p> ${error}/p>
    </div>
    </div>`;
};

const closeX = () => {
  $("main").on("click", "span", function () {
    console.log("the X was onClick");
    $(".x-modal").css("display", "none");
  });
};

const renderError = () => {
  if (store.error) {
    let error = store.error;
    $(".x-modal").html(templateError(error));
    $(".x-modal").css("display", "block");
  } else {
    $(".error-content").empty();
  }
};

const render = () => {
  renderError();
  if (store.adding) {
    $(".js-mainBM").html(templateAdd());
    console.log("adding Bookmark");
  } else {
    const htmlStr = templateMain();
    console.log("render main template");
    $(".js-mainBM").html(htmlStr);
  }
};
// INITIALIZE PROMISE
const init = () => {
  api.getBookmark().then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    // console loggin to see if it is working.
    console.log(bookmarks);
    render();
  });
};

const getID = (bookmark) => {
  return $(bookmark).closest(".jsBMElement").data("bookmark-id");
};

// NOW FUNCTIONS TO HANDLE THE event LISTENERS
const handleAdd = () => {
  $(".js-mainBM").on("click", ".btnNew", function () {
    store.adding = true;
    console.log(store.adding);
    render();
  });
};

const handleCancelAdd = () => {
  $(".js-mainBM").on("click", ".btnCancelNB", function () {
    store.adding = false;
    render();
  });
};

const handleExpCancel = () => {
  $(".js-mainBM").on("click", ".btnCol", function (event) {
    let id;
    id = getID(event.currentTarget);
    store.whenExpanded(id);
    render();
  });
};

const handleExpandClick = () => {
  $(".js-mainBM").on("click", ".jsBMElement", function (event) {
    let id;
    id = getID(event.currentTarget);
    store.whenExpanded(id);
    render();
  });
};

const handleSubmitBookmark = () => {
  $(".js-mainBM").on("submit", ".addBMForm", function (event) {
    event.preventDefault();
    let newBookmark = {
      id: cuid(),
      title: `${$(this).find("#titleNB").val()}`,
      url: `${$(this).find("#urlNB").val()}`,
      desc: `${$(this).find("#descriptionNB").val()}`,
      rating: `${$(this).find("#js-filter-NB").val()}`,
    };
    console.log(newBookmark);
    api
      .createBookmark(newBookmark)
      .then((newBM) => {
        console.log(newBM);
        store.adding = false;
        render();
      })
      .catch((err) => {
        store.configError(err.message);
        renderError();
      });
  });
};

// function to cancel the page and render the bookmark #1 state.
const onCancel = () => {
  $(".js-mainBM").on("click", ".btnCancelNB", function () {
    store.adding = false;
    render();
  });
};

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
      // using catch without TRY lol as we use in the shopping-list app
      .catch((error) => {
        store.configError(error.message);
        render();
      });
  });
};

const handleFilter = () => {
  $(".js-mainBM").on("change", "#js-filter", function () {
    let filter = $(this).val();
    store.configFilter(filter);
    render();
  });
};

const handleEmptyErrBtn = () => {
  $(".js-mainBM").on("click", "#cancelError", function () {
    store.cleanError();
    render();
  });
};

// this function is to generate the stars unicode style
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
// template HTMLS as single Strings.
const formBMList = () => {
  let itemStr = " ";
  store.bookmarks.forEach(function (bookmark) {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded) {
        itemStr += `<li class = 'jsBMElement' data-bookmark-id = '${
          bookmark.id
        }'>${bookmark.title}
                <p> Visit Site: <a target"_blank" hrfe = ${
                  bookmark.url
                } </a> </p>
                <p> Rating: ${templateStars(bookmark.rating)} </p>
                <p> ${bookmark.desc}</p>
                <div class = "deleteBM">
                 <button class = "btnDel" name = "btnDelete" type = "button"> Delete </button>
                 <button class = "btnCol" name ="btnCollapse" type = "button"> Collapse </button>
                </div> 
                </li>
                `;
      } else {
        // this part is to create the title and the rating "collapsiable" so qhen the user click it can see more details about the bookmark" if not keep it collapse.
        itemStr += ` <button class="jsBMElement" data-bookmark-id = '${
          bookmark.id
        }'>
                <span class = 'stars'>${templateStars(bookmark.rating)}</span>
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
      <section role ="tabs" class="bookmarks" aria ="true">
      <ul role = 'tabL' aria-label='Bookmark tabs' class ='js-ulBM'>
       ${formBMList()}
      </ul> 
     </section>
     <div class='error-content' aria-modal = 'true'>
                  <div id = 'the-x' class = 'x-modal'>
                     <div class = 'X-content'>
                        <span class = 'close'> X </span>
                        <p> </p>
                     </div>
                  </div>
                </div>
      `;

const templateAdd = () => {
  return `<form class="addBMForm">
        <fieldset name="formField">
          <label for="urlNB">Add a new Bookmark:</label>
          <input id = "urlNB" type="text" name="url" placeholder="http://..." required />
          <label for="titleNB">Title: </label>
          <input type="text" name="title" placeholder=" Site Title" />
          <label for="descriptionNB">Description:</label>
          <input id = 
            type="text"
            name="desc"
            placeholder="Add a description..."
          />
          <label for="addFilter">Star Rating: </label>
          <select id="js-filter-NB" name="addfilter">
            <option value="" selected="selected">Filter</option>
             <option value="1">${templateStars(1)}</option>
            <option value="2">${templateStars(2)}</option>
            <option value="3">${templateStars(3)}</option>
            <option value="4">${templateStars(4)}</option>
            <option value="5">${templateStars(5)}</option>
          </select>
          <div class = 'Xdiv'>
          <button class="btnSubmitNB" type="submit">Submit</button>
          <button class="btnCancelNB" type="button">Cancel</button>
          </div>
          <div class = 'error-content' aria-modal = 'true'>
                  <div id = 'the-x' class = 'x-modal'>
                     <div class = 'X-content'>
                        <span class = 'close'> X </span>
                        <p> </p>
                     </div>
                  </div>
                </div>
          </fieldset>
          </form>
          `;
};

const bindEventListeners = () => {
  handleAdd();
  handleExpandClick();
  handleSubmitBookmark();
  onCancel();
  handleDelete();
  handleFilter();
  handleEmptyErrBtn;
  handleCancelAdd();
  closeX();
};

export default {
  bindEventListeners,
  init,
  render,
};
