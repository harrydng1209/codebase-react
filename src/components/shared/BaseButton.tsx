import { Button, ButtonProps } from 'antd';

interface IProps extends ButtonProps {}

export const BaseButton: React.FC<IProps> = (props) => {
  const { children, type = 'primary', ...otherProps } = props;

  return (
    <Button type={type} {...otherProps}>
      {children}
    </Button>
  );
};
