import React from 'react';
import ContactCard from './ContactCard';

export default function ContactsList({ contacts, deleteContact }) {
  const emptyMessage = (
    <p>There are no contacts yet in your collection.</p>
  );

  const contactsList = (
    <ul className="list-group list-controls" id="contact-list">
    
      { contacts.map(contact => <ContactCard contact={contact} key={contact._id} deleteContact={deleteContact} />) }
    
    </ul>
  );

  return (
    <div>
      {contacts.length === 0 ? emptyMessage : contactsList}
    </div>
  );
}

ContactsList.propTypes = {
  contacts: React.PropTypes.array.isRequired,
  deleteContact: React.PropTypes.func.isRequired
}
