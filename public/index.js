async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    let response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=9c653000c19841e78e77259e84cea4c1");

    let result = await response.json();

    const {GME, MSFT, DIS, BNTX } = result;

    const stocks = [GME, MSFT, DIS, BNTX];


    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor:  getColor(stock.meta.symbol)
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map( stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: getHighestValue(stocks),
                backgroundColor: [
                    'rgba(61, 161, 61, 0.7)',
                    'rgba(209, 4, 25, 0.7)',
                    'rgba(166, 43, 158, 0.7)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(61, 161, 61, 0.7)',
                    'rgba(209, 4, 25, 0.7)',
                    'rgba(166, 43, 158, 0.7)',
                    'rgba(255, 159, 64, 1)',
                ]
            }]
        },
    });

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map( stock => stock.meta.symbol),
            datasets: [{
                data: getAveragePrice(stocks),
                backgroundColor: [
                    'rgba(61, 161, 61, 0.7)',
                    'rgba(209, 4, 25, 0.7)',
                    'rgba(166, 43, 158, 0.7)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(61, 161, 61, 0.7)',
                    'rgba(209, 4, 25, 0.7)',
                    'rgba(166, 43, 158, 0.7)',
                    'rgba(255, 159, 64, 1)',
                ]
            }]
        },
    });
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(166, 43, 158, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(255, 159, 64, 1)'
    }
}

function getHighestValue(stocks){
    let highestValuesArray =[];
    stocks.map(stock => {
        let valArray = stock.values;
        let highestVal = stock.values[0].high;
        valArray.map(value => {
            // getting GME highest Value
            if (value.high > highestVal){
                highestVal = value.high
            }    
        })
        highestVal = (Math.floor(highestVal * 100)) / 100;
        highestValuesArray.push(highestVal);
    })
    return highestValuesArray;
}

function getAveragePrice(stocks){
    averageMonthlyArr = [];
    stocks.map( stock =>{
        let valArray = stock.values
        let averageSum = 0;
        valArray.map(value => {
            let averageDailyPrice = (parseFloat(value.high) + parseFloat(value.low)) / 2;
            averageSum = averageSum + averageDailyPrice;

        })

        let averageMonthly = (Math.floor((averageSum / valArray.length) * 100))/100;

        averageMonthlyArr.push(averageMonthly);
    })
    return averageMonthlyArr;
}

main()

//EXTRA code that I thought I needed but didn't really use
//Remove time stamps from minute intervals only leaving the date.
// function getDate(stock0){
//     let fullDateArray = stock0.values.map(value => value.datetime);

//     let simpleDateArray =  [];
//     fullDateArray.map(date => {
//         let arrDate = date.split('');
//         arrDate.splice(10,9)
//         // console.log(simpleDate)
//         simpleDate = arrDate.join("")
//         simpleDateArray.push(simpleDate)
        
//     });

//     return simpleDateArray

// }
// API end points https://api.twelvedata.com/
//&interval=1day
