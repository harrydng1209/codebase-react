import type { TOptions } from '@/models/types/shared.type';

import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';

interface IProps extends Omit<CheckboxGroupProps, 'options'> {
  options: TOptions[];
}

export const BaseCheckboxGroup: React.FC<IProps> = ({
  options,
  ...otherProps
}) => {
  return (
    <Checkbox.Group {...otherProps}>
      {options.map((item, index) => (
        <Checkbox key={item.key || index} value={item.value}>
          {item.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};
