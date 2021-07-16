//THEORY

//serial .js 
// deadlock occurs

// let fs=require("fs");
// let arr=["../f1.txt","../f2.txt","../f3.txt"]
// console.log("before");
// for(let i=0;i<arr.length;){
//     fs.readFile(arr[i],function cb(err,data){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(data);
//             i++;
//         }
        

//   });
// }
// console.log("After");


//code snippets:-

function fname(name){
    console.log("name"+ name);
    return function lname(){
        console.log("name is this");
    }
}

let bb=fname();//return function is catched by this instance
bb();