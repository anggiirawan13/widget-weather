const apikey = 'BsO0LRVAcYPIMAG0d1QpKxLLgKLbmFLH';


function startTime(GmtOffset) {
    var today = new Date();

    var wib = today.getTimezoneOffset() / 60;
    var noWib = GmtOffset;

    var h = today.getHours() + (wib + noWib);
    var m = today.getMinutes();
    var s = today.getSeconds();
    // m = checkTime(m);
    // s = checkTime(s);
    
    if (h > 12) {
        h -= 12;
    }
    
    if (h < 10) {
        h = '0' + h;
    }

    if (m < 10) {
        m = '0' + m;
    }
    
    var am_pm = h >= 12 ? " PM" : " AM";

    document.getElementById('clock').innerHTML = h + ":" + m + am_pm;
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
    const city = getParameterByName('q') == null ? 'kedoya selatan' : getParameterByName('q').toLowerCase();

    const baseURI = 'http://dataservice.accuweather.com/locations/v1/cities/ID/search';
    const query = `?apikey=${apikey}&q=${city}`;

    const response = await fetch(baseURI + query);
    const data = await response.json();
    // console.log(response);
    // console.log(data);
    startTime(data[0].TimeZone.GmtOffset);
    document.getElementById('location').innerHTML = data[0].LocalizedName;
    await getDetailWeatherCityCurrent(data[0].Key, data[0].TimeZone.GmtOffset);
    await getDetailWeatherCityTo3Hours(data[0].Key, data[0].TimeZone.GmtOffset);
}

const getCityDummy = async () => {
    const dummyData = `[
        {
            "Version": 1,
            "Key": "206225",
            "Type": "City",
            "Rank": 45,
            "LocalizedName": "Prabumulih",
            "EnglishName": "Prabumulih",
            "PrimaryPostalCode": "",
            "Region": {
                "ID": "ASI",
                "LocalizedName": "Asia",
                "EnglishName": "Asia"
            },
            "Country": {
                "ID": "ID",
                "LocalizedName": "Indonesia",
                "EnglishName": "Indonesia"
            },
            "AdministrativeArea": {
                "ID": "SS",
                "LocalizedName": "South Sumatra",
                "EnglishName": "South Sumatra",
                "Level": 1,
                "LocalizedType": "Province",
                "EnglishType": "Province",
                "CountryID": "ID"
            },
            "TimeZone": {
                "Code": "WIT",
                "Name": "Asia/Jakarta",
                "GmtOffset": 7.0,
                "IsDaylightSaving": false,
                "NextOffsetChange": null
            },
            "GeoPosition": {
                "Latitude": -3.433,
                "Longitude": 104.237,
                "Elevation": {
                    "Metric": {
                        "Value": 45.0,
                        "Unit": "m",
                        "UnitType": 5
                    },
                    "Imperial": {
                        "Value": 147.0,
                        "Unit": "ft",
                        "UnitType": 0
                    }
                }
            },
            "IsAlias": false,
            "SupplementalAdminAreas": [],
            "DataSets": [
                "AirQualityCurrentConditions",
                "AirQualityForecasts",
                "Alerts",
                "FutureRadar",
                "MinuteCast"
            ],
            "Details": {
                "Key": "206225",
                "StationCode": "IDPER1",
                "StationGmtOffset": 7.0,
                "BandMap": "ID",
                "Climo": "WIPP",
                "LocalRadar": "",
                "MediaRegion": null,
                "Metar": "WIPP",
                "NXMetro": "",
                "NXState": "",
                "Population": 161984,
                "PrimaryWarningCountyCode": "",
                "PrimaryWarningZoneCode": "",
                "Satellite": "MIDE",
                "Synoptic": "96221",
                "MarineStation": "",
                "MarineStationGMTOffset": null,
                "VideoCode": "",
                "LocationStem": "id/prabumulih/206225",
                "PartnerID": null,
                "Sources": [
                    {
                        "DataType": "AirQualityCurrentConditions",
                        "Source": "Plume Labs",
                        "SourceId": 63,
                        "PartnerSourceUrl": "https://air.plumelabs.com/air-quality-in-prabumulih-6QoN"
                    },
                    {
                        "DataType": "AirQualityForecasts",
                        "Source": "Plume Labs",
                        "SourceId": 63,
                        "PartnerSourceUrl": "https://air.plumelabs.com/air-quality-in-prabumulih-6QoN"
                    },
                    {
                        "DataType": "Alerts",
                        "Source": "Agency for Meteorology Climatology and Geophysics of Republic Indonesia",
                        "SourceId": 69
                    },
                    {
                        "DataType": "CurrentConditions",
                        "Source": "AccuWeather",
                        "SourceId": 1
                    },
                    {
                        "DataType": "DailyForecast",
                        "Source": "AccuWeather",
                        "SourceId": 1
                    },
                    {
                        "DataType": "FutureRadar",
                        "Source": "AccuWeather",
                        "SourceId": 1
                    },
                    {
                        "DataType": "Historical",
                        "Source": "AccuWeather",
                        "SourceId": 1
                    },
                    {
                        "DataType": "HourlyForecast",
                        "Source": "AccuWeather",
                        "SourceId": 1
                    },
                    {
                        "DataType": "MinuteCast",
                        "Source": "AccuWeather",
                        "SourceId": 1
                    }
                ],
                "CanonicalPostalCode": "",
                "CanonicalLocationKey": "206225"
            }
        }
    ]`
// console.log(dummyData);
const data = JSON.parse(dummyData);
// console.log(objDummy);
startTime(data[0].TimeZone.GmtOffset);
    document.getElementById('location').innerHTML = data[0].LocalizedName;
    await getDetailWeatherCityCurrent(data[0].Key, data[0].TimeZone.GmtOffset);
    await getDetailWeatherCityTo3Hours(data[0].Key, data[0].TimeZone.GmtOffset);
// document.getElementById('location').innerHTML = dummyData;
}

