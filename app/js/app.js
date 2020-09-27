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
                // outputCountry.innerText = data.location.country;
                outputRegion.innerText = data.location.region;
                outputCity.innerText = data.location.city + ',';
                outputPostcode.innerText = data.location.postalCode;
                outputTimezone.innerText = data.location.timezone;
                outputIsp.innerText = data.isp;


                var map = L.map('map').setView([data.location.lat, data.location.lng], 13);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 28,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoibWF0dHNrIiwiYSI6ImNrZWd3YXRyazBrcnIzMHFxM2NzYnhjazkifQ.tCSKEBGV8JMh7ElHG-arRg'
                }).addTo(map);

                // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                //     tileSize: 512,
                //     zoomOffset: -1
                // }).addTo(map);

                L.marker([data.location.lat, data.location.lng]).addTo(map)
                    .openPopup();



            } else {
                error.innerHTML = 'Error: That IP is not valid.' + ' <a href="" onClick="window.location.reload();">Click here</a> ' + 'to refresh the page and try again.';
            }
        }
        request.send()
    }
}
button.addEventListener('click', handleClick)
