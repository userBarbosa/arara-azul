import { useEffect, useState } from 'react';
import { Box, Grid, InputAdornment, LinearProgress, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { AutoCompleteTutor } from './components/AutocompleteTutor';
import { AppointmentsService } from '../../shared/services/api/appointments/AppointmentsService';
import { AutocompletePatient } from './components/AutocompletePatient';
import { AutocompleteEmployee } from './components/AutocompleteEmployee';
import { toast } from 'react-toastify';

interface IFormData {
  tutorId: number;
  patientId: number;
  employeeId: number;
  date: string; 
  reason: string;
  value: number;
  appointmentState: string;
  paymentMethod: string;
  observation: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  tutorId: yup.number().required(),
  patientId: yup.number().required(),
  employeeId: yup.number().required(),
  date: yup.string().required(),
  reason: yup.string().required().min(3),
  value: yup.number().required(),
  appointmentState: yup.string().required().min(3),
  paymentMethod: yup.string().required().min(3),
  observation: yup.string().notRequired(),
});

export const AppointmentUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [reason, setReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [appointmentState, setAppointmentState] = useState('');

  const handleChangeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value as string);
  };

  const handleChangePaymentMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value as string);
  };

  const handleChangeAppointmentState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentState(event.target.value as string);
  };

  useEffect(() => {
    formRef.current?.setData({
      tutorId: undefined,
      patientId: undefined,
      employeeId: undefined,
      date: '2022-08-20T15:30',
      reason: setReason('Rotina'),
      value: 150.00,
      appointmentState: setPaymentMethod('PIX'),
      paymentMethod: setAppointmentState('Realizada'),
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        AppointmentsService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              // alert(result.message);
            } else {
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
                <AutoCompleteTutor isExternalLoading={isLoading} />
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
                  name='reason'
                  label='Motivo'
                  value={reason}
                  onChange={handleChangeReason}
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value={1}>Emergência</MenuItem>
                  <MenuItem value={2}>Rotina</MenuItem>
                  <MenuItem value={4}>Check-Up</MenuItem>
                  <MenuItem value={8}>Exame</MenuItem>
                  <MenuItem value={16}>Cirurgia</MenuItem>
                </VSelect>
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <AutocompleteEmployee isExternalLoading={isLoading} />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='value'
                  label='Valor'
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  type="number"
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
                  value={paymentMethod}
                  onChange={handleChangePaymentMethod}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value={1}>Cartão de Crédito</MenuItem>
                  <MenuItem value={2}>Cartão de Débito</MenuItem>
                  <MenuItem value={4}>Dinheiro</MenuItem>
                  <MenuItem value={8}>PIX</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='appointmentState'
                  label='Status'
                  disabled={isLoading}
                  value={appointmentState}
                  onChange={handleChangeAppointmentState}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value={1}>Rascunho</MenuItem>
                  <MenuItem value={2}>Registrada</MenuItem>
                  <MenuItem value={4}>Agendada</MenuItem>
                  <MenuItem value={8}>Realizada</MenuItem>
                  <MenuItem value={16}>Cancelada</MenuItem>
                  <MenuItem value={32}>Paga</MenuItem>
                  <MenuItem value={64}>Excluída</MenuItem>
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
                />
              </Grid> 

            </Grid>

          </Grid>
        </Box>
      </VForm>
    </BaseLayoutPage>
  );
};