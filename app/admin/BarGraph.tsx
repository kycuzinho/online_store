'use client'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
    data: GraphData[];
}

type GraphData = {
    day: string;
    date: string;
    totalAmount: number; 
};


const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount / 100); 
};

const diasSemana: Record<string, string> = {
    Monday: "Segunda-feira",
    Tuesday: "Terça-feira",
    Wednesday: "Quarta-feira",
    Thursday: "Quinta-feira",
    Friday: "Sexta-feira",
    Saturday: "Sábado",
    Sunday: "Domingo",
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
    const labels = data.map(item => diasSemana[item.day as keyof typeof diasSemana] || item.day);
    const amounts = data.map(item => item.totalAmount); // Keep values in cents for Chart.js

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Total de Vendas (Últimos 7 dias)",
                data: amounts, 
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let value = context.raw;
                        return formatPrice(value); 
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value: any) => formatPrice(value) // Convert cents to Euros in Y-axis labels
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default BarGraph;
