// let request =require("request");
// let cheerio=require("cheerio");
// console.log("Before");
// request("https://www.google.com",cb);
// function cb(error,response,html){
//     if(error){
//         console.log(err);
//     }else{
//         extractData(html);
//     }
// }
// function extractData(html){
//     let setTool =cheerio.load(html);
//     let ele =setTool("#SIvCob");



//     console.log(ele.html());
// }
// console.log("After");

let request = require("request");
let cheerio =require("cheerio");
console.log("Before");
request("https://www.google.com/",cb);

function cb(error,response,html){
    if(error){
        console.log(error);

    }else{
        extracthtml(html);

    }
}

function extracthtml(html){
    let selectortool =cheerio.load(html);
    let selectele =selectortool("#SIvCob");
    console.log(selectele.html());

}
console.log("After");