import { LayoutPageAuth } from '../../shared/layouts';
import { FormAuth } from '../../shared/components';

export const ForgotPassword: React.FC = () => {
  return (
    <LayoutPageAuth 
      form={<FormAuth 
        cardTitle={'Esqueceu a senha?'} 
        cardSubtitle={'Não tem problema, só precisamos do e-mail cadastrado.'}
        showCardSubtitle
        showInputForgotYourPasswordEmail 
        showButtonPasswordReset/>}
    ></LayoutPageAuth>
  );
};