import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const startArchiving = async (roomName: string) => {
  return axios.post(`${API_URL}/session/${roomName}/startArchive`);
};

export const stopArchiving = async (roomName: string, archiveId: string) => {
  return axios.post(`${API_URL}/session/${roomName}/${archiveId}/stopArchive`);
};

export const listArchives = (roomName: string) =>
  axios.get(`${API_URL}/session/${roomName}/archives`);
