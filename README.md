# mariat-bookmarks-app

# Client-side Bookmarking application that utilizes a RESTful Web API on the backend.

---

## User Stories:

- I can add bookmarks to my bookmark list. Bookmark contains:
  - Title
  - Url link
  - Description
  - Rating (1-5).
- I can see my list of bookmarks when I first open the app.
  - All bookmarks in the list default to a "condensed" view showing only title and rating.
- I can click on a bookmark to display a detailed view.
  - Detailed view expands to additionally display description and a "Visit Site" link.
- I can remove bookmarks for my bookmark list.
- I receive appropriate feedback when I cannot submit a bookmark.
  - Check all validations in the API documentation (e.g. title and url field required).
- I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection.

## Technical Requirements:

- Use fetch for AJAX calls and jQuery for DOM manipulation.
  - Use namespacing to adhere to good architecture practices.
  - Create modules in separate files to organize your code.
  - Logically group your functions (e.g. API methods, store methods...).
- Keep your Data out of the DOM.
  - No direct DOM manipulation in your event handlers!
  - Follow the React-ful design pattern - change your state, re-render your component.
- Use semantic HTML.
- Use a responsive and mobile-first design.
  - Visually and functionally solid in viewports for mobile and desktop.
- Follow a11y best practices.

# [Bookmark Live Link](https://thinkful-ei-tiger.github.io/mariat-bookmarks-app/)
