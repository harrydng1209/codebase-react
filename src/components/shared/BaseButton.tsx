import { Button, ButtonProps } from 'antd';

interface IProps extends ButtonProps {}

export const BaseButton: React.FC<IProps> = ({
  children,
  type = 'primary',
  ...otherProps
}) => {
  return (
    <Button type={type} {...otherProps}>
      {children}
    </Button>
  );
};
