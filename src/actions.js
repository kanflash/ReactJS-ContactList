export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const CONTACT_FETCHED = 'CONTACT_FETCHED';
export const CONTACT_UPDATED = 'CONTACT_UPDATED';
export const CONTACT_DELETED = 'CONTACT_DELETED';

function handleResponse(response) {
  //debugger;
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    contacts
  }
}

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact
  }
}

export function contactFetched(contact) {
  return {
    type: CONTACT_FETCHED,
    contact
  }
}

export function contactUpdated(contact) {
  return {
    type: CONTACT_UPDATED,
    contact
  }
}

export function contactDeleted(contactId) {
  return {
    type: CONTACT_DELETED,
    contactId
  }
}

export function saveContact(data) {
  return dispatch => {
    return fetch('/api/contacts', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addContact(data.contact)));
  }
}

export function updateContact(data) {
  return dispatch => {
    return fetch(`/api/contacts/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(contactUpdated(data.contact)));
  }
}

export function deleteContact(id) {
  return dispatch => {
    return fetch(`/api/contacts/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(contactDeleted(id)));
  }
}

export function fetchContacts() {
  return dispatch => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => dispatch(setContacts(data.contacts)));
  }
}

export function fetchContact(id) {
  return dispatch => {
    fetch(`/api/contacts/${id}`)
      .then(res => res.json())
      .then(data => dispatch(contactFetched(data.contact)));
  }
}
