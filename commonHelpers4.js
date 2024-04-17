import"./assets/styles-b02b054e.js";const o={container:document.querySelector(".js-movie-list"),guard:document.querySelector(".js-guard")},r={poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s",titleNotFound:"Title not found",releaseDate:"XXXX-XX-XX",voteAverage:"XX.XX"};let c=1;const l={rootMargin:"200px"},i=new IntersectionObserver(p,l);function a(e="1"){const s=new URLSearchParams({page:e,api_key:"e7c82be7fbcb90103af6d6e6a6ca5896"});return fetch(`https://api.themoviedb.org/3/trending/movie/week?${s}`).then(t=>t.json())}function u(e){return e.map(({title:s,release_date:t,vote_average:g,poster_path:n})=>`<li>
          <img src="${n?"https://image.tmdb.org/t/p/w500"+n:r.poster}" alt="${s||r.titleNotFound}" />
          <div>
            <h2>${s||r.titleNotFound}</h2>
            <p>Release Date: ${t||r.releaseDate}</p>
            <p>Vote Average: ${g||r.voteAverage}</p>
          </div>
        </li>`).join("")}a().then(e=>{if("success"in e&&!e.success)throw new Error(e.status_message);o.container.insertAdjacentHTML("beforeend",u(e.results)),e.page<e.total_pages&&i.observe(o.guard)}).catch(e=>{console.log(e)});function p(e){e.forEach(s=>{s.isIntersecting&&(c+=1,a(c).then(t=>{if("success"in t&&!t.success)throw new Error(t.status_message);o.container.insertAdjacentHTML("beforeend",u(t.results)),t.page>=t.total_pages&&i.unobserve(o.guard)}).catch(t=>{console.log(t)}))})}
//# sourceMappingURL=commonHelpers4.js.map
