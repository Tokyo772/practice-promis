import"./assets/styles-06299f05.js";import{b as c}from"./assets/vendor-9b35bc79.js";const r={spinBtn:document.querySelector(".js-start"),container:document.querySelector(".js-container")};r.spinBtn.addEventListener("click",a);function a(){const o=[...r.container.children].map(e=>i());Promise.allSettled(o).then(e=>{e.forEach((n,t)=>{r.container.children[t].textContent="",setTimeout(()=>{r.container.children[t].textContent=n.value||n.reason,t===e.length-1&&c.create(`<h1>${s?"Winner":"Loser"}</h1>`).show()},1e3*(t+1))});const s=e.every(n=>n.status==="fulfilled")||e.every(n=>n.status==="rejected")})}function i(){return new Promise((o,e)=>{Math.random()>.5?o("🤩"):e("👺")})}
//# sourceMappingURL=commonHelpers.js.map
