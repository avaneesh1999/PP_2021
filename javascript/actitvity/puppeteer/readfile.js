let fs =require("fs");
//console.log("before");
//callback
//asyncFn(data,cb)

fs.readFile("f1.txt",function cb(err,data){
    if(err){
       console.log(err);
    }else{
       console.log("data->",data)
    }
})
//console.log("After");
console.log("before");
let token = fs.promise.readFile("f11.txt");
console.log(token);
//consume
token
     .then()