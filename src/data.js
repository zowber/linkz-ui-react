const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000"
console.log("API_HOST: " + API_HOST)

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export function getLinkzFromServer(success) {
  fetch(API_HOST + "/linkz/")
    .then(checkStatus)
    .then(response => response.json())
    .then(success)
    .catch(error => console.log(error))
}

export function addLink(link, success) {
  fetch(API_HOST + "/linkz/", {
    method: "post",
    body: JSON.stringify(link),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(success)
    .catch(error => console.log(error))
}

export function updateLink(link, success) {
  fetch(API_HOST + "/linkz/" + link.id, {
    method: "put",
    body: JSON.stringify(link),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(success)
    .catch(error => console.log(error))
}

export function deleteLinkFromServer(linkId, success) {
  fetch(API_HOST + "/linkz/" + linkId, {
    method: "delete"
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(success)
    .catch(error => console.log(error))
}