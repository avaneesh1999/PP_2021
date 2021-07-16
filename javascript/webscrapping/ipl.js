let fs = require("fs");
let path = require("path");
let cheerio = require("cheerio");
let request = require("request");
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//TODO create main folder with name "ipl 2020"
var folderName = "ipl_2020";
function dirCreator(name) {
  let folderpath = path.join(__dirname, name);
  if (fs.existsSync(folderpath) == false) {
    fs.mkdirSync(folderpath);
  }
}
dirCreator(folderName);



//todo fetch Team name from url and create folder in main folder 

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log("error");
    } else {
        viewAllResult(html);
    }
}

//todo get viewresult link
function viewAllResult(html) {
    let selTool = cheerio.load(html);
    let viewResult = selTool(".label.blue-text.blue-on-hover");
    let totalMatchResultLink = selTool(viewResult[0]).attr("href");
    let fullMatchesLink = "https://www.espncricinfo.com" + totalMatchResultLink;
    //console.log( fullMatchesLink);
    results(fullMatchesLink);
  }
  //
  function results(fullMatchesLink) {
    request(fullMatchesLink, cb);
    function cb(error, response, html) {
      if (error) {
        console.log("error");
      } else {
        scoreCard(html);
      }
    }
  }
  //todo get all scorecard link 
  //todo store in array
  function scoreCard(html) {
    let selTool = cheerio.load(html);
    let noOfScorecard = selTool("a[data-hover='Scorecard']");
   // console.log(noOfScorecard.length);
    let scorecardArr = [];
    for (let i = 0; i < noOfScorecard.length; i++) {
        let scorecardLink = selTool(noOfScorecard[i]).attr("href");
        let fullScorecardLink = "https://www.espncricinfo.com" + scorecardLink ;
         scorecardArr.push(fullScorecardLink);
    // console.log(scorecardLink);
      }
      //console.log(scorecardArr);
        fullScorecard(scorecardArr , 0);
}
  
//todo goto fullscorecard in serial wise (RECURSION) 
//todo goto every match scorecard 
function fullScorecard(scorecardArr ,n) {
    if (scorecardArr.length == n) {
        return;
    }
    request(scorecardArr[n], cb1);
    function cb1(error, response, html) {
        if (error) {
            console.log("error");
        } else {
            matchScorecard(html);
            fullScorecard(scorecardArr, n + 1);
        }
    }
}

//todo  visit every march scorecard 
function matchScorecard(html) {
    let selTool = cheerio.load(html);
    var teamNameArr = selTool(".teams .name");
    let batsmanbody = selTool(".table.batsman tbody");
    for (let i = teamNameArr.length - 2,j = 0; i < teamNameArr.length , j < 2; i++ ,j++){
        var teamName = selTool(teamNameArr[i]).text();
        //invoke to teamdirCreater
        teamdirCreator(teamName);
        console.log(teamName);
        //
        let batsmanRow = selTool(batsmanbody[j]).find("tr");
        //console.log((batsmanRow.length));
        batsmanScorecard(batsmanRow, teamName ,html); 
    }

}

// todo create rvery team folder 
function teamdirCreator(teamName) {
    let folderpath = path.join(__dirname,folderName, teamName);
    if (fs.existsSync(folderpath) == false) {
      fs.mkdirSync(folderpath);
    }
}
  
// todo get the batsman attributes likre name ,run ,six ,four ....
function batsmanScorecard(batsmanRow, teamName, html) {
    let selTool = cheerio.load(html);

    
    for (let i = 0; i < batsmanRow.length - 1; i += 2){
        let rowtable = selTool(batsmanRow[i]).find("td");
        //todo invoke json file creater of batsman name 
        let batsmanName = selTool(rowtable[0]).text();
        jsonfileCreator(teamName, batsmanName);
        //todo async function 
      let filePath = path.join(__dirname, folderName, teamName, batsmanName + ".json");
      (async function () {
        try {
          const fileContents = await readFileAsync(filePath);

          if (fileContents.length == 0) {
            let fileData = [];
            let runs = selTool(rowtable[2]).text();
            let balls = selTool(rowtable[3]).text();
            let fours = selTool(rowtable[5]).text();
            let sixes = selTool(rowtable[6]).text();
            let strikerate = selTool(rowtable[7]).text();
            let description = selTool(".match-info.match-info-MATCH .description").text().split(",");
            let venue = description[1].trim();
            let date = description[2].trim();
            let result = selTool(".match-info.match-info-MATCH .status-text").text().trim();
        
            fileData.push({
              Name: batsmanName,
              Runs: runs,
              Balls: balls,
              Fours: fours,
              Sixes: sixes,
              Sr: strikerate,
              Venue: venue,
              Date: date,
              Result: result
              //,Opponent : opponent
            });
  
            
            await writeFileAsync(filePath, JSON.stringify(fileData));
            
          } else {
            const fileData = JSON.parse(fileContents);
          
            let runs = selTool(rowtable[2]).text();
            let balls = selTool(rowtable[3]).text();
            let fours = selTool(rowtable[5]).text();
            let sixes = selTool(rowtable[6]).text();
            let strikerate = selTool(rowtable[7]).text();
            let description = selTool(".match-info.match-info-MATCH .description").text().split(",");
            let venue = description[1].trim();
            let date = description[2].trim();
            let result = selTool(".match-info.match-info-MATCH .status-text").text().trim();
      
            fileData.push({
              Name: batsmanName,
              Runs: runs,
              Balls: balls,
              Fours: fours,
              Sixes: sixes,
              Sr: strikerate,
              Venue: venue,
              Date: date,
              Result: result
              //,Opponent : opponent
            });

          
            await writeFileAsync(filePath, JSON.stringify(fileData));
          }
    
        } catch (err) {
          console.log(`Failed because: {err}!`)
        }
      })();

    }
}

 

//todo create batsman name json file 
function jsonfileCreator(teamName, batsmanName) {
    let filePath = path.join(__dirname, folderName, teamName, batsmanName + ".json");
    if (fs.existsSync(filePath) == false) {
        fs.openSync(filePath, "w");
    }
}
  
