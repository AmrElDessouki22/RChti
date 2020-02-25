const ip = require('ip')
const fetch = require('node-fetch');
 async function getbot(){
    try{
        
       const response =  await fetch('https://www.iplocate.io/api/lookup/8.8.8.8')
       const jsonresponse = await response.json()
       
       const lat = await jsonresponse.latitude
       const long = await jsonresponse.longitude
       console.log(lat.toString()+long.toString());
       
      
       
    }catch(e)
    {
        console.log(e.message);
        
    }
}



getbot()

