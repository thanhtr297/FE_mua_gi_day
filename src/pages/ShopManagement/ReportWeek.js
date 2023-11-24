import {Chart} from 'primereact/chart';
import {format, subDays} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {totalByDate} from "./service/ReportService";
import button from "bootstrap/js/src/button";
import ReportMonth from "./ReportMonth";
import {useNavigate} from "react-router-dom";
import {findShop} from "./service/ProfileService";


export default function ReportWeek() {
    let navigate = useNavigate();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [check, setCheck] = useState(true);
    const idAcc = localStorage.getItem('account')

    useEffect(() => {
        findShop(idAcc).then((shop) => {
            const idShop = shop.id;
            const currentDate = new Date();
            const labels = [];
            const total1 = [];
            const promises = [];

            for (let i = 6; i >= 0; i--) {
                const date = subDays(currentDate, i);
                const formattedDate = format(date, 'yyyy-MM-dd');
                labels.push(formattedDate);
                promises.push(totalByDate(formattedDate,idShop));
            }
            Promise.all(promises)
                .then(results => {
                    const total2 = results;
                    for (let i = 0; i < total2.length; i++) {
                        let result = 0;
                        for (let j = 0; j < total2[i].length; j++) {
                            result += total2[i][j].total;
                        }
                        total1.push(result)
                    }
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Doanh thu tuần',
                                data: total1,
                                backgroundColor: [
                                    '#a87633',
                                    '#4BC0C0',
                                    '#369EEB',
                                    '#9966FF',
                                    '#f5796e',
                                    '#C81464',
                                    '#32CD32',
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
    function reportMonth() {
        navigate("/shop-management/report/month")
    }


    return (
        <>
            <div className="card" style={{height: '62%', width: '70%'}}>
                <Chart type={check? 'bar' : 'line'}
                       data={chartData} options={chartOptions}/>
            </div>
            <button onClick={changeLine}>Chuyển đổi</button>
            <button onClick={reportMonth}>Trong 1 tháng qua</button>

        </>
    )
}





