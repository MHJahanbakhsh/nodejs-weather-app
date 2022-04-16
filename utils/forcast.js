const axios = require('axios')


const forcast = (coordinates,callback)=>{
    axios.get('http://api.weatherstack.com/current',{
    params:{
        access_key:'75eabb2336e0c10a53ba7a347abbbdbc',
        query:coordinates,
        units:'f'
    }
}).then(response => {
    if(response.data.error){ //handling high level errors. for example server responded 200 status but there is no data for that city
        callback(`------ ${response.data.error.info}--------`)
    }else{
        callback(undefined,`it is currently ${response.data.current.temperature} out. it feels like ${response.data.current.feelslike} out in ${response.data.location.region}`)
    }
    
}).catch(error => {  // this is usually for low-level errors such as network problems
    callback('some low level shit happend');
});
}


// forcast('51.5072,0.1276',(err,res)=>{
//     console.log('ERROR: ', err);
//     console.log('RESPONSE: ', res)
// })


module.exports = forcast