import { TOptions } from '@/models/types/shared.type';
import { RefSelectProps, Select, SelectProps } from 'antd';

interface IProps extends Omit<SelectProps, 'options'> {
  options: TOptions[];
}

export const BaseSelect = forwardRef<RefSelectProps, IProps>((props, ref) => {
  const { children, options, ...otherProps } = props;

  return (
    <Select ref={ref} {...otherProps}>
      {options.map((item, index) => (
        <Select.Option key={item.key || index} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
      {children}
    </Select>
  );
});
