const userGit = 'wpaq'
const url = `https://api.github.com/users/${userGit}`
const options = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
}

const container = document.querySelector('.container')

function generateUserGit (data) {
  const img = document.createElement('img')
  const name = document.createElement('h2')
  const login = document.createElement('p')
  const bio = document.createElement('p')
  
  img.src = data.avatar_url
  img.classList.add('avatar', 'avatar-user')
  name.innerText = data.name
  login.innerText = data.login
  bio.innerText = data.bio
  
  container.appendChild(img)
  container.appendChild(name)
  container.appendChild(login)
  container.appendChild(bio)
}

fetch(url, options)
  .then(response => response.json())
  .then(data => generateUserGit(data))
  