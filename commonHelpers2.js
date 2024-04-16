import"./assets/styles-06299f05.js";const n={searchForm:document.querySelector(".js-search-form"),list:document.querySelector(".js-list")};n.searchForm.addEventListener("submit",h);function h(t){t.preventDefault();const{city:r,days:a}=t.currentTarget.elements;i(r.value,a.value).then(e=>{n.list.innerHTML=l(e.forecast.forecastday)}).catch(e=>{console.log(e)})}function i(t,r){const a="http://api.weatherapi.com/v1",e="/forecast.json",c="cb71863de576474e981155338241604",o=new URLSearchParams({key:c,q:t,days:r,lang:"uk"});return fetch(`${a}${e}?${o}`).then(s=>{if(!s.ok)throw new Error(s.statusText);return s.json()})}function l(t){return t.map(({date:r,day:{avgtemp_c:a,condition:{icon:e,text:c}}})=>`<li class="weather-card">
        <img src="${e}" alt="${c}" />
        <h2 class="date">${r}</h2>
        <h3 class="weather-text">${c}</h3>
        <h3 class="temperature">${a} °C</h3>
      </li>`).join("")}
//# sourceMappingURL=commonHelpers2.js.map
