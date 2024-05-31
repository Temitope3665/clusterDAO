import { ICreateDAO, ICreateUser } from '@/libs/types';
import axios, { AxiosResponse } from 'axios';

type FormData = any;

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CLUSTERnpm_URL}/`,
  timeout: 36000,
});

export const uploadFile = (formData: FormData): Promise<AxiosResponse<any>> => {
  return axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_BASEURL || '', formData);
};

export const aePrice = () =>
  client.get('/cryptos/aeternity-price').then((response) => response.data);

// DAO
export const createDaoEP = (payload: ICreateDAO) =>
  client.post('/daos', payload).then((response) => response);

// User
export const createUser = (payload: ICreateUser) =>
  client.post('/users', payload).then((response) => response);

export const updateUser = (payload: ICreateUser, address: string) =>
  client.patch(`/users/${address}`, payload).then((response) => response);

export const updateUserNotification = (payload: ICreateUser, address: string) =>
  client
    .patch(`/users/${address}/notifications`, payload)
    .then((response) => response);

export const getUser = (address: string) =>
  client.get(`/users/${address}`).then((response) => response.data.user);

// Notification
export const getNotifications = (address: string) =>
  client.get(`/notifications/${address}`).then((response) => response.data);

export const markAllNotificationsAsRead = (address: string) =>
  client
    .post(`/notifications/mark-read/${address}`)
    .then((response) => response.data);

export const markSingleNotificationsAsRead = (
  address: string,
  notificationId: string
) =>
  client
    .post(`/notifications/mark-read/${address}/${notificationId}`)
    .then((response) => response.data);

// Proposals
export const getProposals = () =>
  client.get('/proposals').then((response) => response.data);

export const createProposalEP = (payload: any) =>
  client.post('/proposals', payload).then((response) => response.data);

export const updateProposalEP = (daoId: string, id: number, payload: any) =>
  client
    .patch(`/proposals/${daoId}/${id}`, payload)
    .then((response) => response.data);

export const eachProposal = (daoId: string, proposalId: string) =>
  client
    .get(`/proposals/${daoId}/${proposalId}`)
    .then((response) => response.data);

// DAO Dashboard
export const getHistory = (path: string, daoId: string, params?: any) =>
  client
    .get(`/daos/${daoId}/${path}`, {
      params,
    })
    .then((response) => response.data);

// Waiting List
export const joinWaitList = (payload: { email: string }) =>
  client.post('/waitlists', payload).then((response) => response.data);

// Transaction History
export const fetchTransactionHistory = (id: string) =>
  client
    .get(`/daos/${id}/transactions-history`)
    .then((response: any) => response.data);
