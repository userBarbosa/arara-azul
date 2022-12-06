import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect, VPatternFormat } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { EmployeesService } from '../../shared/services/api/employees/EmployeesService';
import { toast } from 'react-toastify';
import { isValid as isValidCPF } from '@fnando/cpf';
import { typeStringToStringEnUs, removeInvalidCharacters, specialtyStringToNumber, activeStringToBoolean, specialtyNumberToString, activeBooleanToString, typeStringEnUsToStringPtBr, formatDateToDatePicker } from '../../shared/helpers';


interface IFormData {
  name: string;
  email: string;
  type: string;
  phoneNumber: string;
  documentNumber: string;
  medicalLicense: string | undefined;
  specialty: string;
  active: string;
  birthDate: Date;
  observation: string | undefined; 
}

const getFormatedDate = (currentDate: string) => {
  return currentDate.split('/').reverse().join('-');
};

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  type: yup.mixed().oneOf(['administrador', 'recepcionista', 'veterinario']).label('Selecione Uma Opção'),
  phoneNumber: yup.string().required(),
  documentNumber: yup.string().required().test('test-cpf-invalido', 'CPF inválido', (documentNumber) => isValidCPF(documentNumber!)),
  medicalLicense: yup.string().when('type', {
    is: 'veterinario',
    then: yup.string().required()
  }),
  specialty: yup.mixed()
  .oneOf(['', 'gatos', 'cachorros', 'aves', 'peixes', 'roedores', 'repteis', 'selvagens', 'fazenda', 'marinhos'])
  .label('Selecione Uma Opção')
  .when('type', {
    is: 'veterinario',
    then: yup.mixed().oneOf(['gatos', 'cachorros', 'aves', 'peixes', 'roedores', 'repteis', 'selvagens', 'fazenda', 'marinhos']).notOneOf([''], 'Este campo é obrigatório').label('Selecione Uma Opção'),
  }),
  active: yup.mixed().oneOf(['ativo', 'inativo']).label('Selecione Uma Opção'),
  birthDate: yup.date().min(getFormatedDate('01/01/1900')).max(getFormatedDate(new Date().toLocaleDateString())).required(),
  observation: yup.string(),
});

export const EmployeeUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {
    EmployeesService.getById(id!, getTokenCurrentUser())
    .then((result) => {

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
        const data = result.data;
        formRef.current?.setData({
          name: data.name === undefined || data.name === null ? '' : data.name,
          email: data.email === undefined || data.email === null ? '' : data.email,
          phoneNumber: data.phoneNumber === undefined || data.phoneNumber === null ? '' : removeInvalidCharacters(data.phoneNumber),
          documentNumber: data.documentNumber === undefined || data.documentNumber === null ? '' : removeInvalidCharacters(data.documentNumber),
          birthDate: data.birthDate === undefined || data.birthDate === null ? '' : formatDateToDatePicker(data.birthDate),
          type: data.type === undefined || data.type === null ? '' : typeStringEnUsToStringPtBr(data.type),
          specialty: data.specialty === undefined || data.specialty === null ? '' : specialtyNumberToString(data.specialty),
          medicalLicense: data.medicalLicense === undefined || data.medicalLicense === null ? '' : data.medicalLicense,
          active: data.active === undefined || data.active === null ? '' : activeBooleanToString(data.active),
          observation: data.observation === undefined || data.observation === null ? '' : data.observation,
        });
      }
    });
  }, []);

  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        const data = {
          id: id!,
          name: dadosValidados.name,
          email: dadosValidados.email,
          type: typeStringToStringEnUs(dadosValidados.type),
          phoneNumber: removeInvalidCharacters(dadosValidados.phoneNumber),
          documentNumber: removeInvalidCharacters(dadosValidados.documentNumber),
          medicalLicense: dadosValidados.medicalLicense,
          specialty: specialtyStringToNumber(dadosValidados.specialty),
          active: activeStringToBoolean(dadosValidados.active),
          birthDate: dadosValidados.birthDate,
          observation: dadosValidados.observation,
        };

        EmployeesService
          .updateById(id!, data, getTokenCurrentUser())
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
              navigate('/funcionarios');
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
                  disabled={true}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VPatternFormat
                  fullWidth
                  id='telefone'
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
                  id='cpf'
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

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='data-nascimento'
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
                  id='cargo'
                  name='type'
                  label='Cargo'
                  disabled={true}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='administrador'>Administrador</MenuItem>
                  <MenuItem value="recepcionista">Recepcionista</MenuItem>
                  <MenuItem value="veterinario">Veterinário</MenuItem>
                </VSelect>
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='especialidade'
                  name='specialty'
                  label='Especialidade'
                  disabled={true}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='gatos'>Gatos</MenuItem>
                  <MenuItem value='cachorros'>Cachorros</MenuItem>
                  <MenuItem value='aves'>Aves</MenuItem>
                  <MenuItem value='peixes'>Peixes</MenuItem>
                  <MenuItem value='roedores'>Roedores</MenuItem>
                  <MenuItem value='repteis'>Répteis</MenuItem>
                  <MenuItem value='selvagens'>Selvagens</MenuItem>
                  <MenuItem value='fazenda'>Fazenda</MenuItem>
                  <MenuItem value='marinhos'>Marinhos</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='crmv'
                  name='medicalLicense'
                  label='CRMV'
                  disabled={true}
                />
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='active'
                  name='active'
                  label='Status'
                  disabled={true}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="inativo">Inativo</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='observacao'
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