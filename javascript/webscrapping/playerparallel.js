 
//console.log("before");
function extractData(html){
    let selTool = cheerio.load(html);
    let anchor =selTool("a[data-hover='Scorecard']");
    for(let i=0;i<anchor.length;i++){
        let link =selTool(anchor[i]).attr("href");
        let fulllLink="https://www.espncricinfo.com" + link;

    extractplayerName(fulllLink);
    }
}
function extractplayerName(fulllLink){
    request(fulllLink,cb);
    function cb(err,res,html){
        if(err){
            console.log(err);
        }else{
            printplayername(html);
        }
    }
}

function printplayername(html){
    let selTool =cheerio.load(html);
    let playerName =selTool(".best-player-name");
    console.log(playerName.text());
}

console.log("after");
    
