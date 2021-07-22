// // 1..LET VS VAR

// const { ConsoleMessage } = require("puppeteer");

// // var x="a";
// // var x="b";
// // console.log(x); //b

// // let x="a";
// // let x="b";
// // console.log(x); //Identifier 'x' has already been declared

// // console.log(x); //undefined
// // console.log(y);  //Cannot access 'y' before initialization
// // var x="10";
// // let y="10";

// // let printNumTwo;
// // var i;
// // for (let i = 0; i < 3; i++) {
// //   if (i === 2) {
// //     printNumTwo = function() {
// //       return i;
// //     };
// //   }
// // }
// // console.log(printNumTwo());
// // console.log(i);

// // function checkScope() {
// //     let i = 'function scope';
// //     if (true) {
// //       let i = 'block scope';
// //       console.log('Block scope i is: ', i);
// //     }
// //     console.log('Function scope i is: ', i);
// //     return i;
// //   }

// //  console.log(checkScope());

// // 2. CONST ----->>>>>

// // const a="cool";
// // const a="ann";
// // console.log(a);

// // function printManyTimes(str) {

// //     // Only change code below this line

// //     const sentence = str + " is cool!";

// //     for (let i = 0; i < str.length; i+=2) {
// //       console.log(sentence);
// //     }

// //     // Only change code above this line

// //   }

// // const a=[1,2,3,4]
// // for(let i=0;i<a.length;i++){
// //     console.table(a[i]);
// // }

// // // a[2]=8;
// // console.log(a[2]);

// // const s = [5, 6, 7];
// // // s = [1, 2, 3];
// // s[2] = 45;
// // console.log(s);

// // const s={
// //     name:"avaneesh",
// //     properties:"cool"
// // }

// // // Object.freeze(s);
// // s.name="Cool";
// // console.log(s);

// // 3. ARROW FUNCTIONS -------------->>>>>>>>>>>>>>>>>>>>

// // const square = function(){
// //      let a="me";
// //      return a;

// // }

// // console.log(square());

// // const square =(e) =>{
// //     let a=e*e;
// //     return a;

// // }

// // console.log(square(2));

// // const a=(name="cool")=>{
// //     return name;
// // }

// // console.log(a());

// // function howMany(...args) {
// //     return "You have passed " + args.length + " arguments.";
// // }
// // console.log(howMany(0, 1, 2));
// // console.log(howMany("string", null, [1, 2, 3], { }));

// // const arr = [6, 89, 3, 45];
// // const maximus = Math.max(...arr);
// // console.log(maximus);

// ///4.DESTRUCTING---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// // const HIGH_TEMPERATURES = {
// //     yesterday: 75,
// //     today: 77,
// //     tomorrow: 80
// //   };

// // const {today,tomorrow} = HIGH_TEMPERATURES;

// // console.log(today);
// // console.log(tomorrow);

// // const HIGH_TEMPERATURES = {
// //     yesterday: 75,
// //     today: 77,
// //     tomorrow: 80
// //   };

// //   // Only change code below this line

// //   let {today: highToday,tomorrow:highTomorrow}=HIGH_TEMPERATURES;

// // //   highToday=99;
// // //   highTomorrow=98;

// //   console.log(highToday);
// //   console.log(highTomorrow);

// // const arr=[1,2,3,4,4,55,6,7,7,89];

// // let[...n]=arr;
// // console.log(...n);

// // const source = [1,2,3,4,5,6,7,8,9,10];
// // function removeFirstTwo(list) {
// //    let ans=list.slice(0,2);
// //   return ans;
// // }
// // const arr = removeFirstTwo(source);
// // console.log(arr)

// // const stats = {
// //     max: 56.78,
// //     standard_deviation: 4.34,
// //     median: 34.54,
// //     mode: 23.87,
// //     min: -0.75,
// //     average: 35.85
// // };

// //   // Only change code below this line
// // const half = ({max,min}) =>{
// //    let ans =(max+min)/2.0;
// //    return ans;
// // };

// // console.log(half(stats));

// //5. SPREAD --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>

// // 5.1 SREAD IN ARRAYS---------->>>>

// // let arr=[1,2,3];
// // // let narr=[];

// // // for(let i=0;i<arr.length;i++){
// // //     narr[i]=arr[i];
// // // }
// // // narr=arr;
// // // narr[0]=1000;
// // // console.log(arr);
// // // console.log(narr);

