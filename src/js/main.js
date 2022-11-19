const mainContainer = document.querySelector('#main-container')
const userContainer = document.querySelector('#user-container')
const repoContainer = document.querySelector('#repo-container')

const username = document.querySelector('#github-username')
const avatarUrl = document.querySelector('#avatar_url')
const userNotFound = document.querySelector('#user-not-found')
const getRepo = document.querySelector('#get-repo')
const searchBtn = document.querySelector('#search-btn')

// cors
const options = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function getUserInfo(username) {
  fetch(`https://api.github.com/users/${username}`, options)
    .then(response => {
      if (response.status === 403) {
        alert('Request Limit!')
      }
      if (response.status === 404) {
        userNotFound.classList.remove('hide')
        userContainer.classList.add('hide')
      } else {
        userNotFound.classList.add('hide')
      }
      return response.json()
        .then(userData => showUserInfo(userData))
    })
    .catch(e => console.log('Error: ' + e.message))
}

function getUserReposInfo(username) {
  fetch(`https://api.github.com/users/${username}/repos`, options)
    .then(response => {
      response.json()
        .then(reposData => showReposInfo(reposData))
    })
    .catch(e => console.log('Error: ' + e.message))
}

function showUserInfo(userData) {
  for (const fields in userData) {
    if (document.querySelector('#' + fields)) {
      if (document.querySelector('#' + fields).nodeName === 'IMG') {
        avatarUrl.setAttribute('src', userData[fields])
      }
      document.querySelector('#' + fields).innerText = userData[fields]
      userContainer.classList.remove('hide')
    }
  }
}

function showReposInfo(reposData) {
  for (fields in reposData) {
    const divCardBody = document.createElement('div')
    const repoName = document.createElement('h5')
    const repoDescription = document.createElement('p')
    const p = document.createElement('p')
    const repoLanguage = document.createElement('small')
    const linkRepo = document.createElement('a')

    divCardBody.classList.add('card-body', 'card-repo', 'mb-5')
    repoName.classList.add('card-title')
    repoDescription.classList.add('card-text')
    repoLanguage.classList.add('text-muted')
    linkRepo.classList.add('btn', 'btn-primary')
    repoContainer.classList.add('repos')

    repoName.innerText = reposData[fields].name
    repoDescription.innerText = reposData[fields].description
    repoLanguage.innerText = reposData[fields].language

    linkRepo.innerText = 'Open'
    linkRepo.setAttribute('href', `${reposData[fields].html_url}`)

    repoContainer.appendChild(divCardBody)
    divCardBody.appendChild(repoName)
    divCardBody.appendChild(repoDescription)
    divCardBody.appendChild(p)
    p.appendChild(repoLanguage)
    divCardBody.appendChild(linkRepo)
  }
}

searchBtn.addEventListener('click', () => {
  // collapse bootstrap bug resolve
  if (repoContainer.classList.contains('show')) {
    repoContainer.classList.remove('show')
    getRepo.classList.add('collapsed')
    getRepo.setAttribute('aria-expanded', 'false')
  }

  if (document.querySelector('.repos')) {
    removeElementsByClass('card-repo')
    repoContainer.classList.remove('repos')
  }

  if (username.value.length !== 0) {
    getUserInfo(username.value)
  }
})

getRepo.addEventListener('click', () => {
  getUserReposInfo(username.value)
})
