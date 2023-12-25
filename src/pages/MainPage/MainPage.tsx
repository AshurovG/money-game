import React, { useState } from 'react'
import axios from 'axios';
import CustomBarChart from 'components/CustomBarChart'
import CustomLineChart from 'components/CustomLineChart';
import styles from './MainPage.module.scss'
import { LineChartData, BarChartData } from '../../../types.ts'


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

const mockCosts = [
    {
      uv: 810,
    },
    {
      uv: 3000,
    },
    {
      uv: 2000,
    },
    {
      uv: 2780,
    },
    {
      uv: 1890,
    },
    {
      uv: 2390,
    },
    {
      uv: 3490,
    },
    {
      uv: 3990,
    },
    {
      uv: 3290,
    },
    {
      uv: 3140,
    },
];

const mockColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const MainPage = () => {
    const [teams, setTeams] = useState<BarChartData>()
    const [gemsCost, setGemsCost] = useState<LineChartData[]>([])
    // const [mockC,setMockC] = useState<LineChartData[]>(mockCosts)

    const getGameData = async () => {
        const response = await axios('https://mathcampgame.roxmiv.com/api/game', {
           method: 'GET'
        })
        let newArr = response.data.gems_cost.map((row: number, index: number) => {
            return {
                uv: row
            }
        })
        setGemsCost(newArr)
    }

    React.useEffect(() => {
        const intervalId = setInterval(getGameData, 3000);
 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.main__page}>
            <div className={styles['main__page-wrapper']}>
                <h1 className={styles['main__page-title']}>
                    Раунд N
                </h1>
                <div className={styles['main__page-content']}>
                    <CustomBarChart data={mockData} colors={mockColors}/>
                    <div className={styles['main__page-info']}>
                        <div className={styles['main__page-costs']}>
                            <h4 className={styles['main__page-subtitle']}>Курс валюты</h4>
                            <CustomLineChart data={gemsCost} />
                        </div>
                        <div className={styles['main__page-game']}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage