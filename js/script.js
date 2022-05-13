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
            borderWidth: 2
        }, {
            label: 'Ploemel (ext)',
            data: [],
            borderColor: ['rgb(211, 54, 235, 1)'],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                suggestedMin: 10,
                suggestedMax: 30
            }
        },
        responsive:true
    }
});