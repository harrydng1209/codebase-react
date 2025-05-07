import { InputNumber, InputNumberProps } from 'antd';

interface IProps extends InputNumberProps {}

export const BaseInputNumber: React.FC<IProps> = ({
  children,
  ...otherProps
}) => {
  return <InputNumber {...otherProps}>{children}</InputNumber>;
};
