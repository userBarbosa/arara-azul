import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListAppointment {
    id: number;
  }
  
export interface IDetailAppointment {
    id: number;
  }
  
type TAppointmentsWithTotalCount = {
    data: IListAppointment[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TAppointmentsWithTotalCount | Error> => {
  try {
    const relative_url  = `/appointments?_page=${page}&_limit=${Environment.ROW_LIMIT}&name_like=${filter}`;
    
    const { data, headers } = await Api.get(relative_url);
    
    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROW_LIMIT),
      };
    }
    
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetailAppointment | Error> => {
  try {
    const { data } = await Api.get(`/appointments/${id}`);
  
    if (data) {
      return data;
    }
  
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (details: Omit<IDetailAppointment, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailAppointment>('/appointments', details);
  
    if (data) {
      return data.id;
    }
  
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, details: IDetailAppointment): Promise<void | Error> => {
  try {
    await Api.put(`/appointments/${id}`, details);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

export const AppointmentsService = { 
  getAll,
  create,
  getById,
  updateById,
};
