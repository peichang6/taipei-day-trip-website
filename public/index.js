let nextPage;
let observer;

function lazy_loading() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };
  observer = new IntersectionObserver(callback, options);
  const target = document.querySelector("footer")
  observer.observe(target);
}
lazy_loading();

function callback(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    else load_more();
  })
}

let currentpage = 0;
let do_search = false;
let keyword;
async function load_more() {
  let response;
  if (!do_search) {
    response = await fetch(`/api/attractions?page=${currentpage}`);
  } else {
    response = await fetch(`/api/attractions?page=${currentpage}&keyword=${keyword}`);
  }
  const result = await response.json();
  data = result.data;
  nextPage = result.nextPage;
  console.log(result)

  if (!data && do_search) {
    document.getElementById("content").innerHTML = `<h1>請重新輸入</h1>`;
    return;
  }
  get_data(data);

  if (nextPage !== null) {
    currentpage++;
  } else {
    observer.unobserve(document.querySelector("footer"));
  }
}


function get_data(data) {
  for (i in data) {
    let attraction_title = data[i].name
    let mrt = data[i].mrt
    let category = data[i].category
    let pic = data[i].images[0]

    let element = document.getElementById("content");
    element.innerHTML += `<div class="attraction_card">
        <img class="thumbnails" src="${pic}">
        <div class="attraction_title">${attraction_title}</div>
        <div class="attraction_subinfo">
          <div class="attraction_mrt">${mrt}</div>
          <div class="attraction_category">${category}</div>
        </div>
      </div>`
  }
}

const btn = document.getElementsByClassName("button")[0];
btn.addEventListener('click', (e) => {
  e.preventDefault();
  currentpage = 0;
  document.getElementById("content").innerHTML = "";
  do_search = true;

  keyword = document.getElementsByName('search_field')[0].value

  observer.unobserve(document.querySelector("footer"));
  lazy_loading();
})


