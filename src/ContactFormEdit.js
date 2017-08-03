import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function ContactFormEdit({ contactDetail, handleFormState, saveContact }) {

    function validateInput(data) {
        let errors = {};

        if (Validator.isNull(data.fname)) {
            errors.fname = 'This field is required';
        }
        if (Validator.isNull(data.lname)) {
            errors.lname = 'This field is required';
        }
        if (Validator.isNull(data.dt)) {
            errors.dt = 'This field is required';
        }
        if (Validator.isNull(data.company)) {
            errors.company = 'This field is required';
        }
        if (!Validator.isEmail(data.email)) {
            errors.email = 'Email is invalid';
        }
        if (Validator.isNull(data.phone)) {
            errors.phone = 'This field is required';
        }
        if (Validator.isNull(data.cover)) {
            errors.cover = 'This field is required';
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    const handleChange = (e) => {
        console.log("kk "+contactDetail.errors[e.target.name]);
        if (!!contactDetail.errors[e.target.name]) {
            let errors = Object.assign({}, contactDetail.errors);
            delete errors[e.target.name];
            handleFormState({
                [e.target.name]: e.target.value,
                errors
            });
        } 
        else {
            handleFormState({
                [e.target.name]: e.target.value,
                modified: true
            });
        }
    }

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        // validation
        let errors = {};
        if (contactDetail.fname === '') errors.fname = "Can't be empty";
        if (contactDetail.lname === '') errors.lname = "Can't be empty";
        if (contactDetail.dt === '') errors.dt = "Can't be empty";
        if (contactDetail.company === '') errors.company = "Can't be empty";
        if (contactDetail.email === '') errors.email = "Can't be empty";
        if (contactDetail.phone === '') errors.phone = "Can't be empty";
        if (contactDetail.cover === '') errors.cover = "Can't be empty";
        handleFormState({ errors });
        const isValid = Object.keys(errors).length === 0

        if (isValid) {
        const { _id, fname, lname, dt, company, email, phone, cover } = contactDetail;
        handleFormState({ loading: true });
        saveContact({ _id, fname, lname, dt, company, email, phone, cover })
            .catch((err) => err.response.json().then(({errors}) => handleFormState({ errors, loading: false })));
        }
    }

    return (
        <div className="row">
            <form role="form" name="form" className={classnames('ui', 'form', { loading: contactDetail.loading })} >
            <div className="container-fluid list-group-item">
                <div className="col-sm-8">
                    
                    {(!contactDetail._id) ? <h3>Add new contact</h3> : <h3>Edit contact</h3>}

                    {!!contactDetail.errors.global && <div className="ui negative message"><p>{contactDetail.errors.global}</p></div>}

                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.fname})}>
                        <label className="control-label" htmlFor="form-fname">First Name</label>
                        <input
                            id="form-fname"
                            name="fname"
                            className="form-control"
                            type="text"
                            placeholder="Enter First Name"
                            value={contactDetail.fname}
                            onChange={handleChange}
                            required
                        />
                        <span>{contactDetail.errors.fname}</span>
                    </div>
                    
                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.lname})}>
                        <label className="control-label" htmlFor="form-lname">Last Name</label>
                        <input
                            id="form-lname"
                            name="lname"
                            className="form-control"
                            type="text"
                            placeholder="Enter Last Name"
                            value={contactDetail.lname}
                            onChange={handleChange}
                            required
                        />
                        <span>{contactDetail.errors.lname}</span>
                    </div>
                    
                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.dt})}>
                        <label className="control-label" htmlFor="form-dt">Birth Day</label>
                        <input 
                            id="form-dt"
                            name="dt"
                            className="form-control"
                            type="date"
                            placeholder="MM/DD/YYYY"
                            value={contactDetail.dt}
                            onChange={handleChange}
                            required
                        />
                        <span>{contactDetail.errors.dt}</span>
                    </div>
                    
                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.company})}>
                        <label className="control-label" htmlFor="form-company">Company</label>
                        <input
                            id="form-company"
                            name="company"
                            className="form-control"
                            type="text"
                            placeholder="Enter Company"
                            value={contactDetail.company}
                            onChange={handleChange}
                            required
                        />
                        <span>{contactDetail.errors.company}</span>
                    </div>
                    
                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.email})}>
                        <label className="control-label" htmlFor="form-email">E-Mail Address</label>
                        <input
                            id="form-email"
                            name="email"
                            className="form-control"
                            type="email"
                            placeholder="example@domain.com"
                            value={contactDetail.email}
                            onChange={handleChange}
                            minLength="3"
                            required
                        />
                        <span>{contactDetail.errors.email}</span>
                    </div>
                    
                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.phone})}>
                        <label className="control-label" htmlFor="form-phone">Phone</label>
                        <input
                            id="form-phone"
                            name="phone"
                            className="form-control"
                            type="tel"
                            placeholder="000-000-0000"
                            value={contactDetail.phone}
                            onChange={handleChange}
                            pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                            required
                        />
                        <span>{contactDetail.errors.phone}</span>
                    </div>

                    <div className={classnames('form-group', { 'has-error': !!contactDetail.errors.cover})}>
                        <label className="control-label" htmlFor="form-cover">Photo</label>
                        <input
                            id="form-cover"
                            name="cover"
                            className="form-control"
                            type="text"
                            placeholder="Image URL"
                            value={contactDetail.cover}
                            onChange={handleChange}
                            required
                        />
                        <span>{contactDetail.errors.cover}</span>
                    </div>
                </div>
                <div className="col-sm-4 list-group-item" style={{wordWrap:["break-word"]}}>
                    <div className="row text-center">
                        <img src={contactDetail.cover || "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcyIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MiAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUzNGYwNjk1OTQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTM0ZjA2OTU5NCI+PHJlY3Qgd2lkdGg9IjE3MiIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI2MC4wNDY4NzUiIHk9Ijk0LjM5Njg3NSI+MTcyeDE4MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="} className="ui small bordered image" data-src="holder.js/100%x180" alt="100%x180" style={{width:100+"%"}}  data-holder-rendered="true"/>
                        <br/>
                        {contactDetail.cover}
                    </div>
                </div>
                <div className="col-sm-12">
                {!contactDetail.modified && <p> <em>Nothing to save or reset. Introduce some changes first!</em> </p>}
                
                {!!contactDetail.errors.global && <p> <em>Can't save. Please correct form validation errors!</em> </p>}
                {!contactDetail._id &&
                
                    <button className={classnames('btn', 'btn-success', {disabled:!contactDetail.modified})} disabled={!contactDetail.modified} onClick={handleSubmit}>
                    <span className="glyphicon glyphicon-ok"></span>
                    <span> Add</span>
                    </button>
                
                }
                {!!contactDetail._id &&
                
                    <button className={classnames('btn', 'btn-success', {disabled:!contactDetail.modified})} disabled={!contactDetail.modified} onClick={handleSubmit}>
                    <span className="glyphicon glyphicon-ok"></span>
                    <span> Save Edits</span>
                    </button>
                
                }
                <Link className="btn btn-danger" to={!contactDetail._id ? `/contacts` : `/contact/${contactDetail._id}/detail`} title="Detail" role="button">
                    <span className="glyphicon glyphicon-remove"></span><span>  Cancel</span>
                </Link>
                </div>
            </div> 
            </form>
        </div> 
    );
}

ContactFormEdit.propTypes = {
  contactDetail: React.PropTypes.object.isRequired,
  saveContact: React.PropTypes.func.isRequired
}