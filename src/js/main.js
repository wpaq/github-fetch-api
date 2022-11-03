const mainContainer = document.querySelector('#main-container')
const userContainer = document.querySelector('#user-container')
const repoContainer = document.querySelector('#repo-container')

const gitUser = document.querySelector('#git-user')
const searchBtn = document.querySelector('#search-btn')
const avatarUrl = document.querySelector('#avatar_url')

const getRepo = document.querySelector('#get-repo')
const gitName = document.querySelector('#git-name')

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

const showData = (user) => {
  for (const campo in user) {
    if (document.querySelector('#' + campo)) {

      if (document.querySelector('#' + campo).nodeName === 'IMG') {
        avatarUrl.setAttribute('src', user[campo])
      }
      document.querySelector('#' + campo).innerText = user[campo]
      userContainer.classList.remove('hide')
    }
  }
}

const showRepos = (data) => {
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

function getUserData(user) {
  // get user from github
  fetch(`https://api.github.com/users/${user}`, options)
    .then(response => {
      if (response.status === 404) {
        document.querySelector('#user-not-found').classList.remove('hide')
        userContainer.classList.add('hide')
      } else {
        document.querySelector('#user-not-found').classList.add('hide')
      }
      return response.json()
        .then(data => showData(data))
    })
    .catch(e => console.log('Error: ' + e.message))

  // get repos from github
  fetch(`https://api.github.com/users/${user}/repos`, options)
    .then(response => {
      response.json()
        .then(data => showRepos(data))
    })
    .catch(e => console.log('Error: ' + e.message))
}


searchBtn.addEventListener('click', () => {
  if (document.querySelector('.repos')) {
    removeElementsByClass('card-repo')
    repoContainer.classList.remove('repos')
  }

  if (gitUser.value.length !== 0) {
    getUserData(gitUser.value)
  }
})
