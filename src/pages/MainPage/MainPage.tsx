import React, { useState } from 'react'
import axios from 'axios';
import CustomBarChart from 'components/CustomBarChart'
import CustomLineChart from 'components/CustomLineChart';
import styles from './MainPage.module.scss'
import { LineChartData, BarChartData, RoundData } from '../../../types.ts'
// import { useDispatch } from 'react-redux';


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

const mockColors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink',
    '#8800FE', '#C4009F', '#BB28FF', '#8042FF', 'blue', 'green',
    '#FE0088', '#9F00C4', '#28FFBB', '#42FF80', 'yellow', 'purple',
    '#00FE88', '#00C49F', '#28BBFF', '#4280FF', 'orange', 'teal'
   ];



const MainPage = () => {

    const useCountdown = (targetDate: string) => {
        const countDownDate = new Date(targetDate).getTime();
       
        const [countDown, setCountDown] = useState(
          countDownDate - new Date().getTime()
        );
       
        React.useEffect(() => {
          const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
          }, 1000);
       
          return () => clearInterval(interval);
        }, [countDownDate]);
       
        return countDown;
       };
    
    const [teams, setTeams] = useState<BarChartData>()
    // const [round, setRound] = useState<RoundData>(null)
    const tender = [{
        name: 'Название 1',
        cost: 15490,
        profit: 3000
    }]
    const [round, setRound] = useState<RoundData>({
        number: 1,
        status: 2,
        info: tender,
        till_time: new Date("2023-12-25T11:34:00").toString()
    })
    const [gemsCost, setGemsCost] = useState<LineChartData[]>([])

    let countDown = 0
    if (round) {
        countDown = useCountdown(round?.till_time);
    }

    const formatTime = (ms: number) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        if (minutes < 0 || seconds < 0) {
          return '00:00'
        } else {
          return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
       };

    const getGameData = async () => {
        const response = await axios('https://mathcampgame.roxmiv.com/api/game', {
           method: 'GET'
        })
        let newGemsArr = response.data.gems_cost.map((row: number, index: number) => {
            return {
                uv: row
            }
        })
        setGemsCost(newGemsArr)

        // console.log(response.data.round)

        setRound({
            number: response.data.round.number,
            status: response.data.round.status,
            // status: 1,
            // till_time: response.data.round.till_time,
            till_time: new Date("2023-12-25T12:57:00").toString(),
            info: response.data.round.info
        })

        // console.log({
        //     number: response.data.round.number,
        //     status: response.data.round.status,
        //     till_time: response.data.round.till_time,
        //     info: response.data.round.info
        // })
    }

    React.useEffect(() => {
        getGameData()
        const intervalId = setInterval(getGameData, 3000);
 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.main__page}>
            <div className={styles['main__page-wrapper']}>
                {round && <h1 className={styles['main__page-title']}>
                    Раунд {round.number}
                </h1>}
                <div className={styles['main__page-content']}>
                    <CustomBarChart data={mockData} colors={mockColors}/>
                    <div className={styles['main__page-info']}>
                        <div className={styles['main__page-costs']}>
                            <h4 className={styles['main__page-subtitle']}>Курс валюты</h4>
                            <CustomLineChart data={gemsCost} />
                        </div>
                        <div className={styles['main__page-game']}>
                            {
                                !round ? <h4 className={styles['main__page-subtitle']}>Игра не активна</h4>
                                : round.status === 1 ? <>
                                    <h4 className={styles['main__page-subtitle']}>{round.number}<br/>
                                    Умственный раунд</h4>
                                </>
                                : round.status === 2 ? <>
                                    <h5 className={styles['main__page-subtitle']}>Оставшееся время: {formatTime(countDown)}</h5>
                                    <h5 className={styles['main__page-list-title']}>Выбор проекта:</h5>
                                    <ul className={styles['main__page-list']}>
                                    {Array.isArray(round.info) && round.info?.map((item, index) => (
                                    <li className={styles['main__page-list-item']} key={index}>
                                        {item.name}, стоимость: {item.cost}, приносит прибыли: {item.profit}
                                    </li>
                                    ))}
                                    </ul>
                                </>
                                : round.status === 3 ? <>
                                    <h4 className={styles['main__page-subtitle']}>Раунд {round.number}<br/>
                                    Результат выбора проекта</h4>
                                </>
                                : round.status === 4 ?<>
                                    <h4 className={styles['main__page-subtitle']}>Рынок + таймер</h4>
                                </>
                                : round.status === 5 ?<>
                                    <h4 className={styles['main__page-subtitle']}>Произошла кража...</h4>
                                </>
                                : round.status === 6 && <>
                                    <h4 className={styles['main__page-subtitle']}>Результат кражи</h4>
                                </>
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage