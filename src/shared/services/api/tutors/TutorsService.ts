import { Api } from '../axios-config';

export interface IListTutor {
    id: string;
    name?: string;
    email?: string;
    documentNumber?: string;
    phoneNumber?: string;
    observation?: string;
    patientsName?: Array<string>; 
    address?: {
      zipCode?: string;
      state?: string;
      city?: string;
      neighborhood?: string;
      streetName?: string;
      number?: string;
      complement?: string;
    }
}
  
export interface IDetailTutor {
  id: string;
  name?: string;
  email?: string;
  documentNumber?: string;
  phoneNumber?: string;
  observation?: string;
  patientsName?: Array<string>; 
  address?: {
    zipCode?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    streetName?: string;
    number?: string;
    complement?: string;
  }
}

const CREATE_TUTOR = '/tutor/new';
const UPDATE_TUTOR_BY_ID = '/tutor/';
const GET_TUTOR_BY_ID = '/tutor/';
const GET_ALL_TUTORS = '/tutor/all';

const getAll = async (token: string) => {
  return await Api
    .get(GET_ALL_TUTORS, {
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
    .get(`${GET_TUTOR_BY_ID}${id}`, {
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

const create = async (dados: Omit<IDetailTutor, 'id'>, token: string) => {
  return await Api
    .post(CREATE_TUTOR, dados, {
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

const updateById = async (id: string, dados: IDetailTutor, token: string) => {
  return await Api
    .put(`${UPDATE_TUTOR_BY_ID}${id}`, dados, {
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

export const TutorsService = { 
  getAll,
  create,
  getById,
  updateById,
};
