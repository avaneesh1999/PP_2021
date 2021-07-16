let puppeteer = require("puppeteer");
let path = require("path");
let fs = require("fs");
let xlsx = require("xlsx");
let name ="movies"

let folderPath = path.join(__dirname, name);
    dirCreater(folderPath);
    let filePath = path.join(folderPath, name + ".xlsx");
    // [],[{},{}]
    
    function movieobj(arr){
        for(let i=0;i<arr.length;i++){
            makeexcel(arr[i]);
        }

    }
 
let links = ["https://www.hotstar.com/in",
    "https://www.amazon.in/"];
let pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let hotstarArr = await getListingFromhotstar(links[0], browserInstance, pName);
        //let youtubeArr = await getListingFromyoutube(links[2], browserInstance, pName);
        let amazonArr = await getListingFromamazon(links[1], browserInstance, pName);
        console.log(hotstarArr);
        await movieobj(hotstarArr)
        console.log(amazonArr);
        await movieobj(amazonArr);
         //console.table(youtubeArr);
    } catch (err) {
        console.log(err);
    }
})();
//input link
// output->top 10 bhotstar  movies name and link
async function getListingFromhotstar(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector("input[type='search']", { visible: true });
    await newPage.type("input[type='search']",pName,{ delay: 200 });
    await newPage.keyboard.press("Enter",{ delay: 200 });
    await newPage.waitForSelector(".content-title.ellipsise", { visible: true });
    await newPage.waitForSelector(".resClass .ripple.movie-card.normal a",{ visible: true });

    function consoleFn(priceSelector,pricelink) {
        let movieslink = document.querySelectorAll(priceSelector);
        let hlink =document.querySelectorAll(pricelink);
        let details = [];
        for (let i = 0; i < movieslink.length; i++) {
            let movie = movieslink[i].innerText;
            let link= hlink[i].href;
            details.push({
                movie ,link
            })
            

        }
        return details;
    }
    return newPage.evaluate(consoleFn,
        ".content-title.ellipsise",".resClass .ripple.movie-card.normal a");
}

//input link
// output->top 10 amazon  movies name and link

async function getListingFromamazon(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link, {
        waitUntil: "load",
        // Remove the timeout
        timeout: 0,
      });
    await newPage.waitForSelector("input[id='twotabsearchtextbox']", { visible: true });
    await newPage.type("input[id='twotabsearchtextbox']",pName,{ delay: 200 });
    await newPage.keyboard.press("Enter",{ delay: 200 });
    await newPage.waitForSelector(".a-size-base-plus.a-color-base.a-text-normal", { visible: true });
    await newPage.waitForSelector(".a-link-normal.a-text-normal", { visible: true });
    
    function consoleFn(priceSelector,plink) {
        let movieslink = document.querySelectorAll(priceSelector);
        let mlink =document.querySelectorAll(plink)
        let details = [];
        for (let i = 0; i < movieslink.length; i++) {
            let movie = movieslink[i].innerText;
            let link = mlink[i].href;
            details.push({
                movie,link
            })
            //makeexcel(printname,link,amazon)
        }
        return details;
    }
    return newPage.evaluate(consoleFn,
        ".a-size-base-plus.a-color-base.a-text-normal",".a-link-normal.a-text-normal");
    



    

}

// function to convert movies and link into excel
function makeexcel(matchobj){
     let content =excelReader(filePath,name);
     content.push(matchobj);
    excelWriter(filePath, content, name);


}

function excelReader(filePath, name) {
    if (!fs.existsSync(filePath)) {
        return [];
    } else {
        // workbook => excel
        let wt = xlsx.readFile(filePath);
        // csk -> msd
        // get data from workbook
        let excelData = wt.Sheets[name];
        // convert excel format to json => array of obj
        let ans = xlsx.utils.sheet_to_json(excelData);
        // console.log(ans);
        return ans;
    }
}
function excelWriter(filePath, json, name) {
    // console.log(xlsx.readFile(filePath));
    let newWB = xlsx.utils.book_new();
    // console.log(json);
    let newWS = xlsx.utils.json_to_sheet(json);
    // msd.xlsx-> msd
    //workbook name as param
    xlsx.utils.book_append_sheet(newWB, newWS, name);
    //   file => create , replace
    //    replace
    xlsx.writeFile(newWB, filePath);
}

function dirCreater(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath);
    }
}