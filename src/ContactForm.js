import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

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

class ContactForm extends React.Component {
  state = {
    _id: this.props.contact ? this.props.contact._id : null,
    fname: this.props.contact ? this.props.contact.fname : '',
    lname: this.props.contact ? this.props.contact.lname : '',
    dt: this.props.contact ? this.props.contact.dt : '',
    company: this.props.contact ? this.props.contact.company : '',
    email: this.props.contact ? this.props.contact.email : '',
    phone: this.props.contact ? this.props.contact.phone : '',
    cover: this.props.contact ? this.props.contact.cover : '',
    errors: {},
    loading: false,
    modified: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.contact ? nextProps.contact._id : null,
      fname: nextProps.contact ? nextProps.contact.fname : '',
      lname: nextProps.contact ? nextProps.contact.lname : '',
      dt: nextProps.contact ? nextProps.contact.dt : '',
      company: nextProps.contact ? nextProps.contact.company : '',
      email: nextProps.contact ? nextProps.contact.email : '',
      phone: nextProps.contact ? nextProps.contact.phone : '',
      cover: nextProps.contact ? nextProps.contact.cover : ''
    });
  }

  handleChange = (e) => {
    console.log(this.state.errors[e.target.name]);
    if (!!this.state.errors[e.target.name]) {
      console.log("dddd");
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value , modified: true });
      //alert(this.state.modified);
    }
  }

  handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    // validation
    let errors = {};
    if (this.state.fname === '') errors.fname = "Can't be empty";
    if (this.state.lname === '') errors.lname = "Can't be empty";
    if (this.state.dt === '') errors.dt = "Can't be empty";
    if (this.state.company === '') errors.company = "Can't be empty";
    if (this.state.email === '') errors.email = "Can't be empty";
    if (this.state.phone === '') errors.phone = "Can't be empty";
    if (this.state.cover === '') errors.cover = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, fname, lname, dt, company, email, phone, cover } = this.state;
      this.setState({ loading: true });
      this.props.saveContact({ _id, fname, lname, dt, company, email, phone, cover })
        .catch((err) => err.response.then(({errors}) => this.setState({ errors, loading: false })));
    }
  }

  chooseform = () => {
    const formInfo = (
      <div className="container-fluid list-group-item">
        <h3 className="text-center">{this.state.fname} {this.state.lname}</h3>
        <div className="col-sm-8">
          <p>Birth day: {this.state.dt}</p>
          <p>Company: {this.state.company}</p>
          <p>Email: <a href="{this.state.email}">{this.state.email}</a></p>
          <p>Phone: {this.state.phone}</p>
        </div>
        <div className="col-sm-4 list-group-item" style={{wordWrap:["break-word"]}}> 
            <div className="row text-center">
                <img src={this.state.cover} className="ui small bordered image" data-src="holder.js/100%x180" alt="100%x180" style={{width:100+"%"}}  data-holder-rendered="true"/>
                <br/>
                <p>{this.state.cover} </p>
            </div>
        </div>
        <div className="col-sm-12">
          <Link className='btn btn-success' to={`/contact/${!!this.state && this.state._id}/edit`} title="Edit" role="button">
              <span className="glyphicon glyphicon-ok"></span><span> Edit</span>
          </Link>
          <button className="btn btn-danger" title="Remove" onClick={() =>  this.props.deleteContact(!!this.state && this.state._id)}>
              <span className="glyphicon glyphicon-remove"></span><span>  Remove</span>
          </button>
        </div>
      </div>
    );
    const form = (
      <div className="row">
      <form role="form" name="form" className={classnames('ui', 'form', { loading: this.state.loading })} >
      <div className="container-fluid list-group-item">
        <div className="col-sm-8">
              
              {(!this.state._id) ? <h3>Add new contact</h3> : <h3>Edit contact</h3>}

              {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

              <div className={classnames('form-group', { error: !!this.state.errors.fname})}>
                  <label className="control-label" htmlFor="form-fname">First Name</label>
                  <input
                      id="form-fname"
                      name="fname"
                      className="form-control"
                      type="text"
                      placeholder="Enter First Name"
                      value={this.state.fname}
                      onChange={this.handleChange}
                      required
                  />
                  <span>{this.state.errors.fname}</span>
              </div>
              
              <div className={classnames('form-group', { error: !!this.state.errors.lname})}>
                  <label className="control-label" htmlFor="form-lname">Last Name</label>
                  <input
                      id="form-lname"
                      name="lname"
                      className="form-control"
                      type="text"
                      placeholder="Enter Last Name"
                      value={this.state.lname}
                      onChange={this.handleChange}
                      required
                  />
                  <span>{this.state.errors.lname}</span>
              </div>
              
              <div className={classnames('form-group', { error: !!this.state.errors.dt})}>
                  <label className="control-label" htmlFor="form-dt">Birth Day</label>
                  <input 
                      id="form-dt"
                      name="dt"
                      className="form-control"
                      type="date"
                      placeholder="MM/DD/YYYY"
                      value={this.state.dt}
                      onChange={this.handleChange}
                      required
                  />
                  <span>{this.state.errors.dt}</span>
              </div>
              
              <div className={classnames('form-group', { error: !!this.state.errors.company})}>
                  <label className="control-label" htmlFor="form-company">Company</label>
                  <input
                      id="form-company"
                      name="company"
                      className="form-control"
                      type="text"
                      placeholder="Enter Company"
                      value={this.state.company}
                      onChange={this.handleChange}
                      required
                  />
                  <span>{this.state.errors.company}</span>
              </div>
              
              
              
              <div className={classnames('form-group', { error: !!this.state.errors.email})}>
                  <label className="control-label" htmlFor="form-email">E-Mail Address</label>
                  <input
                      id="form-email"
                      name="email"
                      className="form-control"
                      type="email"
                      placeholder="example@domain.com"
                      value={this.state.email}
                      onChange={this.handleChange}
                      minLength="3"
                      required
                  />
                  <span>{this.state.errors.email}</span>
              </div>
              
              <div className={classnames('form-group', { error: !!this.state.errors.phone})}>
                  <label className="control-label" htmlFor="form-phone">Phone</label>
                  <input
                      id="form-phone"
                      name="phone"
                      className="form-control"
                      type="tel"
                      placeholder="000-000-0000"
                      value={this.state.phone}
                      onChange={this.handleChange}
                      pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                      required
                  />
                  <span>{this.state.errors.phone}</span>
              </div>

              <div className={classnames('form-group', { error: !!this.state.errors.cover})}>
                  <label className="control-label" htmlFor="form-cover">Photo</label>
                  <input
                      id="form-cover"
                      name="cover"
                      className="form-control"
                      type="text"
                      placeholder="Image URL"
                      value={this.state.cover}
                      onChange={this.handleChange}
                      required
                  />
                  <span>{this.state.errors.cover}</span>
              </div>
        </div>
        <div className="col-sm-4 list-group-item" style={{wordWrap:["break-word"]}}>
            <div className="row text-center">
                <img src={this.state.cover || "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcyIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MiAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUzNGYwNjk1OTQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTM0ZjA2OTU5NCI+PHJlY3Qgd2lkdGg9IjE3MiIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI2MC4wNDY4NzUiIHk9Ijk0LjM5Njg3NSI+MTcyeDE4MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="} className="ui small bordered image" data-src="holder.js/100%x180" alt="100%x180" style={{width:100+"%"}}  data-holder-rendered="true"/>
                <br/>
                {this.state.cover}
            </div>
        </div>
        <div className="col-sm-12">
          {!this.state.modified && <p> <em>Nothing to save or reset. Introduce some changes first!</em> </p>}
          
          {!!this.state.errors.global && <p> <em>Can't save. Please correct form validation errors!</em> </p>}
          {!this.state._id &&
          
            <button className={classnames('btn', 'btn-success', {disabled:!this.state.modified})} onClick={this.handleSubmit}>
             <span className="glyphicon glyphicon-ok"></span>
             <span> Add</span>
            </button>
          
          }
          {!!this.state._id &&
          
            <button className={classnames('btn', 'btn-success', {disabled:!this.state.modified})} onClick={this.handleSubmit}>
             <span className="glyphicon glyphicon-ok"></span>
             <span> Save Edits</span>
            </button>
         
          }
          <Link className="btn btn-danger" to={!this.state._id ? `/contacts` : `/contact/${this.state._id}/detail`} title="Detail" role="button">
              <span className="glyphicon glyphicon-remove"></span><span>  Cancel</span>
          </Link>
        </div>
        </div> 
      </form>
    </div>          
    );

    const formDisplay = (!!this.props.isContactInfo)? formInfo : form ;
    return formDisplay;
  }

  render() {
    

    return (
      
       this.chooseform() 
      
    ) ;
    
  }
}


export default ContactForm;
