// arr=[
//     { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
//     { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
//    ];

// let ans =[{
//           name:arr.name,
//           avgRainfall:console.log(rainDance(arr.rainfall))
// }] 

//  function rainDance(arr){
    
//     for(let i=0;i<arr.size;i++){
//           avg +=arr[i];
//      }

//     ans =avg/arr.length;
//     return ans;

//  } 
 
//  console.log(ans);
// //console.log(rainDance(arr)); 
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

console.log(dec2bin(45));