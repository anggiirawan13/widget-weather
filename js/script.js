const apikey = 'vJ1GDy4qiOAwEnB1dkew971u3iqdbliw';

function startTime(hour, minute, second) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = 
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i){
    if (i<10) {i="0" + i};
    return i;
}
async function getCity() {
    const baseURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apikey}&q=jakarta`;

    const response = await fetch(baseURI + query);
    const data = await response.json();

    document.getElementById('location').innerHTML = data[0].LocalizedName;
}

async function getDetailWeatherCityCurrent() {
    const baseURI = 'http://dataservice.accuweather.com/currentconditions/v1/208971';
    const query = `?apikey=${apikey}&details=true`;

    const response = await fetch(baseURI + query);
    const json = await response.json();
    const data = json[0];

    // WAKTU SEKARANG
    console.log(new Date(data.LocalObservationDateTime).toLocaleString());

    // SUHU SEKARANG
    console.log(data.Temperature.Metric.Value + data.Temperature.Metric.Unit);

    // UNITE TYPE
    console.log(data.Temperature.Metric.UnitType);

    // ICON
    console.log(data.WeatherIcon);

    // KETERANGAN AWAN
    console.log(data.WeatherText);

    // KECEPATAN ANGIN
    console.log(data.Wind.Speed.Metric.Value + data.Wind.Speed.Metric.Unit);

    // RAIN PROBABILITY
    console.log(data.RainProbability + '%');
}

async function getDetailWeatherCityTo3Hours() {
    // const baseURI = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/208971';
    // const query = `?apikey=${apikey}&details=true&metric=true`;

    // const response = await fetch(baseURI + query);
    // const data = await response.json();

    // for (i = 0; i < 3; i++) {
    //     console.log("START");
    //     // WAKTU SEKARANG
    //     console.log(new Date(data[i].DateTime).getHours());

    //     // SUHU SEKARANG
    //     console.log(data[i].Temperature.Value + data[i].Temperature.Unit);

    //     // UNITE TYPE
    //     console.log(data[i].Temperature.UnitType);

    //     // ICON
    //     console.log(data[i].WeatherIcon);

    //     // KETERANGAN AWAN
    //     console.log(data[i].IconPhrase);

    //     // KECEPATAN ANGIN
    //     console.log(data[i].Wind.Speed.Value + data[i].Wind.Speed.Unit);

    //     // RAIN PROBABILITY
    //     console.log(data[i].RainProbability + '%');
    //     console.log("END");
    // }
}