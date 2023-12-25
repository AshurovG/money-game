import React, { useState } from 'react'
import axios from 'axios';
import CustomBarChart from 'components/CustomBarChart'
import CustomLineChart from 'components/CustomLineChart';
import CustomTable from 'components/CustomTable';
import styles from './MainPage.module.scss'
import { LineChartData, BarChartData, RoundData, TeamData } from '../../../types.ts'
import brain from 'assets/brain.webp'
import theft from 'assets/theft.png'
import ArrowIcon from 'components/Icons/ArrowIcon';
import AcceptIcon from 'components/Icons/AcceptIcon';
import CancelIcon from 'components/Icons/CancelIcon';
// import { useDispatch } from 'react-redux';

// const mockTenders = [
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
//     {
//         name: '1',
//         cost: 10000,
//         profit: 10000,
//     },
// ]

// const mockData = [
//     {name: '1', uv: 4000},
//     {name: '2', uv: 3000},
//     {name: '3', uv: 2000},
//     {name: '4', uv: 2780},
//     {name: '5', uv: 1890},
//     {name: '6', uv: 3000},
//     {name: '7', uv: 4000},
//     {name: '8', uv: 5000},
//     {name: '9', uv: 3800},
//     {name: '10', uv: 2150},
//     {name: '11', uv: 6700},
//     {name: '12', uv: 8000},
//     {name: '13', uv: 1200},
//     {name: '14', uv: 4100},
//     {name: '15', uv: 8792},
//     {name: '16', uv: 1274},
//     {name: '17', uv: 1236},
//     {name: '18', uv: 2000},
//     {name: '19', uv: 8973},
//     {name: '20', uv: 1278},
// ];

// const mockCosts = [
//     {
//       uv: 810,
//     },
//     {
//       uv: 3000,
//     },
//     {
//       uv: 2000,
//     },
//     {
//       uv: 2780,
//     },
//     {
//       uv: 1890,
//     },
//     {
//       uv: 2390,
//     },
//     {
//       uv: 3490,
//     },
//     {
//       uv: 3990,
//     },
//     {
//       uv: 3290,
//     },
//     {
//       uv: 3140,
//     },
// ];

    // const firstTeams = [
    //     {
    //         name: 'team 1',
    //         is_winner: true
    //     },
    //     {
    //         name: 'team 2',
    //         is_winner: true
    //     },
    //     {
    //         name: 'team 3',
    //         is_winner: null
    //     },
    //     {
    //         name: 'team 4',
    //         is_winner: false
    //     },
    //     {
    //         name: 'team 5',
    //         is_winner: null
    //     },
    //     {
    //         name: 'team 6',
    //         is_winner: false
    //     },
    //     {
    //         name: 'team 7',
    //         is_winner: null
    //     },
    //     {
    //         name: 'team 8',
    //         is_winner: false
    //     },
    //     {
    //         name: 'team 9',
    //         is_winner: null
    //     },
    //     {
    //         name: 'team 10',
    //         is_winner: false
    //     },

    // ]

    // const mockTenderResultsInfo = [{
    //     name: 'test',
    //     cost: 0,
    //     profit: 20000,
    //     teams: firstTeams
    // }]

    // const mockAttacksResult = [{
    //     attacking: {name: 'Атакующий'},
    //     attacked: {name: 'Атакуемый'},
    //     is_success: false,
    //     stolen: 20000
    // }]

const columns = [
    {
        key: "name",
        title: "Название"
    },
    {
        key: "cost",
        title: "Инвестиции"
    },
    {
        key: "profit",
        title: "Прибыль"
    }
]

