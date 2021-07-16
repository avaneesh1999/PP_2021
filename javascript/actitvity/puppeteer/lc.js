let puppeteer = require("puppeteer");
let path = require("path");
let fs = require("fs");
let xlsx = require("xlsx");

let name ="leetcode"
let folderPath = path.join(__dirname, name);
    dirCreater(folderPath);
    let filePath = path.join(folderPath, name + ".xlsx");
    // [],[{},{}]
    
    function quesobj(arr){
        for(let i=0;i<arr.length;i++){
            makeexcel(arr[i]);
        }

    }
 
let links = "https://leetcode.com/problemset/all/";

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let leetcode = await getListingFromlc(links, browserInstance);
        console.log(leetcode);
        await quesobj(leetcode);;
    } catch (err) {
        console.log(err);
    }
})();

async function getListingFromlc(link, browserInstance) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector(".form-control.list-search-bar", { visible: true });
    await newPage.type(".form-control.list-search-bar", "Array", { delay: 200 });
    await newPage.waitForSelector("td[label='Title']", { visible: true });
    //await newPage.waitForSelector("td[label='Difficulty']",{ visible: true })
    await newPage.waitForSelector("td[label='Title'] a", { visible: true });
    
    function consoleFn(priceSelector,plink) {
        let question = document.querySelectorAll(priceSelector);
        //let type =document.querySelectorAll(difficulty)
        let link =document.querySelectorAll(plink)
        let details = [];
       //let ans=[];
        for (let i = 0; i < question.length; i++) {
            let questionName = question[i].innerText;
            //let level =type[i].innerText
            let qlink = link[i].href;
            details.push({
                questionName,qlink 
            })
            // ans.push({
            //     type
            // })
            //makeexcel(printname,link,amazon)
        }
        return details;
    }
    return newPage.evaluate(consoleFn,
        "td[label='Title']","td[label='Difficulty']","td[label='Title'] a");
    



    

}

function makeexcel(quesobj){
    let content =excelReader(filePath,name);
    content.push(quesobj);
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
