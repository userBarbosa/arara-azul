import { useEffect, useState } from 'react';
import { Box, Grid, InputAdornment, LinearProgress, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect, VNumericFormat } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { AutoCompleteTutor } from './components/AutocompleteTutor';
import { AppointmentsService } from '../../shared/services/api/appointments/AppointmentsService';
import { AutocompletePatient } from './components/AutocompletePatient';
import { AutocompleteEmployee } from './components/AutocompleteEmployee';
import { toast } from 'react-toastify';
import { appointmentStateNumberToString, appointmentStateStringToNumber, formatDateToDateTimePicker, paymentMethodNumberToString, paymentMethodStringToNumber, reasonNumberToString, reasonStringToNumber } from '../../shared/helpers';

interface IFormData {
  patientId: string;
  ownerId: string;
  employeeId: string;
  appointmentState: string;
  observation: string | undefined;
  paymentMethod: string;
  reason: string;
  value: number;
  date: Date;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  patientId: yup.string().required(),
  ownerId: yup.string().required(),
  employeeId: yup.string().required(),
  appointmentState: yup.mixed().required().oneOf(['rascunho', 'registrada', 'agendada', 'realizada', 'cancelada', 'paga', 'excluida']).label('Selecione Uma Opção'),
  observation: yup.string().notRequired(),
  paymentMethod: yup.mixed().required().oneOf(['cartao-credito', 'cartao-debito', 'dinheiro', 'pix']).label('Selecione Uma Opção'),
  reason: yup.mixed().required().oneOf(['emergencia', 'rotina', 'check-up', 'exame', 'cirurgia']).label('Selecione Uma Opção'),
  value: yup.number().required(),
  date: yup.date().min('1900-01-01T08:00').max(new Date().toLocaleDateString()).required(),
});

export const AppointmentUpdate: React.FC = () => {
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
    AppointmentsService.getById(id!, getTokenCurrentUser())
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
          patientId:  data.patientId === undefined || data.patientId === null ? '' : data.patientId,
          ownerId:  data.ownerId === undefined || data.ownerId === null ? '' : data.ownerId,
          employeeId:   data.employeeId === undefined || data.employeeId === null ? '' : data.employeeId,
          appointmentState:  data.appointmentState === undefined || data.appointmentState === null ? '' : appointmentStateNumberToString(data.appointmentState),
          observation:  data.observation === undefined || data.observation === null ? '' : data.observation,
          paymentMethod:  data.paymentMethod === undefined || data.paymentMethod === null ? '' : paymentMethodNumberToString(data.paymentMethod),
          reason:  data.reason === undefined || data.reason === null ? '' : reasonNumberToString(data.reason),
          value: data.value === undefined || data.value === null ? '' : data.value,
          date: data.birthDate === undefined || data.birthDate === null ? '' : formatDateToDateTimePicker(data.birthDate),
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
          patientId: dadosValidados.patientId,
          ownerId: dadosValidados.ownerId,
          employeeId: dadosValidados.employeeId,
          appointmentState: appointmentStateStringToNumber(dadosValidados.appointmentState),
          observation: dadosValidados.observation,
          paymentMethod: paymentMethodStringToNumber(dadosValidados.paymentMethod),
          reason: reasonStringToNumber(dadosValidados.reason),
          value: dadosValidados.value,
          date: dadosValidados.date,
        };

        AppointmentsService
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
              navigate('/consultas');
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
      title='Alterar Consulta'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/consultas')}
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
                <AutoCompleteTutor isExternalLoading={isLoading}/>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <AutocompletePatient isExternalLoading={isLoading} />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='date'
                  id='date'
                  label='Data e Hora'
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='reason'
                  name='reason'
                  label='Motivo'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value="emergencia">Emergência</MenuItem>
                  <MenuItem value="rotina">Rotina</MenuItem>
                  <MenuItem value="check-up">Check-Up</MenuItem>
                  <MenuItem value="exame">Exame</MenuItem>
                  <MenuItem value="cirurgia">Cirurgia</MenuItem>
                </VSelect>
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <AutocompleteEmployee isExternalLoading={isLoading} />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VNumericFormat
                  fullWidth
                  name='value'
                  label='Valor'
                  id='value'
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  valueIsNumericString
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  thousandsGroupStyle="thousand"
                  allowNegative={false}
                  allowLeadingZeros={true}
                  onValueChange={(values) => {
                    console.log(values);
                  }}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='paymentMethod'
                  label='Pagamento'
                  disabled={isLoading}
                  id='paymentMethod'
                >
                  <MenuItem value=''><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='cartao-credito'>Cartão de Crédito</MenuItem>
                  <MenuItem value='cartao-debito'>Cartão de Débito</MenuItem>
                  <MenuItem value='dinheiro'>Dinheiro</MenuItem>
                  <MenuItem value='pix'>PIX</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='appointmentState'
                  label='Status'
                  disabled={isLoading}
                  id='appointmentState'
                >
                  <MenuItem value=''><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='rascunho'>Rascunho</MenuItem>
                  <MenuItem value='registrada'>Registrada</MenuItem>
                  <MenuItem value='agendada'>Agendada</MenuItem>
                  <MenuItem value='realizada'>Realizada</MenuItem>
                  <MenuItem value='cancelada'>Cancelada</MenuItem>
                  <MenuItem value='paga'>Paga</MenuItem>
                  <MenuItem value='excluida'>Excluída</MenuItem>
                </VSelect>
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <VTextField
                  fullWidth
                  name='observation'
                  label='Observação'
                  disabled={isLoading}
                  id='observation'
                />
              </Grid> 

            </Grid>

          </Grid>
        </Box>
      </VForm>
    </BaseLayoutPage>
  );
};