const mockColors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink',
    '#8800FE', '#C4009F', '#BB28FF', '#8042FF', 'blue', 'green',
    '#FE0088', '#9F00C4', '#28FFBB', '#42FF80', '#444', 'purple',
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
    
    const [teams, setTeams] = useState<BarChartData[]>()
    // const [columns, setColumns] = useState<ColumnData[]>([])
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
        let newGemsArr = response.data.gems_cost.map((row: number) => {
            return {
                uv: row
            }
        })
        setGemsCost(newGemsArr)

        let newTeamsArr = response.data.teams.map((row: TeamData) => {
            return {
                name: row.name,
                uv: row.money,
                gems: row.gems
            }
        })

        setTeams(newTeamsArr)

        console.log(response.data.round.info)

        setRound({
            status: response.data.round.status,
            // till_time: new Date("2023-12-25T15:00:00").toString(),
            number: response.data.round.number,
            info: response.data.round.info,
            // status: 6,
            // number: 1,
            till_time: response.data.round.till_time,
            // info: null
            // info: mockTenders
            // info: mockTenderResultsInfo
            // info: mockAttacksResult
        })


        // console.log(response.data.round.info)

        // console.log({
        //     number: response.data.round.number,
        //     status: response.data.round.status,
        //     till_time: response.data.round.till_time,
        //     info: response.data.round.info
        // })
    }

    function formatNumber(num: number) {
        return new Intl.NumberFormat('ru-RU').format(num);
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
                {teams && <CustomBarChart data={teams} colors={mockColors}/>}
                    {/* <div className={styles.bar}><CustomBarChart data={mockData} colors={mockColors}/></div> */}
                    <div className={styles['main__page-info']}>
                        <div className={styles['main__page-costs']}>
                            <h4 className={styles['main__page-subtitle']}>Курс стоникс</h4>
                            <CustomLineChart data={gemsCost} />
                        </div>
                        <div className={styles['main__page-game']}>
                            {
                                !round || Array.isArray(round.info) && round.info.length === 0 ? <h4 className={styles['main__page-subtitle']}>Игра не начата</h4>
                                : round.status === 1 ? <div className={styles['main__page-image-wrapper']}>
                                    <h4 className={styles['main__page-subtitle']}>
                                        Умственный раунд
                                    </h4>
                                    <img className={styles['main__page-image']} src={brain} alt="brain" />
                                </div>
                                : round.status === 2 ? <>
                                    <h5 className={styles['main__page-subtitle']}>Оставшееся время: {formatTime(countDown)}</h5>
                                    <h5 className={styles['main__page-list-title']}>Выбор проекта:</h5>
                                    {/* <ul className={styles['main__page-list']}> */}
                                    {/* {Array.isArray(round.info) && round.info?.map((item, index) => {
                                    if ('name' in item && 'cost' in item && 'profit' in item) {
                                    return (
                                    <li className={styles['main__page-list-item']} key={index}>
                                        {item.name}, стоимость: {item.cost}, приносит прибыли: {item.profit}
                                    </li>
                                    );
                                    }
                                    })} */}
                                    {/* </ul> */}
                                    { Array.isArray(round.info) && round.info.length !== 0 && <CustomTable columns={columns} data={round.info}/>}
                                </>
                                : round.status === 3 ? <>
                                    <h4 className={styles['main__page-subtitle']}>
                                        Результат выбора проекта
                                    </h4>
                                    <div className={styles['main__page-list']}>
                                        {Array.isArray(round.info) && round.info.length !== 0 && <CustomTable columns={columns} data={round.info}/>}
                                    </div>
                                </>
                                : round.status === 4 ?<>
                                    <h4 className={styles['main__page-subtitle']}>Рынок</h4>
                                    <h5 className={styles['main__page-subtitle']}>Оставшееся время: {formatTime(countDown)}</h5>
                                </>
                                : round.status === 5 ?<div className={styles['main__page-image-wrapper']}>
                                    <h4 className={styles['main__page-subtitle']}>Произошла кража...</h4>
                                    <img className={styles['main__page-image']} src={theft} alt="theft" />
                                </div>
                                : round.status === 6 && round.info && Array.isArray(round.info) &&  <> 
                                <h4 className={styles['main__page-subtitle']}>Результат кражи</h4>
                                <div className={styles['main__page-attack-wrapper']}>
                                    {round.info.map((item) => {
                                    if ('attacking' in item && 'attacked' in item && 'is_success' in item && 'stolen' in item) {
                                      return (
                                        <div className={styles['main__page-attack']}>
                                            <span>{item.attacking.name}</span>
                                            <ArrowIcon/>
                                            <span>{item.attacked.name}</span>
                                            {
                                                item.is_success ? 
                                                <AcceptIcon/>
                                                : <CancelIcon/>
                                            }
                                            {item.is_success && <span>{formatNumber(item.stolen)}</span>}
                                        </div>
                                      );
                                    }
                                   })}
                                   </div>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage