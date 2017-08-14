import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveContact, updateContact } from './actions';
import ContactForm from './ContactForm';

class ContactFormPage extends React.Component {
  state = {
    redirect: null,
    _id: null
  }

  componentWillReceiveProps = () => { 
    //this.setState({ redirect: null });

    //this.setState({ redirect: this.props.contactPgState.redirect });
    debugger;
    this.setState((prevState, props) => ({
      redirect: props.contactPgState.redirect
    }));

  }


  saveContact = ({_id, fname, lname, dt, company, email, phone, cover }) => {
    if (_id) {
      return this.props.updateContact({ _id, fname, lname, dt, company, email, phone, cover }).then(
        (response) => { 
          this.setState({ redirect: "detail", _id: response.contact._id });
        }
      );
    } else {
      return this.props.saveContact({ fname, lname, dt, company, email, phone, cover }).then(
        (response) => { 
          this.setState({ redirect: "detail", _id: response.contact._id });
        }
      );
    }
  }

  /*deleteContact = (_id) => {
    return this.props.deleteContact(_id).then(
      (response) => { 
          debugger;
          this.setState({ redirect: "delete" });
      }
    );
  }*/

  toggleform = () => {
      const { contact } = this.props;
      let switchform;
      debugger;   
      //|| this.props.contactPgState.redirect
      if(this.state.redirect) //for Add or Update
      {
        //&& this.props.contactPgState.redirect !== "delete"
        switchform = (this.state.redirect !== "delete") ? 
          <Redirect to={`/contacts/${this.state._id}/detail`} /> : 
          switchform = <Redirect to={"/contacts"} />;
      } 
      else if((this.props._pgtype === "edit") || (!contact && this.props._id === "new")) //for Edit or New
      {
        switchform = <ContactForm
          contact={this.props.contact} 
          saveContact={this.saveContact}
        />
      }
      else if(this.props._pgtype === "detail") //for detail view
      {
        switchform = <ContactForm
          contact={this.props.contact}
          deleteContact = {this.props.deleteContact}
          isContactInfo = "true"
        />
      } 
      else{
        switchform = (
        <div>
          <div className="list-group-item text-center">Please select a contact to view</div>
          <Redirect to={"/contacts"} />
        </div>
        )
      }

      return switchform;    
  }

  render() {
    return (
      <div>
        { this.toggleform() }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { contact } = props;
  //debugger;
  if (contact && contact._id) {
    return {
      contact: state.contacts.find(item => item._id === contact._id)
    }
  }

  return { contact: null };
}

export default connect(mapStateToProps, { saveContact, updateContact })(ContactFormPage);
