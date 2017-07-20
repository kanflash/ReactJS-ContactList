import { SET_CONTACTS, ADD_CONTACT, CONTACT_FETCHED, CONTACT_UPDATED, CONTACT_DELETED } from '../actions';

export default function contacts(state = [], action = {}) {
  //debugger;
  switch(action.type) {
    case ADD_CONTACT:
      return [
        ...state,
        action.contact
      ];

    case CONTACT_DELETED:
      return state.filter(item => item._id !== action.contactId);

    case CONTACT_UPDATED:
      return state.map(item => {
        if (item._id === action.contact._id) return action.contact;
        return item;
      });

    case CONTACT_FETCHED:
      const index = state.findIndex(item => item._id === action.contact._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.contact._id) return action.contact;
          return item;
        });
      } else {
        return [
          ...state,
          action.contact
        ];
      }

    case SET_CONTACTS:
      return action.contacts;
    default: return state;
  }
}
