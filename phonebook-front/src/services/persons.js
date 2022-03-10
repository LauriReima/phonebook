import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const req = axios.get(baseUrl);
  const res = await req;
  return res.data;
};

const create = async (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  const res = await req;
  return res.data;
};

const deleteP = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, deleteP };
