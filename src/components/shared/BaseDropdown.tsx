import { Dropdown, DropdownProps } from 'antd';

interface IProps extends DropdownProps {}

export const BaseDropdown: React.FC<IProps> = ({ children, ...otherProps }) => {
  return (
    <Dropdown trigger={['click']} {...otherProps}>
      {children}
    </Dropdown>
  );
};
