//JS FILE
const ctx = document.getElementById('myChart').getContext('2d');

window.onload = () => {
    getDate()
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
            }
        },
        error: function (request, status, error) {
            console.log("Error");
            console.log(error);
        }
    });
}

async function addData(label, data, weather) {
    myChart.data.labels.push(label);
    myChart.data.datasets[0].data.push(Number(data))
    myChart.data.datasets[1].data.push(Number(weather))
    myChart.data.datasets[2].data.push(Number(19))
    myChart.update();
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
            order:3
        }, {
            label: 'Ploemel (ext)',
            data: [],
            borderColor: ['rgb(211, 54, 235, 1)'],
            borderWidth: 2,
            fill: true,
            backgroundColor : ['rgba(217,114,232,0.6)'],
            pointBackgroundColor : ['rgb(211, 54, 235, 1)'],
            order:2
        }, {
            label: 'Idéal chambre',
            data: [],
            borderColor: ['rgb(41,224,83)'],
            fill: false,
            backgroundColor : ['rgb(255,255,255,1)'],
            pointBackgroundColor : ['rgb(41,224,83)'],
            borderWidth: 2,
            borderDash: [10,5],
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