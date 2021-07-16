// 
let arr=[10,20,30,40,50,17,11,23];

function add(storage,ith){
    return storage+ith;
}

function product(storage,ith){
    return storage*ith;
}

function myreduce(arr,cb){
    let storage=arr[0];
    for(let i=1;i<arr.length;i++){
        storage=cb(storage,arr[i]);
    }
    return storage;
}

console.log(myreduce(arr,add));
console.log(myreduce(arr,product));