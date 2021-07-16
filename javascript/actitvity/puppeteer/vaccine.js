let puppeteer = require("puppeteer");
let links = "https://www.cowin.gov.in/home";
let pincode=process.argv[2];
let age=process.argv[3];

//async function to notify

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let slots = await getlistofplaces(links, browserInstance,pincode,age);
        console.log(slots);
        
    } catch (err) {
        console.log(err);
    }
})();



//function to get the listing of Vaccine Available

async function getlistofplaces(link, browserInstance,pincode,age){
    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector("input[placeholder='Enter your PIN']", { visible: true });
    await newPage.type("input[placeholder='Enter your PIN']",pincode,{ delay: 200 });
    await newPage.keyboard.press("Enter",{ delay: 200 });
   
    if(age>=45){
        await newPage.click("label[for='flexRadioDefault3']");

    }else{

        await newPage.click("label[for='flexRadioDefault2']");
    }
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let cost="Free";

    function consoleFn(date,place,no,type,age,cost) {
        let p = document.querySelectorAll(place);
        let n= document.querySelectorAll(no);
        let t=document.querySelectorAll(type);
        let details = [];
            for (let i=0,j = 0;i < p.length && j<n.length; i++,j+=7) {
                if(n[j].innerText == "Booked"){
                        continue ;
                } 
            let Available_at = p[i].innerText;
            let No_of_Vaccines=n[j].innerText;
            let type_of_Vaccine=t[j].innerText;
            details.push({
                date,Available_at,No_of_Vaccines,type_of_Vaccine,age,cost
            })
            
        }

        
        return details;
    }
    return await newPage.evaluate(consoleFn,date,
        ".col-sm-12.col-md-12.col-lg-12 p",".vaccine-box.vaccine-box1.vaccine-padding a",".vaccine-box.vaccine-box1.vaccine-padding h5",age,cost);
}

