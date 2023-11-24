import React, {useEffect, useState} from "react";
import {format, subDays} from "date-fns";
import {totalByWeek} from "./service/ReportService";
import {Chart} from "primereact/chart";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {findShop} from "./service/ProfileService";
export default function ReportMonth(){
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [check, setCheck] = useState(true);
    let navigate = useNavigate();
    const idAcc = localStorage.getItem('account')

    useEffect(() => {
        findShop(idAcc).then((shop) => {
            const idShop = shop.id;
            const totalRevenueS = [];
            const currentDate = new Date();
            const promises = [];
            for (let i = 0; i < 4; i++) {
                const startDate = subDays(currentDate, i * 7 + 7);
                const endDate = subDays(currentDate, i * 7);
                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                const weekPromise = totalByWeek(formattedStartDate, formattedEndDate, idShop);
                promises.push(weekPromise);
            }
            promises.reverse();
            Promise.all(promises)
                .then((week) => {
                    for (let i = 0; i < week.length; i++) {
                        Promise.all(week[i]).then((day) => {
                            let result = 0
                            for (let j = 0; j < day.length; j++) {
                                result += day[j]?.total
                            }
                            totalRevenueS.push(result)
                        })
                    }
                    const data = {
                        labels: ['Tuần 1', 'Tuần2', 'Tuần 3', 'Tuần 4'],
                        datasets: [
                            {
                                label: "Doanh thu tháng",
                                data: totalRevenueS,
                                backgroundColor: [
                                    '#a87633',
                                    '#4BC0C0',
                                    '#369EEB',
                                    '#9966FF'
                                ]
                            }
                        ]
                    };
                    const options = {
                        scales: {
                            y: {
                                beginAtZero: true
                            }

                        }
                    };

                    setChartData(data);
                    setChartOptions(options);
                })
        })
    }, []);

    function changeLine() {
        setCheck(!check)
    }
    function reportWeek() {
        navigate("/shop-management/report")

    }
    return (
        <>
            <div className="card" style={{height: '52%', width: '60%'}}>
                <Chart type={check? 'bar' : 'line'}
                       data={chartData} options={chartOptions}/>
            </div>
            <button onClick={changeLine}>Chuyển đổi</button>
            <button onClick={reportWeek}>Trong 1 tuần qua</button>
        </>
    )

}