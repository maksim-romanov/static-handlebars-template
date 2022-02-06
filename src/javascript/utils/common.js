// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
const generateUUID = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};

// https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page
const getURLQueryParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return params;
};

const addURLQueryParam = (key, value) => {
  const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + `?${key}=${value}`;
  window.history.pushState({ path: newurl }, '', newurl);
};

const localStore = {
  saveValue: (key, value) => {
    if (typeof value === 'object') {
      window.localStorage.setItem(key, JSON.stringify(value));
      return
    }

    window.localStorage.setItem(key, value);
  },
  getValue: (key) => {
    const value = window.localStorage.getItem(key);

    return JSON.parse(value);
  }
}

export { generateUUID, getURLQueryParams, addURLQueryParam, localStore };