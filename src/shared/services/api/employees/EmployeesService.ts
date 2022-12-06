import { Api } from '../axios-config';

export interface IListEmployee {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    type?: string | undefined;
    emailConfirmed?: Date | undefined;
    phoneNumber?: string | undefined;
    documentNumber?: string | undefined;
    medicalLicense?: string | undefined;
    specialty?: number | undefined;
    active?: boolean | undefined;
    birthDate?: Date | undefined;
    observation?: string | undefined;
  }
  
export interface IDetailEmployee {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    type?: string | undefined;
    emailConfirmed?: Date | undefined;
    phoneNumber?: string | undefined;
    documentNumber?: string | undefined;
    medicalLicense?: string | undefined;
    specialty?: number | undefined;
    active?: boolean | undefined;
    birthDate?: Date | undefined;
    observation?: string | undefined;
  }

const CREATE_USER = '/users/signup';
const UPDATE_USER = '/users/';
const GET_USER_BY_ID = '/users/';
const GET_ALL_USERS = '/users';

const getAll = async (token: string) => {
  return await Api
    .get(GET_ALL_USERS, {
      headers: {
        'x-api-token': token
    }})
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.message === 'Network Error') {
        return error.message;
      }
      return error.response;
    });
};

const getById = async (id: string, token: string) => {
  return await Api
    .get(`${GET_USER_BY_ID}${id}`, {
      headers: {
        'x-api-token': token
    }})
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.message === 'Network Error') {
        return error.message;
      }
      return error.response;
    });
};

const create = async (dados: Omit<IDetailEmployee, 'id'>, token: string) => {
  return await Api
    .post(CREATE_USER, dados, {
      headers: {
        'x-api-token': token
    }})
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.message === 'Network Error') {
        return error.message;
      }
      return error.response;
    });
};

const updateById = async (id: string, dados: IDetailEmployee, token: string) => {
  return await Api
    .patch(`${UPDATE_USER}${id}`, dados, {
      headers: {
        'x-api-token': token
    }})
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error.message === 'Network Error') {
        return error.message;
      }
      return error.response;
    });
};

export const EmployeesService = { 
  getAll,
  create,
  getById,
  updateById,
};