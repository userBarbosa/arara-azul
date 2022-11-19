import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListEmployee {
    id: number;
    name: string;
    email: string;
    telephoneNumber: string;
    identificationNumber: string;
    birthDate: string; 
    type: string;
    active: string;
  }
  
export interface IDetailEmployee {
    id: number;
    name: string;
    email: string;
    telephoneNumber: string;
    identificationNumber: string;
    birthDate: string; 
    type: string;
    active: string;
  }
  
type TEmployeesWithTotalCount = {
    data: IListEmployee[];
    totalCount: number;
}

const getAll = async (page = 1, filter = '', id = ''): Promise<TEmployeesWithTotalCount | Error> => {
  try {
    const relative_url  = `/users?_page=${page}&_limit=${Environment.ROW_LIMIT}&name_like=${filter}&id_like=${id}`;
    
    const { data, headers } = await Api.get(relative_url);
    
    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROW_LIMIT),
      };
    }
    
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetailEmployee | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`);
  
    if (data) {
      return data;
    }
  
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (details: Omit<IDetailEmployee, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailEmployee>('/users', details);
  
    if (data) {
      return data.id;
    }
  
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetailEmployee): Promise<void | Error> => {
  try {
    await Api.put(`/users/${id}`, dados);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

export const EmployeesService = { 
  getAll,
  create,
  getById,
  updateById,
};