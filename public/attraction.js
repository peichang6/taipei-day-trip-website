
let url = location.pathname;
if (url.indexOf('/') != -1) {
  let getSearch = url.split("/");
  id = getSearch[2];
}
var xhr = new XMLHttpRequest();
xhr.open('GET', `/api/attraction/${id}`, true);
xhr.onload = () => {
  data = JSON.parse(xhr.response)['data'];
  let pic = data.images;
  let attraction_title = data.name;
  let attraction_category = data.category;
  let attraction_mrt = data.mrt;
  let attraction_desc = data.description;
  let attraction_address = data.address;
  let attraction_transportation = data.transport;


  let element = document.getElementById('content');
  element.innerHTML =
    `<div class="thumbnails">
        <div class='arrow_area'>
          <div class='arrow_area_left'>
            <div id="arrow_left" class='arrow_symbol'></div>
          </div>
          <div class='arrow_area_right'>
            <div id="arrow_right" class='arrow_symbol'></div>
          </div> 
        </div>
        <img id="carousel" src="${pic[0]}" alt="">
        <div id="dot_area">
        </div>   
      </div>
      <div class="attraction_info">
        <div class="attraction_title">${attraction_title}</div>
        <div class="attraction_subinfo">
          <div class="attraction_category">${attraction_category}</div>
          <a> at </a>
          <div class="attraction_mrt">${attraction_mrt}</div>
        </div>
        <div class="order">
          <div>
            <h4>訂購導覽行程</h4>
          </div>
          <div>
            <p>以此景點為中心的一日行程，帶您探索城市角落故事</p>
          </div>
          <div class="order_date">選擇日期：<input type="date"></div>
          <div class="order_time">選擇時間：
            <label>
              <input class="radio_input" type="radio" name="time" value="新台幣 2000 元" checked/>
              <div class=radio_text>上半天</div>
            </label>
            <label>
              <input class="radio_input" type="radio" name="time"  value="新台幣 2500 元"/>
              <div class=radio_text>下半天</div>
            </label>
          </div>
          <div class="order_price">導覽費用：<a id="result">新台幣 2000 元</a></div>
          <button class="btn_order">開始預訂行程</button>
        </div>
      </div>`

  const img = document.getElementById('carousel');
  const arrow_left = document.getElementById('arrow_left');
  const arrow_right = document.getElementById('arrow_right');
  const dot_area = document.getElementById('dot_area');
  for (i = 0; i < pic.length; i++) {
    const dot = document.createElement('div');
    dot.setAttribute('id', 'carousel_dot');
    dot_area.appendChild(dot);
  }
  dot_area.children[0].className = 'selected';
  img.src = pic[0];
  let position = 0;

  const moveRight = () => {
    if (position >= pic.length - 1) {
      position = 0
      img.src = pic[position];
      dot_area.children[position].className = 'selected'
      dot_area.children[pic.length - 1].className = '';
      return;
    }
    img.src = pic[position + 1];
    dot_area.children[position + 1].className = 'selected';
    dot_area.children[position].className = '';
    position++;
  }

  const moveLeft = () => {
    if (position < 1) {
      position = pic.length - 1;
      img.src = pic[position];
      dot_area.children[position].className = 'selected';
      dot_area.children[0].className = '';
      return;
    }
    img.src = pic[position - 1];
    dot_area.children[position - 1].className = 'selected';
    dot_area.children[position].className = '';
    position--;
  }
  arrow_left.addEventListener("click", moveLeft);
  arrow_right.addEventListener("click", moveRight);




  let element_desc = document.getElementById('desc_wrap');
  element_desc.innerHTML = `<div class="attraction_desc">${attraction_desc
    }</div>
    <div class="attraction_address">景點地址：
      <div class="api_address">${attraction_address}</div>
    </div>
    <div class="attraction_transportation">交通方式：
      <div class="api_transportation">${attraction_transportation}</div>
    </div>`

  let input = document.querySelector('input[name="time"]');
  let result = document.querySelector('#result');
  if (input != null) {
    document.querySelectorAll('input[name="time"]').forEach((radio) => {
      radio.addEventListener("click", function (event) {
        let item = event.target.value;
        result.textContent = item;
      });
    });
  }
}
xhr.send();





