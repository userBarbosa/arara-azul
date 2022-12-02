import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListPatient {
    id: number;
    tutorId: number;
    name: string;
    birthDate: Date; 
    bloodType: string;
    species: string;
    allergy: string;
    sex: string;
    treatment: string;
    observation: string | undefined;
    weight: number;
  }
  
export interface IDetailPatient {
    id: number;
    tutorId: number;
    name: string;
    birthDate: Date; 
    bloodType: string;
    species: string;
    allergy: string;
    sex: string;
    treatment: string;
    observation: string | undefined;
    weight: number;
  }
  
type TPatientsWithTotalCount = {
    data: IListPatient[];
    totalCount: number;
}

const getAll = async (page = 1, filter = '', id = ''): Promise<TPatientsWithTotalCount | Error> => {
  try {
    const relative_url  = `/patient?_page=${page}&_limit=${Environment.ROW_LIMIT}&name_like=${filter}&id_like=${id}`;
    
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

const getById = async (id: number): Promise<IDetailPatient | Error> => {
  try {
    const { data } = await Api.get(`/patient/${id}`);
  
    if (data) {
      return data;
    }
  
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (details: Omit<IDetailPatient, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailPatient>('/patient', details);
  
    if (data) {
      return data.id;
    }
  
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, details: IDetailPatient): Promise<void | Error> => {
  try {
    await Api.put(`/patient/${id}`, details);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

export const PatientsService = { 
  getAll,
  create,
  getById,
  updateById,
};
