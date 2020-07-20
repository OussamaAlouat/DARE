/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const getPolices = async (config, authorization) => {
  const header = { Authorization: authorization };
  return axios.get(`${config.baseUrl}/policies`, { headers: header });
};

const getClients = async (config, authorization) => {
  const header = { Authorization: authorization };
  return axios.get(`${config.baseUrl}/clients`, { headers: header });
};

const login = async (config) => {
  const payload = {
    client_id: config.user,
    client_secret: config.password,
  };

  return axios.post(`${config.baseUrl}/login`, payload);
};

export { getPolices, getClients, login };
