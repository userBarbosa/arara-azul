import { LayoutPageAuth } from '../../shared/layouts';
import { FormAuth } from '../../shared/components';

export const Login: React.FC = () => {
  return (
    <LayoutPageAuth 
      form={<FormAuth 
        cardTitle={'Login'} 
        showInputLoginEmail 
        showInputLoginPassword 
        showLinkForgotYourPassword
        showButtonLogOn/>}
    ></LayoutPageAuth>
  );
};