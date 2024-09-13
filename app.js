const url = 'https://api.tomorrow.io/v4/weather/realtime?location=india&apikey=BikZ8ocSwCMLDgyA4YwrUjfAowjEV5MM'

const input = document.querySelector('input');
const button = document.querySelector('#btn');
const tempeeratureSpan = document.querySelector('#temperature');
const windSpan = document.querySelector('#wind');
const humiditySpan = document.querySelector('#humidity');
const rainSpan = document.querySelector('#rain');
const snowSpan = document.querySelector('#snow');
const cloudSpan = document.querySelector('#cloud');
const loadingSpinner = document.querySelector('#loading-spinner');




const fetchData = async () => {
    let loc = input.value;

    if (loc === '') {
        alert('Enter location first');
        input.style.border = '2px solid red';
        return; 
    } else {
        console.log(loc);
        input.style.border = '';
    }

    loadingSpinner.style.display = 'inline-block'; 

    var customUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${loc}&apikey=BikZ8ocSwCMLDgyA4YwrUjfAowjEV5MM`;

    try {
        let response = await fetch(customUrl);
        let jsonData = await response.json(); 
        console.log(jsonData); 


        const { humidity, temperature, windSpeed, rainIntensity, snowIntensity, cloudCover} = jsonData.data.values;

        tempeeratureSpan.innerText = temperature + 'c';

        windSpan.innerText = windSpeed + ' km/h ';

        humiditySpan.innerText = humidity + ' %';

        if (rainIntensity > 0) {
            rainSpan.innerText = rainIntensity + ' mm';
        }else{
            rainSpan.innerText = '0 mm';
        }

        if(snowIntensity > 0){
            snowSpan.innerText = snowIntensity + ' inch'
        }else{
            snowSpan.innerText = '0 inch';
        }

        if(cloudCover > 0){
            cloudSpan.innerText = cloudCover + ' %'
        }else{
            cloudSpan.innerText = '0 %';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        
    }finally{
        loadingSpinner.style.display = 'none'; 
    } 
    }



button.addEventListener('click' , fetchData);