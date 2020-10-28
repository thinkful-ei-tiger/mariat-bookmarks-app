import { params } from "jquery";

/**
 * listApiFetch - Wrapper function for native `fetch` to standardize error handling.
 * @param {string} url
 * @param {object} options
 * @returns {Promise} - resolve on all 2xx responses with JSON body
 *                    - reject on non-2xx and non-JSON response with
 *                      Object { code: Number, message: String }
 */

const BASE_URL = "https://thinkful-list-api.herokuapp.com/mariat";

const listApiFetch = (...args) => {
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

// CRUD HERE
// GET method to review the DATA
const getBookmark = () => {
  return listApiFetch(`${BASE_URL}/bookmarks`);
};

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

const deleteBookmark = (id) => {
  return listApiFetch(BASE_URL + "/bookmarks/" + id, {
    method: "DELETE",
  });
};

export default {
  listApiFetch,
  getBookmark,
  createBookmark,
  deleteBookmark,
};
