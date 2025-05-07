import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';

interface IProps<T> extends TableProps<T> {
  columns: ColumnType<T>[];
}

export const BaseTable = <T,>({ ...otherProps }: IProps<T>) => {
  return <Table<T> {...otherProps} />;
};
