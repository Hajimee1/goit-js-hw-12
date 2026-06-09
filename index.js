import{r as e}from"./assets/rolldown-runtime-QTnfLwEv.js";import{n as t,r as n,t as r}from"./assets/vendor-CL5c66wW.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var i=e(t(),1),a=e(r(),1),o=document.querySelector(`.loader`),s=document.querySelector(`button`),c=document.querySelector(`.rep-btn`),l=document.querySelector(`.gallery`),u=document.querySelector(`input`);n.defaults.baseURL=`https://pixabay.com/api`;var d=`56102185-c22f62e167e3da8dca248fc51`,f=1,p=``,m=0;s.addEventListener(`click`,e=>{c.classList.add(`hidden`),e.preventDefault(),p!==u.value&&(l.innerHTML=``,p=u.value,_())}),c.addEventListener(`click`,()=>{f++,_()});var h=new i.default.default(`.gallery a`,{captionsData:`alt`,captionDelay:250}),g=(e,t)=>n.get(`/`,{params:{key:d,q:e,image_type:`photo`,orientation:`horizontal`,safesearch:!0,page:t,per_page:40}}).then(e=>e.data);async function _(){try{o.classList.remove(`hidden`);let e=await g(p,f),t=e.hits;if(m=e.totalHits,!t.length)throw Error(`Sorry, there are no images matching your search query. Please try again!`);c.classList.remove(`hidden`);let n=t.map(({webformatURL:e,largeImageURL:t,tags:n,likes:r,views:i,comments:a,downloads:o})=>`
<li class="gallery-item">
  <a href="${t}">
    <img src="${e}" alt="${n}" class="gallery-image">
  </a>

  <table class="info-table">
    <tr>
      <th>Likes</th>
      <th>Views</th>
      <th>Comments</th>
      <th>Downloads</th>
    </tr>
    <tr>
      <td>${r}</td>
      <td>${i}</td>
      <td>${a}</td>
      <td>${o}</td>
    </tr>
  </table>
</li>`).join(``);l.insertAdjacentHTML(`beforeend`,n),h.refresh();let r=document.querySelector(`.gallery-item`);if(r){let e=r.getBoundingClientRect().height;window.scrollBy({top:e*1.2,behavior:`smooth`})}f*40>m&&(c.classList.add(`hidden`),a.default.info({message:`We're sorry, but you've reached the end of search results`,position:`topRight`}))}catch(e){a.default.error({message:e.message,position:`topRight`})}finally{o.classList.add(`hidden`)}}
//# sourceMappingURL=index.js.map