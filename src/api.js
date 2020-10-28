const BASE_URL = "https://thinkful-list-api.herokuapp.com/mariat";

async function listApiFetch(...args) {
  let error;
  const res = await fetch(...args);
  if (!res.ok) {
    error = { code: res.status };
    if (!res.headers.get("content-type").includes("json")) {
      error.message = res.statusText;
      return Promise.reject(error);
    }
  }
  const data = await res.json();
  if (error) {
    error.message = data.message;
    return Promise.reject(error);
  }
  return data;
}

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
  listApiFetch,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
