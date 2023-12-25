import React from 'react'
// import cn from 'classnames';
import styles from './CustomTable.module.scss'
import Table from 'react-bootstrap/Table';
import { TeamResultData } from '../../../types';

type ColumnData = {
  key: string;
  title: string;
}

export type TableData = {
  columns: ColumnData[];
  data: any[];
  teams?: TeamResultData;
  children?: React.ReactNode;
  className?: string;
};

const CustomTable: React.FC<TableData> = ({columns, data, className}) => {
  React.useEffect(() => {
    console.log(data, columns)
  }, [])

  return (
    <>
      <div className={`${styles.table__container} ${className}`}>
      <Table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
              {'teams' in data[0] && <th>Команды</th>}
            </tr>
          </thead>
          <tbody>
            {/* {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{row[column.key]}</td>
                ))}
                <td>{row.teams[0].name}</td>
              </tr>
            ))} */}
            {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column.key]}</td>
              ))}
              {'teams' in data[0] && <td>
                {row.teams.map((team: TeamResultData, teamIndex: number) => (
                  <span key={teamIndex} style={{color: team.is_winner === true ? 'green' : team.is_winner === false ? 'red' : 'black'}}>
                    {team.name}{teamIndex !== row.teams.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </td>}
            </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CustomTable