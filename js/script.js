let url = 'http://localhost:3001/users'
let data = []
function react() {
  axios.get(url)
    .then(res => {
      if(res.status === 201 || res.status === 200) {
        data = res.data
        reload(data)
      }
    })
    .catch(err => console.log('err'))
}

react()

let countainer = document.querySelector('.countainer')
let inp = document.querySelector('.inp')
let background_bg = document.querySelector('.background_bg')
let modal_bg = document.querySelector('.modal_bg')
let form = document.forms.task
let open_btn = document.querySelector('.open_btn')
let modal_form_add_bg = document.querySelector('.modal_form_add_bg')
let modal_add_bg = document.querySelector('.modal_add_bg')


let modal_airlanes = document.querySelector('.modal_airlanes')
let modal_airlanes_bg = document.querySelector('.modal_airlanes_bg')
let modal_airlanes_text = document.querySelector('.modal_airlanes_text')
let modal_airlanes_text2 = document.querySelector('.modal_airlanes_text2')
let modal_airlanes_text3 = document.querySelector('.modal_airlanes_text3')
let modal_airlanes_text4 = document.querySelector('.modal_airlanes_text4')
let close_btn = document.querySelector('.close_btn')

let select_option = document.querySelector('.select_option')
let select = document.querySelector('select')

let filter_img1 = document.querySelector('.filter_img1')
let filter_img2 = document.querySelector('.filter_img2')

let inp_select = document.querySelector('.inp_select')
let form2 = document.forms.change_form

filter_img1.onclick = () => {
  filter_img1.setAttribute('src', '../assets/img/filter 2.svg')
  select_option.style.display = "flex"
  select_option.style.left = "499px"
}

form.onsubmit = (e) => {
  e.preventDefault();

  let task = {
    id: Math.random()
  }
  let fm = new FormData(form)
  fm.forEach((value, key) => {
    task[key] = value
  })
  console.log(task);
  setPost(task)
  react(data)
}

open_btn.onclick = () => {
  modal_form_add_bg.style.display = "flex"
  modal_add_bg.style.display = "flex"
}

modal_form_add_bg.onclick = () => {
  modal_form_add_bg.style.display = "none"
  modal_add_bg.style.display = "none"
}


function searchSecond() {
  inp_select.onkeyup = () => {
    let filter_select = data.filter(arg => arg.country.toLowerCase().includes(inp_select.value.toLowerCase()))
    reload(filter_select)
  }
}

searchSecond()
// !!!!!!!!!!!!!!!!!!!!!!!!!!

inp.onkeyup = () => {
  let filtered = data.filter(elem => elem?.name?.toLowerCase().includes(inp.value.toLowerCase()))
  reload(filtered)
}

let fil_data = []

let change_form = document.querySelector('.change_form')

function setPost(post) {
  axios.post(url, post)
    .then(res => {
      if(res.status === 201 || res.status === 200) {
        react()
      }
    })
    .catch(err => console.log('err'))
}

form2.onsubmit = (e) => {
  
  e.preventDefault()

  let change_form = {
    id: Math.random()
  }
  let fm2 = new FormData(form2)
  fm2.forEach((value, key) => {
    change_form[key] = value
  })
  setPost()
  react(data)
}

function reload(arr) {
  countainer.innerHTML = ""
  for (let item of arr) {
    let block = document.createElement('div')
    let block_left_img = document.createElement('img')
    let block_right_img = document.createElement('img')
    let block_left = document.createElement('div')
    let block_left_about = document.createElement('div')
    let block_right = document.createElement('div')
    //modal
    let modal_information = document.createElement('div')
    let change = document.createElement('div')
    let del = document.createElement('div')
    //modal_img

    let span = document.createElement('span')
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')

    change.innerHTML = "Изменить"
    del.innerHTML = "Удалить"
    block_right_img.src = '../assets/img/more-horizontal (1) 1.svg'
    span.innerHTML = item.name
    span1.innerHTML = item.established
    span2.innerHTML = item.country
    block.setAttribute('id', item.id)

    modal_information.classList.add('modal_information')
    span.classList.add('span')
    span1.classList.add('span1')
    span2.classList.add('span2')
    block_left_about.classList.add('block_left_about')
    block_left_img.classList.add('block_left_img')
    block.classList.add('block')
    block_left.classList.add('block_left')
    block_right.classList.add('block_right')


    block_right_img.onclick = () => {
      setTimeout(() => {
        modal_information.style.display = "flex"
      }, 500);

      setTimeout(() => {
        modal_information.style.display = "none"
      }, 5000);
    }

    del.onclick = (event) => {
      let id = event.target.parentNode.parentNode.id
     
      axios.delete(`${url}/${id}`)
      .then(res => {
        if(res.status === 201 || res.status === 200) {
          react()
        }
      })
  }


    setTimeout(() => {
      change.onclick = () => {
        modal_information.style.display = "none"
        background_bg.style.display = "block"
        modal_bg.style.display = "block"
        modal_bg.style.top = "50%"
      }
    }, 1000);

    setTimeout(() => {
      background_bg.onclick = () => {
        background_bg.style.display = "none"
        modal_bg.style.display = "none"
        modal_bg.style.top = "-150%"
      }
    }, 1000);

    block_left_img.onclick = () => {
      arr.splice(arr.indexOf(item), 1)
      modal_airlanes_text.innerHTML = `Название : ${item.name}`
      modal_airlanes_text2.innerHTML = `Страна : ${item.country}`
      modal_airlanes_text3.innerHTML = `Время полета : ${item.established}`
      modal_airlanes_text4.innerHTML = `Ссылка но фото : ${item.logo}`
      modal_airlanes.style.display = "block"
      modal_airlanes_bg.style.display = "block"
    }

    modal_airlanes_bg.onclick = () => {
      modal_airlanes.style.display = "none"
      modal_airlanes_bg.style.display = "none"
    }

    close_btn.onclick = () => {
      modal_airlanes.style.display = "none"
      modal_airlanes_bg.style.display = "none"
    }

    select.onchange = () => {
      let arr2 = data.filter(elem => elem.established === select.value)
      reload(arr2)
  }

  if(!fil_data.includes(item.established)) {
    fil_data.push(item.established)
  }
  
  countainer.append(block)
  block.append(block_left, block_right, modal_information)
  block_left.append(block_left_img, block_left_about)
  block_right.append(block_right_img)
  block_left_about.append(span, span1, span2)
  modal_information.append(change, del)
  }
}


function setSearch() {
  for(let item of fil_data) {
    let option = new Option(item, item)
    select.append(option)
  }
}

if(data.length > 0) {
  setSearch()
} else {
  setTimeout(() => {
    setSearch()
  }, 1000);
}

