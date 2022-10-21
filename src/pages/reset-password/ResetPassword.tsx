import { LayoutPageAuth } from '../../shared/layouts';
import { FormAuth } from '../../shared/components';

export const ResetPassword: React.FC = () => {
  return (
    <LayoutPageAuth 
      form={<FormAuth 
        cardTitle={'Redefinir Senha'} 
        showInputNewPassword 
        showInputConfirmNewPassword 
        showButtonUpdatePassword/>}
    ></LayoutPageAuth>
  );
};