import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { subDays, format } from "date-fns";

const currentDate = new Date();
const sevenDaysAgo = subDays(currentDate, 7);

const generateDateArray = () => {
    const dateArray = [];
    for (let i = 0; i < 7; i++) {
        const day = subDays(currentDate, i);
        dateArray.push(format(day, "yyyy-MM-dd"));
    }
    return dateArray.reverse(); // Đảo ngược mảng để hiển thị từ cũ đến mới trên trục x
};

const dateArray = generateDateArray();

const data = [
    { time: dateArray[0], value: 43 },
    { time: dateArray[1], value: 71 },
    { time: dateArray[2], value: 63 },
    { time: dateArray[3], value: 18 },
    { time: dateArray[4], value: 52 },
    { time: dateArray[5], value: 66 },
    { time: dateArray[6], value: 99 },
];

const Report = () => {
    return (
        <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis ticks={[10,20,30,40,50,60,70,80,90,100]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
};

export default Report;
