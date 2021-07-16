let puppeteer = require("puppeteer");
let fs = require("fs");
let path = require("path");
let xlsx = require("xlsx");

let folderPath = path.join(__dirname, "Author Song");
dirCreater(folderPath);
// create folder
function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) == false) {
    fs.mkdirSync(folderPath);
  }
}
let songname = "Songs";
let filePath = path.join(folderPath, songname + ".xlsx");

function arrayobject(myonject) {
  for (let i = 0; i < myonject.length; i++) {
    excelProcess(myonject[i]);
  }
}

function excelProcess(matchobj) {
  let content = excelReader(filePath, songname);
  content.push(matchobj);
  excelWriter(filePath, content, songname);
}

// excel Reader
function excelReader(filePath, songname) {
  if (!fs.existsSync(filePath)) {
    return [];
  } else {
    // workbook => excel
    let wt = xlsx.readFile(filePath);
    // csk -> msd
    // get data from workbook
    let excelData = wt.Sheets[songname];
    // convert excel format to json => array of obj
    let ans = xlsx.utils.sheet_to_json(excelData);
    // console.log(ans);
    return ans;
  }
}
// excel writer
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

let links = [
  "https://www.jiosaavn.com/",
  "https://wynk.in/",
  "https://gaana.com/",
];
let pName = process.argv[2];

console.log("Before");
(async function () {
  try {
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let savanArr = await getListingFromSavan(links[0], browserInstance, pName);

    let wynakArr = await getListingFromWynak(links[1], browserInstance, pName);
    let ganaArr = await getListingFromGana(links[2], browserInstance, pName);
    await arrayobject(savanArr);
    await arrayobject(wynakArr);
    await arrayobject(ganaArr);
    console.table(savanArr);
    // console.log(savanArr);
    console.table(wynakArr);
    console.table(ganaArr);
  } catch (err) {
    console.log(err);
  }
})();

//jioSavan
async function getListingFromSavan(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  await newTab.type("input[type='text']", pName, { delay: 400 });
  await newTab.keyboard.press("Enter");
  await newTab.waitForSelector(
    ".o-flag.o-flag--action.o-flag--stretch.o-flag--mini h4 a",
    { visible: true }
  );
  return newTab.evaluate(
    consoleFn,
    ".o-flag.o-flag--action.o-flag--stretch.o-flag--mini h4 a"
  );
}
function consoleFn(songnameSelector) {
  let songArr = document.querySelectorAll(songnameSelector);
  //let PName = document.querySelectorAll(pNameSelector);
  let details = [];
  for (let i = 0; i < 10; i++) {
    let song = songArr[i].innerText.trim();
    let link = songArr[i].href;
    details.push({
      song,
      link,
    });
    //newTab.evaluate(excelProcess,song, link);
  }
  return details;
}

// wynak music
async function getListingFromWynak(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  await newTab.type("#searchinput", pName, { delay: 400 });
  await newTab.keyboard.press("Enter");
  await newTab.waitForSelector(".defaultBg.border-radius-10.rounded-circle", {
    visible: true,
  });
  await newTab.click(".defaultBg.border-radius-10.rounded-circle");
  await newTab.waitForSelector(
    ".dark-text-color.w-100.float-left.text-truncate",
    { visible: true }
  );

  return newTab.evaluate(
    consoleFn1,
    ".dark-text-color.w-100.float-left.text-truncate"
  );
}
function consoleFn1(songnameSelector) {
  let songArr = document.querySelectorAll(songnameSelector);
  //let PName = document.querySelectorAll(pNameSelector);
  let details = [];
  for (let i = 0; i < 10; i++) {
    let song = songArr[i].innerText;
    let link = songArr[i].href;
    details.push({
      song,
      link,
    });
    //excelProcess(song, link);
  }

  return details;
}
// gana
async function getListingFromGana(link, browserInstance, pName) {
  let newTab = await browserInstance.newPage();
  await newTab.goto(link);
  await newTab.type("#sb", pName, { delay: 400 });
  await newTab.keyboard.press("Enter");
  await newTab.waitForSelector(".imghover.not_premium .img ", {
    visible: true,
  });
  await newTab.click(".imghover.not_premium .img ");
  await newTab.waitForSelector(".playlist_thumb_det .sng_c", { visible: true });

  return newTab.evaluate(consoleFn2, ".playlist_thumb_det .sng_c");
}
function consoleFn2(songnameSelector) {
  let songArr = document.querySelectorAll(songnameSelector);
  //let PName = document.querySelectorAll(pNameSelector);
  let details = [];
  for (let i = 0; i < 10; i++) {
    let song = songArr[i].textContent;
    let link = songArr[i].href;
    details.push({
      song,
      link,
    });
    //excelProcess(song, link);
  }
  return details;
}