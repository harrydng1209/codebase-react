import { RefSelectProps, Select, SelectProps } from 'antd';

interface IProps extends SelectProps {}

export const BaseSelect = forwardRef<RefSelectProps, IProps>(
  ({ ...otherProps }, ref) => {
    return <Select ref={ref} {...otherProps} />;
  },
);
