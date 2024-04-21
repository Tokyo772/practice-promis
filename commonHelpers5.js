import"./assets/styles-b02b054e.js";import{a}from"./assets/vendor-cce83868.js";console.log("before");async function e(){return await a.get("https://restcountries.com/v3.1/name/Ukraine")}e().then(o=>{console.log(o.data[0].capital[0])}).catch(o=>console.log("dsads"));console.log("after");
//# sourceMappingURL=commonHelpers5.js.map
