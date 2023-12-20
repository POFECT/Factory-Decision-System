import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Box,
    Card,
    Grid,
    Typography,
    Button
} from "@mui/material";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button as MuiButton, // Rename Button to MuiButton to avoid conflict
} from '@mui/material';



import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import { Doughnut } from 'react-chartjs-2';



const LotChart = ({ open, handleClose, sumValue }) => {

    console.log(sumValue);

    // const [barData, setBarData] = useState({
    //     smSteelGrdN: "",
    //     width_9701: 0,
    //     width_9702: 0,
    //     width_12701: 0,
    //     width_12702: 0,
    //     width_15701: 0,
    //     width_15702: 0,
    //     width_over_15701: 0,
    //     width_over_15702: 0,
    //     sum: 0,
    //     sum2: 0
    // })

    // const [standBarData, setStandBarData] = useState({
    //     smSteelGrdN: "",
    //     width_970_stand: 0,
    //     width_1270_stand: 0,
    //     width_1570_stand: 0,
    //     width_over_1570_stand: 0,
    //     sum_stand: 0,
    // })

    // if (open) {
    //     console.log(selectedCellValue.size === 1);
    //     standBarData.smSteelGrdN = selectedCellValue[0].smSteelGrdN;
    //     standBarData.width_970_stand = selectedCellValue[0].width_970_stand;
    //     standBarData.width_1270_stand = selectedCellValue[0].width_1270_stand;
    //     standBarData.width_1570_stand = selectedCellValue[0].width_1570_stand;
    //     standBarData.width_over_1570_stand = selectedCellValue[0].width_over_1570_stand;
    //     standBarData.sum_stand = selectedCellValue[0].sum_stand;

    //     if (selectedCellValue.length === 2) {
    //         console.log(selectedCellValue);
    //         barData.smSteelGrdN = selectedCellValue[1].smSteelGrdN;
    //         barData.width_9701 = selectedCellValue[1].width_9701;
    //         barData.width_9702 = selectedCellValue[1].width_9702;
    //         barData.width_12701 = selectedCellValue[1].width_12701;
    //         barData.width_12702 = selectedCellValue[1].width_12702;
    //         barData.width_15701 = selectedCellValue[1].width_15701;
    //         barData.width_15702 = selectedCellValue[1].width_15702;
    //         barData.width_over_15701 = selectedCellValue[1].width_over_15701;
    //         barData.width_over_15702 = selectedCellValue[1].width_over_15702;
    //         barData.sum = selectedCellValue[1].sum;
    //         barData.sum2 = selectedCellValue[1].sum2;
    //     }
    // }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '기투입 차트',
            },
        },
    };
    const labels = ['970', '1270', '1570', '1570~'];

    const data = {
        labels,
        datasets: [
            {
                label: '1공장',
                data: [sumValue.width_9701_sum, sumValue.width_12701_sum, sumValue.width_15701_sum, sumValue.width_over_15701_sum],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '2공장',
                data: [sumValue.width_9702_sum, sumValue.width_12702_sum, sumValue.width_15702_sum, sumValue.width_over_15702_sum],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const optionStand = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '투입대기 차트',
            },
        },
    };

    const dataStand = {
        labels,
        datasets: [
            {
                label: '대기량',
                data: [sumValue.width_970_stand_sum, sumValue.width_1270_stand_sum, sumValue.width_1570_stand_sum, sumValue.width_over_1570_stand_sum],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const test = {
        labels: ['투입대기', '기투입'],
        datasets: [
            {
                label: '합계량',
                data: [sumValue.width_970_stand_sum + sumValue.width_1270_stand_sum + sumValue.width_1570_stand_sum + sumValue.width_over_1570_stand_sum,
                    sumValue.width_9701_sum + sumValue.width_12701_sum + sumValue.width_15701_sum + sumValue.width_over_15701_sum + 
                    sumValue.width_9702_sum + sumValue.width_12702_sum + sumValue.width_15702_sum + sumValue.width_over_15702_sum],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }} maxWidth="xl">
            <DialogTitle>
                <Grid item xs={12}>
                    <Typography variant="h5">출강Lot 전체 차트</Typography>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{
                    height: "100%",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingTop: "15px"

                    }}>
                        <div>
                            <Card>
                                <Bar
                                    options={optionStand}
                                    data={dataStand}
                                />
                            </Card >
                            <Card>
                                <Bar
                                    options={options}
                                    data={data}
                                />
                            </Card>

                        </div>
                        <Card>
                                <Doughnut data={test} />
                            </Card>
                    </div>




                </DialogContentText>

            </DialogContent>
        </Dialog>
    );
};

export default LotChart;
