import { Modal, ModalProps } from 'antd';

interface IProps extends ModalProps {}

export const BaseModal: React.FC<IProps> = ({ children, ...otherProps }) => {
  return <Modal {...otherProps}>{children}</Modal>;
};
