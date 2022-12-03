import React from 'react';
import { Error403 } from '../../../pages';
import { useAuthContext } from '../../contexts';

type Props = {
	roleRequired: ['admin', 'doctor', 'assistant'] | ['admin', 'assistant']  | ['admin', 'doctor']  | ['admin']  
	children?: React.ReactNode
}

const WithPermission = (props: Props) => {
  const { roleRequired, children } = props;
  const { getCurrentUser } = useAuthContext();
  return (
    <>{roleRequired === getCurrentUser().type ? children : <Error403/>}</>
  );
};

export default WithPermission;
