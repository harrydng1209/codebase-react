import { useFormContext } from 'react-hook-form';
import { FormItem, FormItemProps } from 'react-hook-form-antd';

interface IProps extends Omit<FormItemProps, 'control'> {}

export const BaseFormItem = (props: IProps) => {
  const { children, name, ...otherProps } = props;

  const { control } = useFormContext();

  return (
    <FormItem control={control} name={name} {...otherProps}>
      {children}
    </FormItem>
  );
};
