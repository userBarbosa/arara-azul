import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDateCardDash = () => {
  return format(new Date(), '\'Hoje é\' EEEE\',\' dd \'de\' MMMM \'de\' yyyy.', {
    locale: ptBR,
  });
};

export const formatStringToDate = (date: string) => {
  return format(parseISO(date), 'dd/MM/yyyy HH:mm', {
    locale: ptBR,
  });
};

export const formatDateToString = (date: Date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const formatDateToDatePicker = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US');
};

export const formatDateTimeToString = (date: Date) => {
  return format(parseISO(date.toString()), 'dd\'/\'MM\'/\'yyyy HH\':\'mm', {
    locale: ptBR,
  });
};

export const formatDateToDateTimePicker = (date: Date) => {
  return format(parseISO(date.toString()), 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm', {
    locale: ptBR,
  });
};

export const formatStringToArray = (value: string) => {
  return value.split(' | ');
};

export const formatNumberToString = (value: number) => {
  return value.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
};

export const removeInvalidCharacters= (value: string) => {
  return value.replace(/[^0-9]/g, '');
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return `(${phoneNumber.substring(0,2)}) ${phoneNumber.substring(2,7)}-${phoneNumber.substring(7,11)}`;
};

export const formatDocumentNumber = (documentNumber: string) => {
  return `${documentNumber.substring(0,3)}.${documentNumber.substring(3,6)}.${documentNumber.substring(3,6)}-${documentNumber.substring(9,11)}`;
};

export const formatZipCode = (zipCode: string) => {
  return `${zipCode.substring(0,5)}-${zipCode.substring(5,8)}`;
};

export const activeBooleanToString = (active: boolean) => {
  return active === true ? 'ativo' : 'inativo';
};

export const activeStringToBoolean = (active: string) => {
  return active === 'ativo' ? true : false;
};

export const activeStringToString = (active: string) => {
  return active === 'ativo' ? 'Ativo' : 'Inativo';
};

export const typeStringToStringEnUs = (type: string) => {
  switch (type) {
  case 'administrador':
    return 'admin';
  case 'veterinario':
    return 'doctor';
  case 'recepcionista':
    return 'assistant';
  }
};

export const typeStringEnUsToStringPtBr = (type: string) => {
  switch (type) {
  case 'admin':
    return 'administrador';
  case 'doctor':
    return 'veterinario';
  case 'assistant':
    return 'recepcionista';
  }
};

export const typeStringToStringPtBr = (type: string) => {
  switch (type) {
  case 'admin':
    return 'Administrador';
  case 'doctor':
    return 'Veterinário';
  case 'assistant':
    return 'Recepcionista';
  }
};

export const specialtyStringToNumber = (specialty: string) => {
  switch (specialty) {
  case 'gatos':
    return 1;
  case 'cachorros':
    return 2;
  case 'aves':
    return 4;
  case 'peixes':
    return 8;
  case 'roedores':
    return 16;
  case 'repteis':
    return 32;
  case 'selvagens':
    return 64;
  case 'fazenda':
    return 128;
  case 'marinhos':
    return 256;
  }
};

export const specialtyNumberToString = (specialty: number) => {
  switch (specialty) {
  case 1:
    return 'gatos';
  case 2:
    return 'cachorros';
  case 4:
    return 'aves';
  case 8:
    return 'peixes';
  case 16:
    return 'roedores';
  case 32:
    return 'repteis';
  case 64:
    return 'selvagens';
  case 128:
    return 'fazenda';
  case 256:
    return 'marinhos';
  default:
    return '';
  }
};

export const specialtyStringToString = (specialty: string) => {
  switch (specialty) {
  case 'gatos':
    return 'Gatos';
  case 'cachorros':
    return 'Cachorros';
  case 'aves':
    return 'Aves';
  case 'peixes':
    return 'Peixes';
  case 'roedores':
    return 'Roedores';
  case 'repteis':
    return 'Répteis';
  case 'selvagens':
    return 'Selvagens';
  case 'fazenda':
    return 'Fazenda';
  case 'marinhos':
    return 'Marinhos';
  default:
    return '';
  }
};

export const sexStringToNumber = (sex: string) => {
  switch (sex) {
  case 'femea':
    return 1;
  case 'macho':
    return 2;
  }
};

export const sexNumberToString = (sex: number) => {
  switch (sex) {
  case 1:
    return 'femea';
  case 2:
    return 'macho';
  default:
    return '';
  }
};

export const sexStringToString = (sex: string) => {
  switch (sex) {
  case 'femea':
    return 'Fêmea';
  case 'macho':
    return 'Macho';
  }
};

export const specieStringToNumber = (specie: string) => {
  switch (specie) {
  case 'gato':
    return 1;
  case 'cachorro':
    return 2;
  case 'ave':
    return 4;
  case 'peixe':
    return 8;
  case 'roedor':
    return 16;
  case 'reptil':
    return 32;
  case 'selvagem':
    return 64;
  case 'fazenda':
    return 128;
  case 'marinho':
    return 256;
  }
};

export const specieNumberToString = (specie: number) => {
  switch (specie) {
  case 1:
    return 'gato';
  case 2:
    return 'cachorro';
  case 4:
    return 'ave';
  case 8:
    return 'peixe';
  case 16:
    return 'roedor';
  case 32:
    return 'reptil';
  case 64:
    return 'selvagem';
  case 128:
    return 'fazenda';
  case 256:
    return 'marinho';
  default:
    return '';
  }
};

