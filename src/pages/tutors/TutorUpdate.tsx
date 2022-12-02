import React, { FocusEvent } from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { TutorsService } from '../../shared/services/api/tutors/TutorsService';
import { toast } from 'react-toastify';

interface IFormData {
  name: string;
  email: string;
  telephoneNumber: string;
  identificationNumber: string;
  zipCode: string;
  state: string | undefined;
  city: string | undefined;
  neighborhood: string | undefined;
  streetName: string | undefined;
  houseNumber: string;
  complement: string | undefined;
  patientsName: string | undefined; 
  observation: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  telephoneNumber: yup.string().required(),
  identificationNumber: yup.string().required(),
  zipCode: yup.string().required(),
  state: yup.string().notRequired(),
  city: yup.string().notRequired(),
  neighborhood: yup.string().notRequired(),
  streetName: yup.string().notRequired(),
  houseNumber: yup.string().required(),
  complement: yup.string().notRequired(),
  patientsName: yup.string().notRequired(),
  observation: yup.string().notRequired(),
});

export const TutorUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      name: 'Kauã Claudino Loureiro',
      email: 'kaua.loureiro@gmail.com',
      telephoneNumber: '(11) 98028-7824',
      identificationNumber: '757.817.228-07',
      zipCode: '06708-710',
      state: 'SP',
      city: 'Cotia',
      neighborhood: 'Jardim Mediterrâneo',
      streetName: 'Rua Nice',
      houseNumber: '110A',
      complement: '',
      patientsName: '',
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        TutorsService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              // alert(result.message);
            } else {
              navigate('/tutores');
              toast.success('Alteração realizada com Sucesso!', {
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
      title='Alterar Tutor'
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
                  name='name'
                  label='Nome'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='email'
                  label='E-mail'
                  disabled={true}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='telephoneNumber'
                  label='Telefone'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='identificationNumber'
                  label='CPF'
                  disabled={true}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  name='zipCode'
                  label='CEP'
                  disabled={isLoading}
                  onBlur={checkCep}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  name='state'
                  label='Estado'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <VTextField
                  fullWidth
                  name='city'
                  label='Cidade'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <VTextField
                  fullWidth
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
                  name='streetName'
                  label='Endereço'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  name='houseNumber'
                  label='Número'
                  disabled={isLoading}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
                <VTextField
                  fullWidth
                  name='complement'
                  label='Complemento'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='patientsName'
                  label='Pacientes'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
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