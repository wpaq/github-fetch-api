const userContainer = document.querySelector('#user-container')
const gitUser = document.querySelector('#git-user')
const searchBtn = document.querySelector('#search-btn')
const avatarUrl = document.querySelector('#avatar_url')

const gitName = document.querySelector('#git-name')

const showData = (user) => {
  for (const campo in user) {
    if (document.querySelector('#' + campo)) {
      if (document.querySelector('#'+campo).nodeName === 'IMG') {
        avatarUrl.setAttribute('src', user[campo])
      }
      document.querySelector('#' + campo).innerText = user[campo]
      userContainer.classList.remove('hide')
    }
  }
}

searchBtn.addEventListener('click', (e) => {
  if (gitUser.value.length !== 0) {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }

    fetch(`https://api.github.com/users/${gitUser.value}`, options)
      .then(response => {
        if (response.status === 404) {
          alert('User not found!')
          userContainer.classList.add('hide')
        }
        return response.json()
          .then(data => showData(data))
      })
      .catch(e => console.log('Error: ' + e.message))
  }
})
