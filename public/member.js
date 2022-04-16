

function login_popup() {
  let login_btn = document.querySelector("p#popup_btn");
  login_btn.addEventListener('click', () => {
    document.querySelector('#dialog').style.display = 'block';
    document.querySelector(".login_card").style.display = 'block';
    document.querySelector("#login_email").value = '';
    document.querySelector("#login_password").value = '';
    document.querySelector('.login_status').textContent = '';
  })
}
login_popup()

function register_popup() {
  let go_register = document.querySelector(".go_register");
  go_register.addEventListener('click', () => {
    document.querySelector(".register_card").style.display = 'block';
    document.querySelector(".login_card").style.display = 'none';
    document.querySelector('.register_status').textContent = '';
    document.querySelector("#name").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#password").value = '';
    document.querySelector('.login_status').textContent = '';
  })
}
register_popup()

function go_booking() {
  const booking_btn = document.querySelector('#booking_btn');
  booking_btn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/api/user')
      .then((res) => {
        return res.json();
      }).then((data) => {
        if (data['data'] == null) {
          document.querySelector('#dialog').style.display = 'block';
          document.querySelector(".login_card").style.display = 'block';
          document.querySelector("#login_email").value = '';
          document.querySelector("#login_password").value = '';
          document.querySelector('.login_status').textContent = '';;

        } else {
          window.location.href = "/booking"

        }
      })
  })
}
go_booking()


let go_login = document.querySelector('.go_login');
go_login.addEventListener('click', () => {
  document.querySelector(".login_card").style.display = 'block';
  document.querySelector(".register_card").style.display = 'none';
  document.querySelector("#login_email").value = '';
  document.querySelector("#login_password").value = '';
  document.querySelector('.login_status').textContent = '';
})

function close_window() {
  let close_btn = document.querySelectorAll(".close_icon")
  close_btn.forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector(".login_card").style.display = 'none';
      document.querySelector(".register_card").style.display = 'none';
      document.querySelector('#dialog').style.display = 'none';
      document.querySelector('.input_field').value = '';
    })
  })
}
close_window()


//登入
let submit_btn = document.querySelector('.login_btn');
submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  let input_email = document.getElementById('login_email').value;
  let input_password = document.getElementById('login_password').value;
  fetch('/api/user', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": input_email,
      "password": input_password
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    let login_status = document.querySelector('.login_status');
    if (!data['ok']) {
      login_status.textContent = '登入失敗，請檢查Email及密碼是否正確'
      login_status.style.color = 'blue';
    } else {
      document.querySelector(".login_card").style.display = 'none';
      document.querySelector('#logout_btn').style.display = 'block';
      document.querySelector('#popup_btn').style.display = 'none';
      document.querySelector('#dialog').style.display = 'none';
      console.log('登入成功')
    }
  })
})
//註冊
let register_btn = document.querySelector('.register_btn');
register_btn.addEventListener('click', (e) => {
  e.preventDefault();
  let input_name = document.getElementById('name').value;
  let input_email = document.getElementById('email').value;
  let input_password = document.getElementById('password').value;
  fetch('/api/user', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "name": input_name,
      "email": input_email,
      "password": input_password
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    let register_status = document.querySelector('.register_status');
    if (!data['ok']) {
      register_status.textContent = data['message'];
      register_status.style.color = 'blue';
      document.querySelector("#name").value = '';
      document.querySelector("#email").value = '';
      document.querySelector("#password").value = '';
    } else {
      register_status.textContent = '註冊成功';
      register_status.style.color = 'green';
    }
  })
})

//檢查登入狀態
window.onload = () => {
  fetch('/api/user')
    .then((res) => {
      return res.json();
    }).then((data) => {
      if (data['data'] == null) {
        document.querySelector('#popup_btn').style.display = 'block';
      } else {
        document.querySelector('#popup_btn').style.display = 'none';
        document.querySelector('#logout_btn').style.display = 'block';
      }
    })
}

//登出
let logout = document.querySelector('#logout_btn');
logout.addEventListener('click', () => {
  fetch('/api/user', {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  }).then((data) => {
    document.querySelector('#dialog').style.display = 'block';
    document.querySelector('#popup_btn').style.display = 'block';
    document.querySelector('#logout_btn').style.display = 'none';
    document.querySelector(".login_card").style.display = 'block';
    document.querySelector("#login_email").value = '';
    document.querySelector("#login_password").value = '';
  })
})
