import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListTutor {
    id: number;
    name: string;
    email: string;
    telephoneNumber: string;
    identificationNumber: string;
    address: string;
    patientsName: string; 
    observation: string | undefined;
  }
  
export interface IDetailTutor {
    id: number;
    name: string;
    email: string;
    telephoneNumber: string;
    identificationNumber: string;
    address: string;
    patientsName: string; 
    observation: string | undefined;
  }
  
type TTutorsWithTotalCount = {
    data: IListTutor[];
    totalCount: number;
}

const getAll = async (page = 1, filter = '', id = ''): Promise<TTutorsWithTotalCount | Error> => {
  try {
    const relative_url  = `/tutor?_page=${page}&_limit=${Environment.ROW_LIMIT}&name_like=${filter}&id_like=${id}`;
    
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

const getById = async (id: number): Promise<IDetailTutor | Error> => {
  try {
    const { data } = await Api.get(`/tutor/${id}`);
  
    if (data) {
      return data;
    }
  
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (details: Omit<IDetailTutor, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailTutor>('/tutor', details);
  
    if (data) {
      return data.id;
    }
  
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, details: IDetailTutor): Promise<void | Error> => {
  try {
    await Api.put(`/tutor/${id}`, details);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

export const TutorsService = { 
  getAll,
  create,
  getById,
  updateById,
};
