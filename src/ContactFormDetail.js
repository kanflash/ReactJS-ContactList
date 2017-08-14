import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactFormDetail({ contactDetail, deleteContact }) {

    return (
        <div className="container-fluid list-group-item">
            <h3 className="text-center">{contactDetail.fname} {contactDetail.lname}</h3>
            <div className="col-sm-8">
            <p>Birth day: {contactDetail.dt}</p>
            <p>Company: {contactDetail.company}</p>
            <p>Email: <a href="{contactDetail.email}">{contactDetail.email}</a></p>
            <p>Phone: {contactDetail.phone}</p>
            </div>
            <div className="col-sm-4 list-group-item" style={{wordWrap:["break-word"]}}> 
                <div className="row text-center">
                    <img src={contactDetail.cover} className="ui small bordered image" data-src="holder.js/100%x180" alt="100%x180" style={{width:100+"%"}}  data-holder-rendered="true"/>
                    <br/>
                    <p>{contactDetail.cover} </p>
                </div>
            </div>
            <div className="col-sm-12">
            <Link className='btn btn-success' to={`/contacts/${!!contactDetail && contactDetail._id}/edit`} title="Edit" role="button">
                <span className="glyphicon glyphicon-ok"></span><span> Edit</span>
            </Link>
            <button className="btn btn-danger" title="Remove" onClick={() =>  deleteContact(!!contactDetail && contactDetail._id)}>
                <span className="glyphicon glyphicon-remove"></span><span>  Remove</span>
            </button>
            </div>
        </div>
    );

}

ContactFormDetail.propTypes = {
  contactDetail: React.PropTypes.object.isRequired,
  deleteContact: React.PropTypes.func.isRequired
}