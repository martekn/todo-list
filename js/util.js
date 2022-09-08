export const updateLocalStorage = function (key, tasks) {
  localStorage.setItem(key, JSON.stringify(tasks));
};
