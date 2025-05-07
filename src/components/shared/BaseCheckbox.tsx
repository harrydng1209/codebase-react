import { Checkbox, CheckboxProps, CheckboxRef } from 'antd';

interface IProps extends CheckboxProps {}

export const BaseCheckbox = forwardRef<CheckboxRef, IProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <Checkbox ref={ref} {...otherProps}>
        {children}
      </Checkbox>
    );
  },
);
