/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Buy and Sell of Rice 2022',
    },
  },
};

function LineChart(props) {
  console.log("DATA ", props.data);
  const labels = props.data.length > 0 && props.data.map((data)=> data.created_at);

  const data = {
    labels,
    datasets: [
      {
        label: 'Garbage Collected',
        data:props.data.length > 0 &&  props.data.map(data => data.no_sacks),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default LineChart