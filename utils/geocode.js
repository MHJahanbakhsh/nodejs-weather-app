//Geocoding:convert string address to latitude/longtitude (rewritten with callback)
const axios = require('axios');

async function geocode(address,callback){
    try{const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`,{
        params:{
            access_token:'pk.eyJ1IjoiaG9zczdlaW4iLCJhIjoiY2wxdXptYmZjMTlwMzNicXMwbjh1ODl3NCJ9.bfzPXCU-G_Aq4Try0Y0glA',
            limit:'1',
        }
    })
    if(response.data.features.length===0){
        callback('no city found according to your search prameters');
                 
    }else{callback(undefined,{location:response.data.features[0].place_name,
                            longtitude: response.data.features[0].center[0],
                            latitude: response.data.features[0].center[1]})}

    }catch{callback('some low level shit happened.probably network problem')}
    
}

//we have more control over response and errors via callback function(do whatever we want)

/*
geocode('london',(err,res)=>{
    console.log('ERROR: ',err);
    console.log("RESPONSE: ",res)
    })


 geocode('washington',(err,res)=>{
        console.log('ERROR: ',err);
        console.log("RESPONSE: ",res)
        })
*/

        module.exports = geocode
