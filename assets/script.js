// $(document).ready(function () {

// my api key
var apiKey = 'd1cd9d8beca8e5cf0a6ed252ff528e1d';
// api url w/ api key. use var or actual key?
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={d1cd9d8beca8e5cf0a6ed252ff528e1d}


var queryUrl = 'http://api.openweathermap.org/data/2.5/weather?&appid=' + apiKey;

var metric = '&units=metric';
var imperial = '&units=imperial';
var imgBaseUrl = 'http://openweathermap.org/img/w/';
var weatherInfo = document.getElementById('weatherInfo');

function getWeather() {
    var place = document.getElementById('place').value.trim();
    if (place) {
        ajax(queryUrl + '&q=' + place);
    }
};

function ajax(url) {
    var request = new XMLHttpRequest();
    if (request) {
        request.open('GET', url, true);
        request.send();

        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                var response = JSON.parse(this.responseText);
                var errorMessage = document.getElementById('errorMessage');
                if (this.status == 200) {
                    errorMessage.textContent = '';
                    generateCard(response);

                } else {
                    weatherInfo.style.display = 'none';
                    errorMessage.textContent = response.message;
                }

            }

        };
    }
};

function generateCard(response) {
    weatherInfo.style.display = 'block';
    weatherInfo.querySelector('.city').textContent = 'Weather in ' + response.name + ', ' + response.sys.country;
    weatherInfo.querySelector('.temperature img').src = imgBaseUrl + response.weather[0].icon + ' .png';
    weatherInfo.querySelector('.temperature span').innerHTML = Math.round(response.main.temp) + '&deg;' + 'C';

    var table = weatherInfo.querySelector('table');
    table.innerHTML = '';
    table.appendChild(generateRow('Humidity', response.main.humidity + ' %'));
    table.appendChild(generateRow('Wind', response.wind.speed + ' m/s, ' + response.wind.deg + " degree"));

};

generateCard;

function generateRow(value1, value2) {
    var row = document.createElement('tr');
    row.appendChild(generateColumn(value1));
    row.appendChild(generateColumn(value2));
    return row;


};

function generateColumn(value) {
    var column = document.createElement('td');
    column.textContent = value;
    return column;

};

function getTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var h = date.getHours() * 12;
    var m = date.getMinutes();
    return ((h < 10 ? '0' + h : h) + ':' + (h < 10 ? '0' + m : m));
}


//     $.ajax({
//         url: queryUrl,
//         method: 'GET'
//     }).then(function (response) {
//         console.log(response);
//     })
// })



// 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + apiKey