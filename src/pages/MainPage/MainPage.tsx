import React from 'react'
import CustomBarChart from 'components/CustomBarChart'
import styles from './MainPage.module.scss'

const mockData = [
    {name: '1', uv: 4000},
    {name: '2', uv: 3000},
    {name: '3', uv: 2000},
    {name: '4', uv: 2780},
    {name: '5', uv: 1890},
    {name: '6', uv: 3000},
    {name: '7', uv: 4000},
    {name: '8', uv: 5000},
    {name: '9', uv: 3800},
    {name: '10', uv: 2150},
    {name: '11', uv: 6700},
    {name: '12', uv: 8000},
    {name: '13', uv: 1200},
    {name: '14', uv: 4100},
    {name: '15', uv: 8792},
    {name: '16', uv: 1274},
    {name: '17', uv: 1236},
    {name: '18', uv: 2000},
    {name: '19', uv: 8973},
    {name: '20', uv: 1278},
   ];

const mockColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const MainPage = () => {
  return (
    <div className={styles.main__page}>
        <div className={styles['main__page-wrapper']}>
            <h1 className={styles['main__page-title']}>
                Название игры
            </h1>
            <CustomBarChart data={mockData} colors={mockColors}/>
        </div>
    </div>
  )
}

export default MainPage