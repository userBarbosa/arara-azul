import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { EmployeesService } from '../../shared/services/api/employees/EmployeesService';


interface IFormData {
  name: string;
  email: string;
  telephoneNumber: string;
  identificationNumber: string;
  birthDate: string; 
  type: string;
  active: string;
  observation: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  telephoneNumber: yup.string().required().min(3),
  identificationNumber: yup.string().required().min(3),
  birthDate: yup.string().required().min(3),
  type: yup.string().required().min(3),
  active: yup.string().required().min(3),
  observation: yup.string().notRequired(),
});

export const EmployeeUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      name: 'Tatiana Dutra Ferreira',
      email: 'tatiana.ferreira@gmail.com.br',
      telephoneNumber: '(11) 98247-7223',
      identificationNumber: '868.224.618-09',
      birthDate: '1989-10-17',
      type: 'Recepcionista',
      active: 'Ativo',
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        EmployeesService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              // alert(result.message);
            } else {
              navigate('/funcionarios');
            }
          });
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <BaseLayoutPage
      title='Alterar Funcionário'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/funcionarios')}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='birthDate'
                  label='Data de Nascimento'
                  disabled={isLoading}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='type'
                  label='Cargo'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='especialidade'
                  label='Especialidade'
                  disabled={isLoading}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='crmv'
                  label='CRMV'
                  disabled={isLoading}
                />
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='active'
                  label='Status'
                  disabled={isLoading}
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