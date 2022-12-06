import { Api } from '../axios-config';

export interface IListAppointment {
  id: string;
  patientId?: string;
  ownerId?: string;
  employeeId?: string;
  appointmentState?: number;
  observation?: string;
  paymentMethod?: number;
  reason: number;
  value?: number;
  date?: Date;
}
  
export interface IDetailAppointment {
  id: string;
  patientId?: string;
  ownerId?: string;
  employeeId?: string;
  appointmentState?: number;
  observation?: string;
  paymentMethod?: number;
  reason: number;
  value?: number;
  date?: Date;
}
  
const CREATE_APPOINTMENT = '/appointments/new';
const UPDATE_APPOINTMENT_BY_ID = '/appointments/';
const GET_APPOINTMENT_BY_ID = '/appointments/';
const GET_ALL_APPOINTMENTS = '/appointments/all';

const getAll = async (token: string) => {
  return await Api
    .get(GET_ALL_APPOINTMENTS, {
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
    .get(`${GET_APPOINTMENT_BY_ID}${id}`, {
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

const create = async (dados: Omit<IDetailAppointment, 'id'>, token: string) => {
  return await Api
    .post(CREATE_APPOINTMENT, dados, {
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

const updateById = async (id: string, dados: IDetailAppointment, token: string) => {
  return await Api
    .put(`${UPDATE_APPOINTMENT_BY_ID}${id}`, dados, {
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

export const AppointmentsService = { 
  getAll,
  create,
  getById,
  updateById,
};