export const specieStringToString = (specie: string) => {
  switch (specie) {
  case 'gato':
    return 'Gato';
  case 'cachorro':
    return 'Cachorro';
  case 'ave':
    return 'Ave';
  case 'peixe':
    return 'Peixe';
  case 'roedor':
    return 'Roedor';
  case 'reptil':
    return 'Réptil';
  case 'selvagem':
    return 'Selvagem';
  case 'fazenda':
    return 'Fazenda';
  case 'marinho':
    return 'Marinho';
  }
};

export const allergyStringToNumber = (allergy: string) => {
  switch (allergy) {
  case 'alergia-pulga':
    return 1;
  case 'alergia-dermatologica':
    return 2;
  case 'alergia-alimentar':
    return 4;
  case 'alergia-medicamento':
    return 8;
  case 'outra':
    return 16;
  }
};

export const allergyNumberToString = (allergy: number) => {
  switch (allergy) {
  case 1:
    return 'alergia-pulga';
  case 2:
    return 'alergia-dermatologica';
  case 4:
    return 'alergia-alimentar';
  case 8:
    return 'alergia-medicamento';
  case 16:
    return 'outra';
  default:
    return '';
  }
};

export const allergyStringToString = (allergy: string) => {
  switch (allergy) {
  case 'alergia-pulga':
    return 'Alergia a Pulga';
  case 'alergia-dermatologica':
    return 'Alergia Dermatológica';
  case 'alergia-alimentar':
    return 'Alergia Alimentar';
  case 'alergia-medicamento':
    return 'Alergia a Medicamentos';
  case 'outra':
    return 'Outras';
  }
};

export const onTreatmentBooleanToString = (onTreatment: boolean) => {
  return onTreatment === true ? 'sim' : 'nao';
};

export const onTreatmentStringToBoolean = (onTreatment: string) => {
  return onTreatment === 'sim' ? true : false;
};

export const onTreatmentStringToString = (onTreatment: string) => {
  return onTreatment === 'sim' ? 'Sim' : 'Não';
};

export const appointmentStateStringToNumber = (appointmentState: string) => {
  switch (appointmentState) {
  case 'rascunho':
    return 1;
  case 'registrada':
    return 2;
  case 'agendada':
    return 4;
  case 'realizada':
    return 8;
  case 'cancelada':
    return 16;
  case 'paga':
    return 32;
  case 'excluida':
    return 64;
  default:
    return 0;
  }
};

export const appointmentStateNumberToString = (appointmentState: number) => {
  switch (appointmentState) {
  case 1:
    return 'rascunho';
  case 2:
    return 'registrada';
  case 4:
    return 'agendada';
  case 8:
    return 'realizada';
  case 16:
    return 'cancelada';
  case 32:
    return 'paga';
  case 64:
    return 'excluida';
  default:
    return '';
  }
};

export const appointmentStateStringToString = (appointmentState: string) => {
  switch (appointmentState) {
  case 'rascunho':
    return 'Rascunho';
  case 'registrada':
    return 'Registrada';
  case 'agendada':
    return 'Agendada';
  case 'realizada':
    return 'Realizada';
  case 'cancelada':
    return 'Cancelada';
  case 'paga':
    return 'Paga';
  case 'excluida':
    return 'Excluída';
  }
};

export const paymentMethodStringToNumber = (paymentMethod: string) => {
  switch (paymentMethod) {
  case 'cartao-credito':
    return 1;
  case 'cartao-debito':
    return 2;
  case 'dinheiro':
    return 4;
  case 'pix':
    return 8;
  default:
    return 0;
  }
};

export const paymentMethodNumberToString = (paymentMethod: number) => {
  switch (paymentMethod) {
  case 1:
    return 'cartao-credito';
  case 2:
    return 'cartao-debito';
  case 4:
    return 'dinheiro';
  case 8:
    return 'pix';
  default:
    return '';
  }
};

export const paymentMethodStringToString = (paymentMethod: string) => {
  switch (paymentMethod) {
  case 'cartao-credito':
    return 'Cartão de Crédito';
  case 'cartao-debito':
    return 'Cartão de Débito';
  case 'dinheiro':
    return 'Dinheiro';
  case 'pix':
    return 'Pix';
  }
};

export const reasonStringToNumber = (reason: string) => {
  switch (reason) {
  case 'emergencia':
    return 1;
  case 'rotina':
    return 2;
  case 'check-up':
    return 4;
  case 'exame':
    return 8;
  case 'cirurgia':
    return 16;
  default:
    return 0;
  }
};

export const reasonNumberToString = (reason: number) => {
  switch (reason) {
  case 1:
    return 'emergencia';
  case 2:
    return 'rotina';
  case 4:
    return 'check-up';
  case 8:
    return 'exame';
  case 16:
    return 'cirurgia';
  default:
    return '';
  }
};

export const reasonStringToString = (reason: string) => {
  switch (reason) {
  case 'emergencia':
    return 'Emergência';
  case 'rotina':
    return 'Rotina';
  case 'check-up':
    return 'Check-Up';
  case 'exame':
    return 'Exame';
  case 'cirurgia':
    return 'Cirurgia';
  }
};
