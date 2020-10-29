const BASE_URL = "https://thinkful-list-api.herokuapp.com/mariat";

const listApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get("content-type").includes("json")) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

// CRUD HERE -> shouln't be CGUD? -°°-
// GET method to review the DATA
function getBookmark() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

// POST METHOD to make an action to backEnd and retrieve data.
const createBookmark = (bookmark) => {
  const newBookmark = JSON.stringify(bookmark);
  return listApiFetch(BASE_URL + "/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newBookmark,
  });
};
const updateBookmark = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: newData,
  });
};

const deleteBookmark = (id) => {
  return listApiFetch(BASE_URL + "/bookmarks/" + id, {
    method: "DELETE",
  });
};

export default {
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
