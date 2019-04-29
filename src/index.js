const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')

let addToy = false
// YOUR CODE HERE

fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    let allToys = json
    allToys.forEach(function(toy) {
      toyCollection.innerHTML +=
        ` <div class="card">
          <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
              <p>${toy.likes} </p>
              <button id="${toy.id}" class="like-btn">Like <3</button>
        </div>
      `
    })
  })

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const newToyName = document.querySelector('#new-toy-name')
const newToyImage = document.querySelector('#new-toy-image')
const newToyBtn = document.querySelector('#new-toy-submit')

toyForm.addEventListener('submit', function(e) {
  e.preventDefault()
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyName.value,
      image: newToyImage.value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(function(newToy){
    toyCollection.innerHTML +=
      ` <div class="card">
        <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar" />
            <p>${newToy.likes} </p>
            <button id="${newToy.id}" class="like-btn">Like <3</button>
      </div>
    `
  })
})

document.addEventListener('click', function(e) {

  if (e.target.className === 'like-btn') {
    let likePTag = e.target.previousElementSibling
    let likeNum = parseInt(likePTag.innerText)
    likePTag.innerText = ++likeNum

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },

    body: JSON.stringify({
      likes: likePTag.innerText
      })
    })
  }
})

// OR HERE!