// //  let narr=[...arr];

// //  console.log(narr);

// // 5.1 SREAD IN  NESTED objects---------->>>>

// // let ans ={
// //     name:'Avaneesh',
// //     colour:{
// //         Red:1,
// //         Blue:2
// //     }
// // }

// // let res={...ans};
// // ans.red=2;
// // console.log(ans);
// // console.log(res);

// // let avenger={
// //     name:'Captain America',
// //     power:{
// //         hammer:'Thor',
// //         instru:{
// //             hands:'2',
// //             legs:'3'

// //         }
// //     }
// // }

// // let ans={...avenger,power:{...avenger.power,instru:{...avenger.power.instru}}};

// // ans.power.instru.hands='19'

// // console.log(avenger);
// // console.log(ans);

// // function a(){
// //     console.log("Hello world");
// // }

// // let ans=()=>{
// //     setTimeout(a,1000); //where a is a function
// // }
// // ans();

// // function a(){
// //     // 'use strict'
// //     console.log(this);

// // }
// // a();

// // const result = {
// //     success: ["max-length", "no-amd", "prefer-arrow-functions"],
// //     failure: ["no-var", "var-on-top", "linebreak"],
// //     skipped: ["no-extra-semi", "no-dup-keys"]
// // };
// // function makeList(arr) {
// //     // "use strict";
// //     // // change code below this line
// //     const failureItems = [];
// //     for (let i = 0; i < arr.length; i++) {
// //       failureItems.push(`<li class="text-warning">${arr[i]}</li>`);
// //     }
// //     // change code above this line
// //     return failureItems;
// // }

// // const failuresList = makeList(result.failure);

// // console.log(failuresList);

// // function fn(){

// //     function abc(){
// //         console.log(this);
// //         console.log(this.person);
// //     }
// //     let ret=abc.bind(this);

// //     return ret;
// // }

// // let obj={
// //     person:'Tushar',
// //     function:fn

// // }

// // let returnValue =obj.function();
// // returnValue();

// // function name(){
// //     console.log(this);
// //     // let abc =()=>{
// //     //     console.log(this);

// //     // }

// //     function abc(){
// //         console.log(this);
// //     }
// //     abc();
// // }

// // name();

// // function Pet(name) {
// //     this.name = name;
// //     this.getName = () => this.name;
// // }

// // const cat = new Pet('Fluffy');
// // console.log(cat.getName()); // What is logged?
// // const { getName } = cat;
// // console.log(getName()); // What is logged?

// // const object = {
// //     message: 'Hello, World!',
// //     logMessage() {
// //     console.log(this.message); // What is logged?
// // }
// // };
// // setTimeout(object.logMessage, 1000);

// // const object = {
// //     message: 'Hello, World!'
// // };
// // function logMessage() {
// //     console.log(this.message); // "Hello, World!"
// // }

// // const object = {
// //     who: 'World',
// //     greet() {
// //     return `Hello, ${this.who}!`;
// //     },
// //     farewell: () => {
// //     return `Goodbye, ${this.who}!`;
// //     }
// // };
// // console.log(object.greet()); // What is logged?
// // console.log(object.farewell()); // What is logged?

// const fetch = require("node-fetch");
// const getcoviddata=async()=>{
//     try{
//         const res= await fetch("https://api.covid19india.org/data.json");
//         const actualData = await res.json();
//         console.log(actualData);

//     }catch(err){
//         console.log(err);
//     }
// }

// getcoviddata();

// let greentea='cupoggreentea';
// let blacktea='cupofblacktea';

// let abc=(no,class) => {
//     let a=[];

//     for(let i=0;i<no;i++){
//         a.push(class);

//     }
//     return a;
// };

// console.log(abc(6,greentea));

//HOISTING

// a=10;
// console.log(a);
// var a;

// function abc()
// {   a=10;
//     console.log(a);

//     const a;
// }

// abc();

// var a=2;
// var b="2";

// console.log(a==b);// it compares only values
// console.log(a===b);// uit compares value as well as type

// setTimeout(abc,1000);

// function abc(){
//     console.log("hiinode Avaneesh");
// }

//CLOSURES

// function x(){
//     var a=10;
//     function y(){
//         console.log(a);;
//     }
//     y();
// }
// x();

