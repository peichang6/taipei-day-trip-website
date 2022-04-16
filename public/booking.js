// 確認使用者是否登入
window.onload = () => {
  fetch('/api/user')
    .then((res) => {
      return res.json();
    }).then((data) => {
      if (data['data'] == null) {
        window.location.href = "/";
      } else {
        document.querySelector('#popup_btn').style.display = 'none';
        document.querySelector('#logout_btn').style.display = 'block';
        let username = data['data']['name'];
        let email = data['data']['email'];
        document.querySelector('.username').textContent = username;
        document.querySelector('#form_name').value = username;
        document.querySelector('#form_email').value = email;
      }
    })
}

// 點擊預定行程

let booking_btn = document.querySelector('#booking_btn');
booking_btn.addEventListener('click', () => {
  window.location.href = "/booking"
})


//取得訂單資料
fetch('/api/booking')
  .then((res) => {
    return res.json()
  }).then((data) => {
    if (data["data"] == null) {
      document.querySelector('.content_wrap').innerHTML = '';
      document.querySelector('.no_order_msg').style.display = 'block';
      document.querySelector('.footer').style.height = '80%';
    } else {
      let attraction_img = data['data']['attraction']['image']
      let attraction_name = data['data']['attraction']['name']
      let address = data['data']['attraction']['address']
      let date = data['data']['date']
      let time = data['data']['time']
      let price = data['data']['price']
      document.querySelector('.att_img').src = attraction_img;
      document.querySelector('.attraction_detail_name').textContent = '台北一日遊：' + attraction_name;
      document.querySelector('.attraction_detail_date').textContent = date;
      document.querySelector('.attraction_detail_time').textContent = time;
      document.querySelector('.attraction_detail_cost').textContent = '新台幣 ' + price + ' 元';
      document.querySelector('.attraction_detail_address').textContent = address;
      document.querySelector('.price_ntd').textContent = '新台幣 ' + price + ' 元';
    }

  })

//刪除預定資料
document.querySelector(".delete").addEventListener("click", () => {
  fetch('/api/booking', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  window.location.href = "/booking"
})  
