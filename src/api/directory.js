import HTTP from "./index.js";

const http = new HTTP();

const fetchRootContents = () => {
  return http.get('dev');
}

const fetchDirectoryContents = (nodeId) => {
  return http.get(`dev/${nodeId}`);
}

export { fetchRootContents, fetchDirectoryContents};