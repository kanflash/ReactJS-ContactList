import React from 'react';
import { Link } from 'react-router-dom';
import ContactFormDetail from './ContactFormDetail';
import ContactFormEdit from './ContactFormEdit';

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

  handleFormState = (valObj) => {
    this.setState(valObj);
  }

  render() {
    
    return (
       (!!this.props.isContactInfo) ? 
       <ContactFormDetail contactDetail={this.state} deleteContact={this.props.deleteContact}/> :
       <ContactFormEdit contactDetail={this.state} handleFormState={this.handleFormState} saveContact={this.props.saveContact}/>
    ) ;  

  }
}

export default ContactForm;