const getDetailWeatherCityCurrent = async (locationKey, GmtOffset) => {
    const baseURI = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    const query = `?apikey=${apikey}&details=true`;

    const response = await fetch(baseURI + query);
    const json = await response.json();
    const data = json[0];

    // let icon =`${data.WeatherIcon} %`;
    // document.getElementById('weather-icon').innerHTML =icon;

    let textweather = data.WeatherText;
    document.getElementById('weather-text').innerHTML = textweather;
    
    let humidity = data.RelativeHumidity + ' %';
    document.getElementById('humidity-condition').innerHTML = humidity;

    let wind = Math.round(data.Wind.Speed.Metric.Value) + ' ' + data.Wind.Speed.Metric.Unit;
    document.getElementById('wind-condition').innerHTML = wind;

    let thermometer =Math.round(data.Temperature.Metric.Value) + ' °' + data.Temperature.Metric.Unit;
    document.getElementById('thermometer-condition').innerHTML =thermometer;

    // WAKTU SEKARANG
    startTime(GmtOffset);

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
    const baseURI = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}`;
    const query = `?apikey=${apikey}&details=true&metric=true`;

    const response = await fetch(baseURI + query);
    const data = await response.json();

    // ISI ARRAY DIBAWAH SESUAI DENGAN ID DI HTML NYA
    const arrayHour = ['one-hour', 'two-hour', 'three-hour'];
    const arrayHourTemp = ['one-hour-temp', 'two-hour-temp', 'three-hour-temp'];

    for (i = 0; i < 3; i++) {
        let timeNext = new Date(data[i].DateTime).getHours();
        
        if (timeNext > 12) {
            timeNext -= 12;
        }

        let am_pm = timeNext >= 12 ? " PM" : " AM"
        document.getElementById(arrayHour[i]).innerHTML = timeNext + am_pm;

        let thermometer =Math.round(data[i].Temperature.Value) + ' °' + data[i].Temperature.Unit;
        document.getElementById(arrayHourTemp[i]).innerHTML = thermometer;
        

        console.log("START");
        // WAKTU SEKARANG
        console.log(new Date(data[i].DateTime).getHours());

        // SUHU SEKARANG
        console.log(Math.round(data[i].Temperature.Value) + data[i].Temperature.Unit);

        // UNITE TYPE
        console.log(data[i].Temperature.UnitType);

        // ICON
        console.log(data[i].WeatherIcon);

        // KETERANGAN AWAN
        console.log(data[i].IconPhrase);

        // KECEPATAN ANGIN
        console.log(Math.round(data[i].Wind.Speed.Value) + data[i].Wind.Speed.Unit);

        // HUMIDITY
        console.log(data[i].RelativeHumidity + '%');
        console.log("END");
    }
}