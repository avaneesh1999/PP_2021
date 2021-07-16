let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extracthtml(html);
    }
}
 
function extracthtml(html){
    let selTool = cheerio.load(html);
    let batsman = selTool(".table.batsman") ;
    let  teamName = selTool(".Collapsible  h5.header-title.label ") ;
    // take an array for storing team names 
     
        

  
   // console.log(batsman.lenght) ;
//    let tableHtml = ""
//    for (let i = 0; i < batsman.length; i++) {
//     tableHtml += selTool(batsman[i]).html();
//    }

for(let  i  = 0 ; i < batsman.length ; i++){
    let batsmanNameElem = selTool(batsman[i]).find("tbody tr .batsman-cell a") ;
    for(let j  =0 ; j < batsmanNameElem.length ; j++){
        let link = selTool(batsmanNameElem[j]).attr("href") ;
        let name = selTool(batsmanNameElem[j]).text() ;
           //console.log(link) ;
            printBirthdar(link , name) ;
    }
    console.log("`````````") ;
}
}

function printBirthdar(link ,name){
    request(link , cback) ;
    function cback(error ,response , html){
    if(error){
        console.log("error")
    }else{
        extractBirthaday(html , name) ;
    }
}
}
function extractBirthaday(html , name){
    let selTool = cheerio.load(html) ; 
    let birthdayElement = selTool(".ciPlayerinformationtxt span") ;
    let birthday = selTool(birthdayElement[1]).text() ;
    console.log(name + " was born on " + birthday) ;

}



console.log("After")