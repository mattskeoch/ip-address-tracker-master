const ip = document.querySelector('#inputIp');
const outputIp = document.querySelector('#outputIp');
const outputCity = document.querySelector('#outputCity');
const outputRegion = document.querySelector('#outputRegion');
const outputPostcode = document.querySelector('#outputPostcode');
const outputCountry = document.querySelector('#outputCountry');
const outputTimezone = document.querySelector('#outputTimezone');
const outputIsp = document.querySelector('#outputIsp');
const button = document.querySelector('#button');
const error = document.querySelector('#error');

const handleClick = () => {
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("inputIp").value;

    if (inputVal !== '') {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://geo.ipify.org/api/v1?apiKey=at_nEDNv9PIlC0USe4HEfnikoJOhs27a&ipAddress=' + inputVal, true)
        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
                // ip.innerText = data.ip;     
                outputIp.innerText = data.ip;
                outputCountry.innerText = data.location.country;
                outputRegion.innerText = data.location.region;
                outputCity.innerText = data.location.city;
                outputPostcode.innerText = data.location.postalCode;
                outputTimezone.innerText = data.location.timezone;
                outputIsp.innerText = data.isp;
            } else {
                outputIsp.innerText = 'ERROR!';
            }
        }
        request.send()
    }
}
button.addEventListener('click', handleClick)
