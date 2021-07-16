let puppeteer = require("puppeteer");
//let { password, email } = require("../../../secrets");
//let { codes } = require("./code");
let fs = require("fs");
console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized",]
        });
        let newTab = await browserInstance.newPage();
        await newTab.goto("https://www.google.com/");
        
        
        // await newTab.type("#input-2", "1999@Avaneeshsingh", { delay: 200 });
        await newTab.waitForSelector(".gb_4.gb_5.gb_ae.gb_4c",{visible:true});
        await newTab.click(".gb_4.gb_5.gb_ae.gb_4c");
        await newTab.waitForSelector("input[aria-label='Email or phone']",{visible:true});
        await newTab.type("input[aria-label='Email or phone']", "avaneeshsingh1999@gmail.com", { delay: 200 });
        await newTab.keyboard.press("Enter",{ delay: 200 });
        // await newTab.waitForSelector(".daaWTb .VfPpkd-vQzf8d",{visible:true});
        // await newTab.click(".daaWTb .VfPpkd-vQzf8d");
       

        // await waitAndClick(".card-content h3[title='Interview Preparation Kit']", newTab);
        // await waitAndClick("a[data-attr1='warmup']", newTab);
        // let url = newTab.url();
        // for (let i = 0; i < codes.length; i++) {
        //     await questionSolver(url, codes[i].soln, codes[i].qName, newTab);
        // }
    } catch (err) {
        console.log(err);
    }
})();
async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    // we didn't wait this promise because we want  the calling perspn to await this promise based async function 
    let selectorClickPromise = newTab.click(selector);
    return selectorClickPromise;
}