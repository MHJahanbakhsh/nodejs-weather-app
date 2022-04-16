const input = document.querySelector('input')
const form = document.querySelector('form')
const cityOrError = document.getElementById('city-or-error')
const weatherDesc = document.getElementById('weather')


const sumbitHandler = (e)=>{
    e.preventDefault()
    console.log('form submited')
    cityOrError.textContent ='Loading...'
    weatherDesc.textContent =''
    forcast(input.value)
}
form.addEventListener('submit',sumbitHandler)

function forcast(location){ fetch(`http://api.weatherstack.com/current?query=${location}&access_key=75eabb2336e0c10a53ba7a347abbbdbc`).then(res=>res.json()).catch(err=>console.log('somthing happend.probably network problem!!'))
.then(res=>{if(res.error){
    cityOrError.textContent = 'no city found.try another search'
    
    
}else{
    console.log(res.current)
    cityOrError.textContent = res.request.query
    weatherDesc.textContent = res.current.weather_descriptions[0]
}}
)}