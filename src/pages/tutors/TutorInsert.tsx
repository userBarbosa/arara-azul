import React, { FocusEvent } from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VPatternFormat } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { TutorsService } from '../../shared/services/api/tutors/TutorsService';
import { toast } from 'react-toastify';
import { isValid as isValidCPF } from '@fnando/cpf';
import { formatStringToArray, removeInvalidCharacters } from '../../shared/helpers';

interface IFormData {
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  observation: string | undefined;
  patientsName: string | undefined; 
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  streetName: string;
  houseNumber: string;
  complement: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  documentNumber: yup.string().required().test('test-cpf-invalido', 'CPF inválido', (documentNumber) => isValidCPF(documentNumber!)),
  phoneNumber: yup.string().required(),
  observation: yup.string().notRequired(),
  patientsName: yup.string().notRequired(),
  zipCode: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  neighborhood: yup.string().required(),
  streetName: yup.string().required(),
  houseNumber: yup.string().required(),
  complement: yup.string().notRequired(),
});

export const TutorInsert: React.FC = () => {
  const { formRef, save } = useVForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      name: '',
      email: '',
      documentNumber: '',
      phoneNumber: '',
      observation: '',
      patientsName: '',
      zipCode: '',
      state: '',
      city: '',
      neighborhood: '',
      streetName: '',
      houseNumber: '',
      complement: '',
    });
  }, []);

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        const data = {
          id: '',
          name: dadosValidados.name,
          email: dadosValidados.email,
          documentNumber: removeInvalidCharacters(dadosValidados.documentNumber),
          phoneNumber: removeInvalidCharacters(dadosValidados.phoneNumber),
          observation: dadosValidados.observation,
          patientsName: formatStringToArray(dadosValidados.patientsName!),
          address: {
            zipCode: removeInvalidCharacters(dadosValidados.zipCode),
            state: dadosValidados.state,
            city: dadosValidados.city,
            neighborhood: dadosValidados.neighborhood,
            streetName: dadosValidados.streetName,
            number: dadosValidados.houseNumber,
            complement: dadosValidados.complement,
          }
        };

        TutorsService
          .create(data, getTokenCurrentUser())
          .then((result) => {
            setIsLoading(false);

            if (result === 'Network Error') {
              navigate('/400');
            } else if (result.status === 400) {
              navigate('/400');
            } else if (result.status === 401) {
              localStorage.removeItem('APP_USER');
              navigate('/401');
            } else if (result.status === 403) {
              navigate('/403');
            } else if (result.status === 404) {
              navigate('/500');
            } else if (result.status === 500) {
              navigate('/500');
            } else if (result.status === 200) {
              navigate('/tutores');
              toast.success('Cadastro realizado com Sucesso!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
            }
          });
      })
      .catch((errors: yup.ValidationError) => {
        toast.error('Informações inválidas, tente novamente!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const checkCep = (event: FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json`;
    
    fetch(url)
      .then(async (response) => await response.json())
      .then(data => {
        formRef.current?.setFieldValue('state', data.uf);
        formRef.current?.setFieldValue('city', data.localidade);
        formRef.current?.setFieldValue('neighborhood', data.bairro);
        formRef.current?.setFieldValue('streetName', data.logradouro);
      })
      .catch(() => {
        toast.error('Digite um CEP válido!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      });
  };

  return (
    <BaseLayoutPage
      title='Novo Tutor'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/tutores')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box 
          margin={2}
          component={Paper} 
          variant="outlined"
        >

          <Grid container padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='nome'
                  name='name'
                  label='Nome'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='email'
                  name='email'
                  label='E-mail'
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VPatternFormat
                  fullWidth
                  id='phoneNumber'
                  name='phoneNumber'
                  label='Telefone'
                  disabled={isLoading}
                  valueIsNumericString 
                  format="(##) #####-####" 
                  mask="_"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VPatternFormat
                  fullWidth
                  id='documentNumber'
                  name='documentNumber'
                  label='CPF'
                  disabled={isLoading}
                  valueIsNumericString 
                  format="###.###.###-##" 
                  mask="_"
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VPatternFormat
                  fullWidth
                  id='zipCode'
                  name='zipCode'
                  label='CEP'
                  disabled={isLoading}
                  onBlur={checkCep}
                  valueIsNumericString
                  format="#####-###" 
                  mask="_"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  id='state'
                  name='state'
                  label='Estado'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <VTextField
                  fullWidth
                  id='city'
                  name='city'
                  label='Cidade'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <VTextField
                  fullWidth
                  id='neighborhood'
                  name='neighborhood'
                  label='Bairro'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

            </Grid>


            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
                <VTextField
                  fullWidth
                  id='streetName'
                  name='streetName'
                  label='Endereço'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  id='houseNumber'
                  name='houseNumber'
                  label='Número'
                  disabled={isLoading}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
                <VTextField
                  fullWidth
                  id='complement'
                  name='complement'
                  label='Complemento'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='patientsName'
                  name='patientsName'
                  label='Pacientes'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='observation'
                  name='observation'
                  label='Observação'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

          </Grid>
        </Box>
      </VForm>
    </BaseLayoutPage>
  );
};