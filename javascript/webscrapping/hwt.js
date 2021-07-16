// let request = require("request");
// let cheerio = require("cheerio");
// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
// request(url, cb);
// function cb(err, response, html) {
//     if (err) {
//         console.log(err);
//     } else {
//         // console.log(html);
//         extractData(html);
//     }
// }
// function extractData(html) {
//     let selTool = cheerio.load(html);
//     // get the bowling table of both the innings
//     let bothBowlerTable = selTool(".table.bowler");
//     //node let batsmenTable =selTool(".table.batsman");
    
//     // console.log(bothBowlerTable.length);
//     // let tableHtml = "";
//     // for (let i = 0; i < bothBowlerTable.length; i++) {
//     //     tableHtml += selTool(bothBowlerTable[i]).html();
//     // }
    

//     let hname="";
//     let hwickets=0;
//     for (let i = 0; i < bothBowlerTable.length; i++) {
//         // tableHtml += selTool(bothBowlerTable[i]).html();
//         let playersRow = selTool(bothBowlerTable[i]).find("tbody tr");
//         for (let j = 0; j < playersRow.length; j++) {
//             let allcolOfPlayer = selTool(playersRow[j]).find("td");
//             let name = selTool(allcolOfPlayer[0]).text();
//             let wicket = selTool(allcolOfPlayer[4]).text();
//             console.log("name", name, "wicket", wicket);
//             if(wicket>=hwickets){
//                 hwickets=wicket;
//                 hname=name;
//             }
//         }
//         console.log("`````````````````````````````````````");
//         console.log(hname,hwickets);
//     }

    
//     // for (let i = 0; i < batsmenTable.length; i++) {
//     //     //nodetableHtml += selTool(bothBowlerTable[i]).html();
//     //     let batsmenRow = selTool(batsmenTable[i]).find("tbody tr");
//     //     for (let j = 0; j < batsmenRow.length; j++) {
//     //         let allcolOfbatsmen = selTool(batsmenRow[j]).find("td");
//     //         let name = selTool(allcolOfbatsmen[0]).text();
//     //         //let wicket = selTool(allcolOfbatsmen[4]).text();
//     //         console.log(name);
            
//     //     }
        
//     // }


//     // console.log(tableHtml);
//     // get the names and wickets of every player

// }

let request =require("request");
let cheerio =require("cheerio");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        extractData(html);
        //console.log(html);
    }
}

function extractData(html){
    let selTool =cheerio.load(html);
    //get table
    let bowletable=selTool(".table.bowler");
    let stringhtml="";
    for(let i=0;i<bowletable.length;i++){
        stringhtml+=selTool(bowletable[i]).html();
    }
    console.log(stringhtml);
    //get bowler name
   }    //compare bowler name
console.log("After");