import { Modal, ModalProps } from 'antd';

interface IProps extends ModalProps {}

export const BaseModal: React.FC<IProps> = (props) => {
  const { children, ...otherProps } = props;

  return <Modal {...otherProps}>{children}</Modal>;
};
