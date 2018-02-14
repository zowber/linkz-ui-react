const data = {
  getLinkzFromServer: (success) => {    
    fetch('http://192.168.1.127:3000/linkz')
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(success)
      .catch(error => console.log(error))
  },
  addLink: (link, success) => {
    fetch('http://192.168.1.127:3000/linkz', {
      method: 'post',
      body: JSON.stringify(link),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(response => response.json())
      .then(success)
      .catch(error => console.log(error))
  },
  deletLinkFromServer : (linkId, success) => {    
    fetch('http://192.168.1.127:3000/linkz/' + linkId, {
      method:'delete',
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    })
    .then(response => response.json())
    .then(success)
    .catch(error => console.log(error))   
  }
}

export default data