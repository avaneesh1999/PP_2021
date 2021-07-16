import React, { useEffect } from 'react'

console.log("7");
const Tracker = () => {
    
   console.log("6");
    const getcoviddata=async()=>{
        try{
            console.log("9");
            const res= await fetch("https://api.covid19india.org/data.json");
            const actualData = await res.json();
            console.log(actualData);

        }catch(err){
            console.log(err);
        }
    }
    console.log("7");

    useEffect(() =>{
        getcoviddata();
    },[]);
    
    return (
        <>
            <h1>live covid tracker</h1>
        </>
    )
}
export default Tracker


