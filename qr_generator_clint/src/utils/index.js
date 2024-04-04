export * from './constants';
export const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Can not store in local storage');
  }
  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key, value) => {
  if (!key) {
    return console.error('can get the value from local storage');
  }
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('can get the value from local storage');
  }

  localStorage.removeItem(key);
};

