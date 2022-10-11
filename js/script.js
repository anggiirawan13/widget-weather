const apikey = 'ksbEcnVUyvsdQAqhfcDcjyGIWjudKOGK';


function startTime(GmtOffset) {
    var today = new Date();

    var wib = today.getTimezoneOffset() / 60;
    var noWib = GmtOffset;

    var h = today.getHours() + (wib + noWib);
    var m = today.getMinutes();
    var s = today.getSeconds();
    // m = checkTime(m);
    // s = checkTime(s);

if (h < 10) {
    h = '0' + h;
}

    document.getElementById('clock').innerHTML = h + ":" + m;
    // setTimeout(startTime, 1000);
}

function checkTime(i){
    if (i<10) {i="0" + i};
    return i;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const getCity = async () => {   
    const city = getParameterByName('q') == null ? 'jakarta' : getParameterByName('q').toLowerCase();

    const baseURI = 'http://dataservice.accuweather.com/locations/v1/cities/ID/search';
    const query = `?apikey=${apikey}&q=${city}`;

    const response = await fetch(baseURI + query);
    const data = await response.json();

    startTime(data[0].TimeZone.GmtOffset);

    document.getElementById('location').innerHTML = data[0].LocalizedName;

    await getDetailWeatherCityCurrent(data[0].Key, data[0].TimeZone.GmtOffset);
    await getDetailWeatherCityTo3Hours(data[0].Key, data[0].TimeZone.GmtOffset);
}

const getDetailWeatherCityCurrent = async (locationKey, GmtOffset) => {
    const baseURI = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    const query = `?apikey=${apikey}&details=true`;

    const response = await fetch(baseURI + query);
    const json = await response.json();
    const data = json[0];

    var dateNow = new Date(data.LocalObservationDateTime);
    var h = dateNow.getHours();
    var m = dateNow.getMinutes();
    document.getElementById('clock').innerHTML = h + ":" + m;

    // WAKTU SEKARANG
    console.log(startTime(GmtOffset));

    // SUHU SEKARANG
    console.log(Math.round(data.Temperature.Metric.Value) + data.Temperature.Metric.Unit);

    // UNITE TYPE
    console.log(data.Temperature.Metric.UnitType);

    // ICON
    console.log(data.WeatherIcon);

    // KETERANGAN AWAN
    console.log(data.WeatherText);

    // KECEPATAN ANGIN
    console.log(Math.round(data.Wind.Speed.Metric.Value) + data.Wind.Speed.Metric.Unit);

    // HUMIDITY
    console.log(data.RelativeHumidity + '%');
};

const getDetailWeatherCityTo3Hours = async (locationKey, GmtOffset) => {
    // const baseURI = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}`;
    // const query = `?apikey=${apikey}&details=true&metric=true`;

    // const response = await fetch(baseURI + query);
    // const data = await response.json();

    // for (i = 0; i < 3; i++) {
    //     console.log("START");
    //     // WAKTU SEKARANG
    //     console.log(new Date(data[i].DateTime).getHours());

    //     // SUHU SEKARANG
    //     console.log(Math.round(data[i].Temperature.Value) + data[i].Temperature.Unit);

    //     // UNITE TYPE
    //     console.log(data[i].Temperature.UnitType);

    //     // ICON
    //     console.log(data[i].WeatherIcon);

    //     // KETERANGAN AWAN
    //     console.log(data[i].IconPhrase);

    //     // KECEPATAN ANGIN
    //     console.log(Math.round(data[i].Wind.Speed.Value) + data[i].Wind.Speed.Unit);

    //     // HUMIDITY
    //     console.log(data[i].RelativeHumidity + '%');
    //     console.log("END");
    // }
}