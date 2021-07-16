let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.amazon.in/";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        //console.log(html);
        extracthtml(html);
    }
}

function extracthtml(html){
    let selTool = cheerio.load(html);
    let pageload  = selTool(".nav-progressive-content .nav-a");
    let link = selTool(pageload[1]).attr("href");
    //console.log(pageload);

    //console.log(link);
    let newurl =url+link;
    //console.log(newurl);
    request(newurl, cb1);
    function cb1(err, response, html1) {
       if (err) {
        console.log(err);
       } else {
        //console.log(html);
        nextpage(html1);
       }

    function nextpage(html1){
        let selTool1=cheerio.load(html1);
        let pageload1=selTool1(".a-size-mini.a-color-base.apb-line-clamp-3.a-text-normal");
        for(let i=0;i<pageload1.length;i++){
             let name =selTool1(pageload1[i]).text();
             console.log(name);
        }
        

    }   
}
    
}

console.log("yes");