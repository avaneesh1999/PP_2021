let fs =require("fs");
function promisewalareadfile(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function cb(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });

         
    });

}

let frp=promisewalareadfile("f1.txt")
console.log(frp)
frp.then(function(data){
    console.log("data->" + data);
})
frp.catch(function(err){
    console.log("err->" + err)
})
console.log("afyter");