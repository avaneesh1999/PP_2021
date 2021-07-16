let puppeteer = require("puppeteer");
let path = require("path");
let fs = require("fs");
//const { table, log } = require("console");
let xlsx = require("xlsx");
let name = "GEEKSFORGEEKS";

let folderPath = path.join(__dirname, name);
dirCreater(folderPath);
let filePath = path.join(folderPath, name + ".xlsx");
// [],[{},{}]

function movieobj(arr) {
  for (let i = 0; i < arr.length; i++) {
    makeexcel(arr[i]);
  }
}

let links = "https://practice.geeksforgeeks.org/home/";

console.log("Before");
(async function () {
  try {
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let gfg = await getListingFromgfg(links, browserInstance);

    for (let i = 0; i < 5; i++) {
      let newTab = await browserInstance.newPage();
      //most importat wait for navigation
      await newTab.goto(gfg[i], {
        waitUntil: "load",
        // Remove the timeout
        timeout: 0,
      });
      //await newTab.waitForNavigation();
      newTab.waitForSelector(
        "span[style='display:block;font-size: 20px !important']",
        {
          visible: true,
        }
      );
      newTab.waitForSelector(
        "a[style='position: absolute;top: 0;left: 0;height: 100%;width: 100%;z-index:1;pointer:cursor;']",
        {
          visible: true,
        }
      );
      let questionsArr = await newTab.evaluate(consoleFN, "");
      console.table(questionsArr);
      await movieobj(questionsArr);
      // await newTab.close()
    }
  } catch (err) {
    console.log(err);
  }
})();

function consoleFN() {
  let arr = [];
  let ques = document.querySelectorAll(
    "span[style='display:block;font-size: 20px !important']"
  );
  let links = document.querySelectorAll(
    "a[style='position: absolute;top: 0;left: 0;height: 100%;width: 100%;z-index:1;pointer:cursor;']"
  );
  for (let j = 0; j < ques.length; j++) {
    arr.push({
      QuestionStatement: ques[j].innerText,
      Link: links[j].href,
    });
  }
  return arr;
}

//input link
// output->top 10 bhotstar  movies name and link
async function getListingFromgfg(link, browserInstance) {
  let newPage = await browserInstance.newPage();
  await newPage.goto(link);
  await newPage.waitForSelector("a[aria-label='dismiss cookie message']", {
    visible: true,
  });
  await newPage.click("a[aria-label='dismiss cookie message']");
  await newPage.waitForSelector(
    ".col-sm-12 .col-xs-12.col-sm-6.col-md-3.itemInnerDiv a"
  );
  function consoleFn(link) {
    let clink = document.querySelectorAll(link);
    let details = [];
    for (let i = 0; i < clink.length; i++) {
      let link = clink[i].href;
      details.push(link);
    }
    return details;
  }

  return newPage.evaluate(
    consoleFn,
    ".col-sm-12 .col-xs-12.col-sm-6.col-md-3.itemInnerDiv a"
  );
}

// async function getListingFromcom(newPage) {
//     await newPage.waitForSelector(
//         "span[style='display:block;font-size: 20px !important']",
//         { visible: true }
//     );
//     await newPage.waitForSelector(
//         "a[style='position: absolute;top: 0;left: 0;height: 100%;width: 100%;z-index:1;pointer:cursor;']",
//         { visible: true }
//     );
//     function consoleFn(question, link) {
//         let aquestion = document.querySelectorAll(question);
//         let clink = document.querySelectorAll(link);
//         let details = [];
//         for (let i = 0; i < clink.length; i++) {
//             let cquestion = aquestion[i].innerText;
//             let link = clink[i].href;
//             details.push({
//                 cquestion,
//                 link,
//             });
//         }
//         return details;
//     }
//     return newPage.evaluate(
//         consoleFn,
//         "span[style='display:block;font-size: 20px !important']",
//         "a[style='position: absolute;top: 0;left: 0;height: 100%;width: 100%;z-index:1;pointer:cursor;']"
//     );
// }

function makeexcel(matchobj) {
  let content = excelReader(filePath, name);
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
