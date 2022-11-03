const mainContainer = document.querySelector('#main-container')
const userContainer = document.querySelector('#user-container')
const repoContainer = document.querySelector('#repo-container')

const gitUserName = document.querySelector('#git-user')
const searchBtn = document.querySelector('#search-btn')
const avatarUrl = document.querySelector('#avatar_url')

const getRepo = document.querySelector('#get-repo')
const userNotFound = document.querySelector('#user-not-found')


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

function getUserInfo (userName) {
  fetch(`https://api.github.com/users/${userName}`, options)
    .then(response => {
      switch (response.status) {
        case 403:
          console.log('Limite de requests')
      }
      if (response.status === 404) {
        userNotFound.classList.remove('hide')
        userContainer.classList.add('hide')
      } else {
        userNotFound.classList.add('hide')
      }
      return response.json()
        .then(data => showUserInfo(data))
    })
    .catch(e => console.log('Error: ' + e.message))
}

function getUserReposInfo(userName) {
  fetch(`https://api.github.com/users/${userName}/repos`, options)
    .then(response => {
      response.json()
        .then(data => showReposInfo(data))
    })
    .catch(e => console.log('Error: ' + e.message))
}

function showUserInfo(data) {
  for (const campo in data) {
    if (document.querySelector('#' + campo)) {

      if (document.querySelector('#' + campo).nodeName === 'IMG') {
        avatarUrl.setAttribute('src', data[campo])
      }
      document.querySelector('#' + campo).innerText = data[campo]
      userContainer.classList.remove('hide')
    }
  }
}

function showReposInfo(data) {
  data.map((repo) => {
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

    repoName.innerText = repo.name
    repoDescription.innerText = repo.description
    repoLanguage.innerText = repo.language

    linkRepo.innerText = 'Open'
    linkRepo.setAttribute('href', `${repo.html_url}`)

    repoContainer.appendChild(divCardBody)
    divCardBody.appendChild(repoName)
    divCardBody.appendChild(repoDescription)
    divCardBody.appendChild(p)
    p.appendChild(repoLanguage)
    divCardBody.appendChild(linkRepo)
  })
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

  if (gitUserName.value.length !== 0) {
    getUserInfo(gitUserName.value)
  }
})

getRepo.addEventListener('click', () => {
  getUserReposInfo(gitUserName.value)
})
