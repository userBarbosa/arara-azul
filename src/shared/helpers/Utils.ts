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