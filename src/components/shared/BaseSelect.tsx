import { RefSelectProps, Select, SelectProps } from 'antd';

interface IProps extends SelectProps {}

export const BaseSelect = forwardRef<RefSelectProps, IProps>((props, ref) => {
  const { ...otherProps } = props;

  return <Select ref={ref} {...otherProps} />;
});
