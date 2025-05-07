import { Input, InputProps, InputRef } from 'antd';
import { TextAreaProps } from 'antd/es/input';

interface IInputProps extends InputProps {}
interface ITextAreaProps extends TextAreaProps {}

export const BaseInput = forwardRef<InputRef, IInputProps>(
  ({ type, ...otherProps }, ref) => {
    if (type === 'password')
      return <Input.Password ref={ref} {...otherProps} />;
    if (type === 'search') return <Input.Search ref={ref} {...otherProps} />;

    return <Input ref={ref} {...otherProps} />;
  },
);

export const BaseInputArea = forwardRef<InputRef, ITextAreaProps>(
  ({ ...otherProps }, ref) => {
    return <Input.TextArea ref={ref} {...otherProps} />;
  },
);
