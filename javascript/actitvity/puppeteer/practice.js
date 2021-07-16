let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in/", "https://www.flipkart.com/", "https://paytmmall.com/"];
let pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        await getListingFromAmazon(links[0], browserInstance, pName);
        await getListingFromFlipkart(links[1], browserInstance, pName);
        // await getListingFromPaytmMall(links[2], browserInstance, pName);

    } catch (err) {
        console.log(err);
    }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print 
async function getListingFromAmazon(link, browser, pName) {
    // const browser = await puppeteer.launch();     // run browser
    const page1 = await browser.newPage();        // open new tab
    await page1.goto(link);
    await page1.type("#twotabsearchtextbox", pName)
    await page1.click('#nav-search-submit-button')
    await page1.waitForNavigation();
    let productDetails = await page1.evaluate(function () {
        let product = {};
        let products = document.querySelectorAll(".s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20");
        var productDetails = []
        for (let i = 0; i < 5; i++) {
            product = {};
            product.name = products[i].querySelector('h2 .a-size-medium.a-color-base.a-text-normal').innerHTML;
            product.price = products[i].querySelector('.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20 .a-offscreen').innerHTML
            // console.log(name);
            productDetails.push(product)
        }
        return productDetails;
    })
    console.table(productDetails);
}

async function getListingFromFlipkart(link, browser, pName) {
    // const browser = await puppeteer.launch();     // run browser
    const page1 = await browser.newPage();        // open new tab
    await page1.goto(link);
    await page1.type("#container > div > div.1kfTjk > div._1rH5Jn > div._2Xfa2 > div._1cmsER > form > div > div > input", pName)
    const form = await page1.$('._2M8cLY.header-form-search');
    await form.evaluate(form => form.submit());
    page1.waitForNavigation()
    let productDetails = await page1.evaluate(function () {
        let product = {};
        let products = document.querySelectorAll("._13oc-S ._4rR01T");
        var productDetails = []
        for (let i = 0; i < 5; i++) {
            product = {};
            product.name = products[i].innerHTML;
            // product.price = products[i].querySelector('._30jeq3._1_WHN1').innerHTML
            // console.log(name);
            productDetails.push(product)
        }
        return productDetails;
    })
    console.table(productDetails);
}

async function getListingFromPaytmMall(link, browser, pName) {
    // const browser = await puppeteer.launch();     // run browser
    const page1 = await browser.newPage();        // open new tab
    await page1.goto(link);
    await page1.type("#twotabsearchtextbox", pName)
    await page1.click('#nav-search-submit-button')
    await page1.waitForNavigation();
    let productDetails = await page1.evaluate(function () {
        let product = {};
        let products = document.querySelectorAll(".s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20");
        var productDetails = []
        for (let i = 0; i < 5; i++) {
            product = {};
            product.name = products[i].querySelector('h2 .a-size-medium.a-color-base.a-text-normal').innerHTML;
            product.price = products[i].querySelector('.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20 .a-offscreen').innerHTML
            // console.log(name);
            productDetails.push(product)
        }
        return productDetails;
    })
    console.table(productDetails);
}