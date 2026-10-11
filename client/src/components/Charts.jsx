import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./charts.css";
import {

    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

import { getAllViolationsForRestaurant } from "../api"

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export const BarCharts = ({ facilityid }) => {

    const [violations, setViolations] = useState([])
    const [loadError, setLoadError] = useState()
    const [violationsCount, setViolationsCount] = useState(0)
    const [chartData, setChartData] = useState()


    useEffect(() => {

        getAllViolationsForRestaurant(facilityid)
            .then(setViolations)
            .catch(setLoadError);
    }, [])


    useEffect(() => {
        setViolationsCount(violations.length)
    }, [violations])

    useEffect(() => {

        setChartData({
            labels: [''],
            datasets: [
                {
                    label: 'Violation',
                    data: [violationsCount],
                    backgroundColor: (violationsCount < 4) ? 'green' : 'yellow',
                    borderWidth: 1,
                    barPercentage: 0.4,
                    borderSkipped: false,
                    borderRadius: {

                        bottomLeft: 10,
                        bottomRight: 10

                    },


                },
                {
                    label: 'Violation2',
                    data: [12 - violationsCount],
                    backgroundColor: [
                        'white',

                    ],
                    borderRadius: {
                        topLeft: 10,
                        topRight: 10,


                    },
                    borderWidth: 1,
                    barPercentage: 0.4,
                    borderSkipped: false,

                },
            ],
        })
    }, [violationsCount])

    const options = {
        layout: {
            padding: {
                top: 3
            }
        },
        aspectRatio: 0.5,
        borderColor: 'black',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }

        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                border: {
                    display: false
                },
                stacked: true
            },
            y: {

                beginAtZero: true,
                grid: {
                    display: true
                },
                border: {
                    display: false
                },
                ticks: {
                    display: true
                },
                stacked: true,
                position: 'right'
            },

        }
    }



    return (
        <div className="customerCard">
            {chartData && (
                <Bar
                    data={chartData}
                    options={options}
                />
            )}
        </div>
    );
};
