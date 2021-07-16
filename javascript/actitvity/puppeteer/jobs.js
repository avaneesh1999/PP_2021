let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.monsterindia.com/",
    "https://in.indeed.com/","https://www.naukri.com/","https://www.freshersworld.com/"];
let pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        // let montserArr = await getListingFromMonster(links[0], browserInstance, pName);
        // console.table(montserArr);
        // let indeedArr =await getListingFromindeed(links[1],browserInstance,pName);
        // console.table(indeedArr);
        // let naukriArr =await getListingFromnNaukri(links[2],browserInstance,pName);
        // console.table(naukriArr);
        let fresherworldArr =await getListingFromnfresherworld(links[3],browserInstance,pName);
        console.table(fresherworldArr);
    } catch (err) {
        console.log(err);
    }
})();

async function getListingFromMonster(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type(".input.search-bar.home_ac", pName);
    await newPage.click("input[value='Search']")
    await newPage.waitForSelector("label[for='srp-filter-2']", { visible: true });
    await newPage.click("label[for='srp-filter-2']", { visible: true });
    await newPage.click("label[for='experienceRanges0']",{visible :true});
    await newPage.waitForNavigation()
    //
    await newPage.waitForSelector(".card-body.card-body-apply.pd10 .medium", { visible: true });
    await newPage.waitForSelector(".card-body.card-body-apply.pd10 .company-name a", { visible: true });
    await newPage.waitForSelector(".col-xxs-12.col-sm-5.text-ellipsis small[data-v-586a1812]", { visible: true });
    await newPage.waitForSelector(".exp.col-xxs-12.col-sm-3.text-ellipsis small[data-v-586a1812]", { visible: true });
    await newPage.waitForSelector(".package.col-xxs-12.col-sm-4.text-ellipsis small[data-v-586a1812]", { visible: true });
    await newPage.waitForSelector(".card-body.card-body-apply.pd10 .medium a", { visible: true });

    function consoleFn(Designationselec,companyselec,locationselec,expselec,ctcselec,linkselec) {
        let a= document.querySelectorAll(Designationselec);//".card-body.card-body-apply.pd10 .medium"
        let b = document.querySelectorAll(companyselec);//".card-body.card-body-apply.pd10 .company-name a"
        let c = document.querySelectorAll(locationselec);//".col-xxs-12.col-sm-5.text-ellipsis small[data-v-586a1812]"
        let d = document.querySelectorAll(expselec);//".exp.col-xxs-12.col-sm-3.text-ellipsis small[data-v-586a1812]"
        let e= document.querySelectorAll(ctcselec);//".package.col-xxs-12.col-sm-4.text-ellipsis small[data-v-586a1812]"
        let f= document.querySelectorAll(linkselec);//".card-body.card-body-apply.pd10 .medium a"

        let details = [];
        for (let i = 0; i < a.length; i++) {
            let designation = a[i].innerText;
            let company = b[i].innerText;
            let location= c[i].innerText;
            let exp = d[i].innerText;
            let ctc = e[i].innerText;
            let link = f[i].href;
            details.push({
                designation,
                company,
                location,
                exp,
                ctc,
                link
            })
        }
        
        return details;
    }
    return newPage.evaluate(consoleFn,
        ".card-body.card-body-apply.pd10 .medium",
        ".card-body.card-body-apply.pd10 .company-name a",".col-xxs-12.col-sm-5.text-ellipsis small[data-v-586a1812]",".exp.col-xxs-12.col-sm-3.text-ellipsis small[data-v-586a1812]",".package.col-xxs-12.col-sm-4.text-ellipsis small[data-v-586a1812]",".card-body.card-body-apply.pd10 .medium a");
}
async function getListingFromindeed(link, browserInstance, pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type("input[placeholder='Job title, keywords, or company']", pName);
    await newPage.click("button[type='submit']");
    await newPage.waitForSelector("button[aria-controls='filter-taxo2-menu']", { visible: true });
   
    // function consoleFn(priceSelector, pNameSelector) {
    //     let priceArr = document.querySelectorAll(priceSelector);
    //     let PName = document.querySelectorAll(pNameSelector);
    //     let details = [];
    //     for (let i = 0; i < 5; i++) {
    //         let price = priceArr[i].innerText;
    //         let Name = PName[i].innerText;
    //         details.push({
    //             price, Name
    //         })
    //     }
    //     return details;
    // }
    // return newPage.evaluate(consoleFn,
    //     "._30jeq3._1_WHN1",
    //     "._4rR01T");
    // //    ._4rR01T
    // // ._30jeq3._1_WHN1

}
async function getListingFromnNaukri(link,browserInstance,pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type("input[placeholder='Skills, Designations, Companies']",pName,{ delay: 200 });
    await newPage.keyboard.press("Enter",{ delay: 200 });
    await newPage.waitForSelector("div[style='left: calc(0% - 15px);'] span", { visible: true });
    await newPage.click("div[style='left: calc(0% - 15px);'] span");
    // function consoleFn(priceSelector, pNameSelector) {
    //     let priceArr = document.querySelectorAll(priceSelector);
    //     let PName = document.querySelectorAll(pNameSelector);
    //     let details = [];
    //     for (let i = 0; i < 5; i++) {
    //         let price = priceArr[i].innerText;
    //         let Name = PName[i].innerText;
    //         details.push({
    //             price, Name
    //         })
    //     }
    //     return details;
    // }
    // return newPage.evaluate(consoleFn,
    //     "._1kMS",
    //     ".UGUy");


}

async function getListingFromnfresherworld(link,browserInstance,pName) {
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector("input[name='search_Job_keyword']", { visible: true });
    await newPage.type("input[name='search_Job_keyword']",pName,{ delay: 200 });
    await newPage.click("button[name='btn_submit']");
    // function consoleFn(priceSelector, pNameSelector) {
    //     let priceArr = document.querySelectorAll(priceSelector);
    //     let PName = document.querySelectorAll(pNameSelector);
    //     let details = [];
    //     for (let i = 0; i < 5; i++) {
    //         let price = priceArr[i].innerText;
    //         let Name = PName[i].innerText;
    //         details.push({
    //             price, Name
    //         })
    //     }
    //     return details;
    // }
    // return newPage.evaluate(consoleFn,
    //     "._1kMS",
    //     ".UGUy");


}
