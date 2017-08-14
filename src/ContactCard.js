import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactCard({ contact, deleteContact }) {

  const deleteContactx = (_id) => {
    return deleteContact(_id).then(
      (response) => { 
          debugger;
          //this.setState({ redirect: "delete" });
      }
    );
  }

  return (
    <li className="list-group-item">
      <div className="col-xs-12 col-sm-3">
            <img src={contact.cover} alt={contact.title} className="img-responsive img-circle" />
      </div>
      <div className="col-xs-12 col-sm-7">
          <span className="name">{contact.fname} {contact.lname}</span><br/>
          <span className="glyphicon glyphicon-map-marker text-muted c-info" data-toggle="tooltip" title={contact.company}></span>
          <span className="visible-xs"> <span className="text-muted">{contact.company}</span><br/></span>
          <span className="glyphicon glyphicon-earphone text-muted c-info" data-toggle="tooltip" title={contact.phone}></span>
          <span className="visible-xs"> <span className="text-muted">{contact.phone}</span><br/></span>
          <span className="fa fa-comments text-muted c-info" data-toggle="tooltip" title={contact.email}></span>
          <span className="visible-xs"> <span className="text-muted">{contact.email}</span><br/></span>
      </div>
      <div className="col-xs-12 col-sm-2">
          <Link to={`/contacts/${contact._id}/detail`} title="Detail" role="button">
              <span className="glyphicon glyphicon-th-list"></span><span></span>
          </Link>
          <Link to={`/contacts/${contact._id}/edit`} title="Edit" role="button">
              <span className="glyphicon glyphicon-pencil"></span><span></span>
          </Link>
          <div title="Remove" onClick={() => deleteContact(contact._id)}>
            <span className="glyphicon glyphicon-remove"></span><span></span>
          </div> 
      </div>
      <div className="clearfix"></div>
    </li>
  );
}

ContactCard.propTypes = {
  contact: React.PropTypes.object.isRequired,
  deleteContact: React.PropTypes.func.isRequired
}