// var x=10;
// var x=20;
// console.log(x);

// let a=10;
// let a=12;
// console.log(a);

// setTimeout(()=>{
//   console.log(x);
//   console.log(y);
// },3000);

// var x = 2;
// let y = 12;

// function func2(){
//     for(var i = 0; i < 3; i++){
//       setTimeout(()=> console.log(i),2000);
//   }

//   }

//   func2();

// (function(){
//     setTimeout(()=> console.log(1),2000);
//     console.log(2);
//     setTimeout(()=> console.log(3),0);
//     console.log(4);
//   })();

// let x = {},y = { name: "Ronny" },z = { name: "John" };

// x[y] = { name: "Vivek" };
// x[z] = { name: "Akki" };

// console.log(x[y]);

// function runFunc(){
//     console.log("1" + 1);
//     console.log("A" - 1);
//     console.log(2 + "-2" + "2");
//     console.log("Hello" - "World" + 78);
//     console.log("Hello"+ "78");
//   }
  
//   runFunc();

// let a = 0;
// let b = false;
// console.log((a == b));
// console.log((a === b));

// var x = 23;

// (function(){
//   var x = 43;
//   (function random(){
//     x++;
//     console.log(x);
//     var x = 21;
//   })();
// })();

// let hero = {
//     powerLevel: 99,
//     getPower(){
//       return this.powerLevel;
//     }
//   }
  
//   let getPower = hero.getPower;
  
//   let hero2 = {powerLevel:42};
//   console.log(getPower());
//   console.log(getPower.apply(hero2));
  
  
  
//   // Code 2
  
//   const a = function(){
//     console.log(this);
  
//     const b = {
//       func1: function(){
//         console.log(this);
//       }  
//     }
  
//     const c = {
//       func2: ()=>{
//         console.log(this);
//       }
//     }
  
//     b.func1();
//     c.func2();
//   }
  
//   a();
  
  
  
//   // Code 3
  
//   const b = {
//     name:"Vivek",
//     f: function(){
//       var self = this;
//       console.log(this.name);
//       (function(){
//         console.log(this.name);
//         console.log(self.name);
//       })();
//     }
//   }
  
//   b.f();
  

// function binarysearch(arr,l,r,x){
//     let mid=l+Math.floor((r-l/2));

//     if(arr[mid]==x){
//         return x;
//     }

//     if(arr[mid]>x){
//          return binarysearch(arr,l.mid-1,x);
//     }

//     return binarysearch(arr,mid+1,r,x);

// }

// // 

// let arr = [ 2, 3, 4, 10, 40 ];
// let x = 10;
// let n = arr.length
// let result = binarysearch(arr, 0, n - 1, x);
// console.log(result);



// function binarySearch(arr, l, r, x){
//     if (r >= l) {
//         let mid = l + Math.floor((r - l) / 2);
  
//         // If the element is present at the middle
//         // itself
//         if (arr[mid] == x)
//             return mid;
  
//         // If element is smaller than mid, then
//         // it can only be present in left subarray
//         if (arr[mid] > x)
//             return binarySearch(arr, l, mid - 1, x);
  
//         // Else the element can only be present
//         // in right subarray
//         return binarySearch(arr, mid + 1, r, x);
//     }
  
//     // We reach here when element is not
//     // present in array
//     return -1;
// }
  
// let arr = [ 2, 3, 4, 10, 40 ];
// let x = 10;
// let n = arr.length
// let result = binarySearch(arr, 0, n - 1, x);
// // console.log(result);

// function longest_common_starting_substring(arr1){
//     var arr= arr1.concat().sort(),
//     a1= arr[0], a2= arr[arr.length-1], L= a1.length, i= 0;
//     //console.log(arr);
//     while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
//     return a1.substring(0, i);
//     }
    
// console.log(longest_common_starting_substring(['go', 'google'])); 

// const users= [
//     {
//         firstName: 'compass',
//         LocX: 35,
//         age: 312
//     },
//     {
//         firstName: 'another',
//         LocX: 52,
//         age: 32
//     }
// ];



// const ans=users.reduce(function(acc,curr){
//     if(curr.age>30){
//         acc.push(curr.firstName)
//         return acc;
//     }
//     return acc;
// },[]);

// console.log(ans);