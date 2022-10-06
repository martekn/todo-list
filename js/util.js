/**
 * Creates an html element based on the given arguments
 * @param {String} tag
 * @param {String | String[]} className
 * @param {*} nameIdFor uniqueId
 * @param {String} text adds to innerText
 * @param {*} inputType
 * @returns HTMLElement
 */
export const createHtmlElement = function (tag, className, nameIdFor, text, inputType) {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (tag === "label") {
    element.setAttribute("for", nameIdFor);
  }

  if (tag === "input") {
    element.setAttribute("id", nameIdFor);
    element.setAttribute("name", nameIdFor);
    element.setAttribute("type", inputType);
  }

  if (text) {
    element.innerText = text;
  }

  return element;
};

/**
 * Adds array to localStorage under the key specified.
 * @param {*} key
 * @param {*[]} tasks
 */
export const updateLocalStorage = function (key, tasks) {
  localStorage.setItem(key, JSON.stringify(tasks));
};
