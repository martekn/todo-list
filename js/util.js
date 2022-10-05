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
 *
 * @param {*} key localStorage key
 * @param {String[]} tasks
 */
export const updateLocalStorage = function (key, tasks) {
  localStorage.setItem(key, JSON.stringify(tasks));
};
