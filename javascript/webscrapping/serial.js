let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        //console.log(html);
        extractData(html);
    }
}
//console.log("before");
function extractData(html){
    let selTool = cheerio.load(html);
    let linksarr=[];
    let anchor =selTool("a[data-hover='Scorecard']");
    for(let i=0;i<anchor.length;i++){
        let link =selTool(anchor[i]).attr("href");
        let fulllLink="https://www.espncricinfo.com" + link;
        linksarr.push(fulllLink);
    }

    extractplayerNameserially(linksarr,0);
   

    //xtractplayerName(fulllLink);
}
function extractplayerNameserially(linksArr,n){
    if(n==linksArr.length){
        return;
    }
    request(linksArr[n], cb);
    function cb(err, response, html) {
       if (err) {
        console.log(err);
       } else {
        //console.log(html);
        printplayername(html);
        extractplayerNameserially(linksArr,n+1);
    }
}
}

function printplayername(html){
    let selTool =cheerio.load(html);
    let playerName =selTool(".best-player-name");
    console.log(playerName.text());
}

console.log("after");
    
