//JS FILE
const ctx = document.getElementById('myChart').getContext('2d');
const monthTag = document.querySelector('.moyMonth')

window.onload = () => {
    getDate()
    myChart.setDatasetVisibility(3, false); // hides dataset at index 1
    myChart.update();
}

function getDate(){
    $.ajax({
        type : "POST",
        url  : "https://www.stuff.nicolasvaillant.net/local/prive/tempBedroom/php/get.php",
        dataType: 'json',
        data : {},
        success: function(res) {
            for (let i = 0; i < res.length; i++) {
                addData(res[i].date, res[i].point, res[i].weather)

                if(i === res.length - 1){
                    getChartData()
                }
            }
        },
        error: function (request, status, error) {
            console.log("Error");
            console.log(error);
        }
    });
}

function addData(label, data, weather) {
    myChart.data.labels.push(label);
    myChart.data.datasets[0].data.push(Number(data))
    myChart.data.datasets[1].data.push(Number(weather))
    myChart.data.datasets[2].data.push(Number(19))
    myChart.update();
}

function addDataMoy(data ,multiple) {
    for (let i = 0; i < multiple; i++) {
        myChart.data.datasets[3].data.push(Number(data))
    }
    myChart.update();
}

function numAverage(a) {
    let b = a.length,
        c = 0, i;
    for (i = 0; i < b; i++){
        c += Number(a[i]);
    }
    return (c/b).toFixed(2);
}

const check = document.querySelector('.check')
check.addEventListener('change', function(){
    if (this.checked) {
        myChart.setDatasetVisibility(3, true); // hides dataset at index 1
        myChart.update();
    } else {
        myChart.setDatasetVisibility(3, false); // hides dataset at index 1
        myChart.update();
    }
},false)

function getChartData(){
    let tempHome = []
    let tempArray = []

    console.log(myChart.data.datasets[0].data)
    tempHome.push(myChart.data.datasets[0].data)

    const multiple = tempHome[0].length
    for (let i = 0; i < multiple; i++) {
        tempArray.push(numAverage(tempHome[0]))
        // if(i === multiple - 1){
        //     console.log("ok")
        // }
    }
    addDataMoy(numAverage(tempArray), multiple)
    getLabels()
}
let monthA = []
function getLabels(){
    let labels = myChart.data.labels
    let data = myChart.data.datasets[0].data
    let date = new Date()
    let current = date.getMonth() + 1
    let month = toMonthName(current)

    for (let i = 0; i < labels.length; i++) {
        let split = labels[i].split(" ")

        if(month === split[1]) {
            monthA.push(data[i])
        }else{
            console.log("Aucune donnée")
        }
    }
    monthTag.innerHTML = `${numAverage(monthA)}°C`
    // console.log(numAverage(monthA))
}

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Chambre',
            data: [],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 2,
            fill: true,
            backgroundColor : ['rgba(121,182,224,0.37)'],
            pointBackgroundColor : ['rgba(54, 162, 235, 1)'],
            order:4
        }, {
            label: 'Ploemel (ext)',
            data: [],
            borderColor: ['rgb(211, 54, 235, 1)'],
            borderWidth: 2,
            fill: true,
            backgroundColor : ['rgba(217,114,232,0.6)'],
            pointBackgroundColor : ['rgb(211, 54, 235, 1)'],
            order:3
        }, {
            label: 'Idéal chambre',
            data: [],
            borderColor: ['rgb(41,224,83)'],
            fill: false,
            backgroundColor : ['rgb(255,255,255,1)'],
            pointBackgroundColor : ['rgb(41,224,83)'],
            borderWidth: 2,
            borderDash: [10,5],
            order:2
        }, {
            label: 'Moyenne',
            data: [],
            borderColor: ['rgb(224,41,41)'],
            fill: false,
            backgroundColor : ['rgb(255,255,255,1)'],
            pointBackgroundColor : ['rgb(224,41,41)'],
            borderWidth: 2,
            borderDash: [10,10],
            order:1
        }]
    },
    options: {
        scales: {
            y: {
                suggestedMin: 10,
                suggestedMax: 30,
            }
        },
        responsive:true
    }
});