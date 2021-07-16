let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.flipkart.com/";
request(url, cb);
console.log("before")
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        //console.log(html);
        extracthtml(html);
    }
}

function extracthtml(html){
    let seltool=cheerio.load(html);
    let pageload =seltool("._37M3Pb .eFQ30H a");
    //console.log(pageload);
    let link =seltool(pageload[0]).attr("href");
    console.log(link);
    // let newurl = url+link;
    // request(newurl, cb1);
    // //console.log("before")
    // function cb1(err, response, html1) {
    //   if (err) {
    //     console.log(err);
    //    } else {
    //     //console.log(html);
    //     extracthtml1(html1);
    //    }
    // }

    // function extracthtml1(html1){
    //     let seltool1=cheerio.load(html1);
    //     let pageload =seltool1("._37M3Pb .eFQ30H a");
         
     }

console.log("After");