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

export { getPolices, getClients };
