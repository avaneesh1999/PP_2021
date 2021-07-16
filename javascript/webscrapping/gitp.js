let request = require("request");
let cheerio = require("cheerio");
let url = "https://github.com/topics";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        //console.log(html);
        extractData(html);
    }
}

console.log("Before");

function extractData(html){
   let seltool =cheerio.load(html);
   let pageload=seltool(".col-12.col-sm-6.col-md-4.mb-4 a");
   for(let i=0;i<pageload.length;i++){
       let nurl =seltool(pageload[i]).attr("href");
       let link="https://github.com" + nurl;
       //console.log(link);
       request(link,cb);
       function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            //console.log(html);
            extractissues(html);
        }

        function extractissues(html){
            let selTool1 =cheerio.load(html)
            let pageload=selTool1(".h1-mktg");
            let repolinks=selTool1("a.text-bold");
            console.log(pageload.text());

            for(let i=0;i<8;i++){
                let repos=selTool1(repolinks[i]).attr("href");
                console.log(repos);

            }


        }


    }
    

      
   }
}

console.log("After");