import { Api } from '../axios-config';

export interface IListPatient {
  id: string;
  tutorId?: string;
  name?: string;
  bloodType?: string;
  observation?: string;
  species?: number;
  allergy?: number;
  sex?: number;
  birthDate?: Date;
  onTreatment?: boolean;
  weight?: number;
}
  
export interface IDetailPatient {
  id: string;
  tutorId?: string;
  name?: string;
  bloodType?: string;
  observation?: string;
  species?: number;
  allergy?: number;
  sex?: number;
  birthDate?: Date;
  onTreatment?: boolean;
  weight?: number;
}
  
const CREATE_PATIENT = '/patient/new';
const UPDATE_PATIENT_BY_ID = '/patient/';
const GET_PATIENT_BY_ID = '/patient/';
const GET_ALL_PATIENTS = '/patient/all';

const getAll = async (token: string) => {
  return await Api
    .get(GET_ALL_PATIENTS, {
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
    .get(`${GET_PATIENT_BY_ID}${id}`, {
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

const create = async (dados: Omit<IDetailPatient, 'id'>, token: string) => {
  return await Api
    .post(CREATE_PATIENT, dados, {
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

const updateById = async (id: string, dados: IDetailPatient, token: string) => {
  return await Api
    .put(`${UPDATE_PATIENT_BY_ID}${id}`, dados, {
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

export const PatientsService = { 
  getAll,
  create,
  getById,
  updateById,
};
