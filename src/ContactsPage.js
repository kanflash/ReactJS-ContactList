import React from 'react';
import { Link } from 'react-router-dom';
import ContactsList from './ContactsList';
import ContactFormPage from './ContactFormPage';
import { connect } from 'react-redux';
import { fetchContacts, deleteContact } from './actions';

class ContactsPage extends React.Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  componentWillReceiveProps = () => {
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="container-fluid">
              <div className="navbar-left">  
              <div className="nav-header bs-docs-header">
                  <h3>Contact List</h3>
              </div> 
              </div>
              <div className="navbar-right">
                <Link className="btn btn-primary btn-sm" to={"/contacts/new"} title="New" role="button">
                    <span className="glyphicon glyphicon-plus"></span><span>  New</span>
                </Link>
              </div>
            </div>
            <ContactsList contacts={this.props.contacts} fetchContact={this.props.fetchContact} deleteContact={this.props.deleteContact} />
          </div>
          <div className="col-md-8">
            <ContactFormPage contact={this.props.contact} _id={this.props._id} _pgtype={this.props._pgtype}/>
          </div>
          </div>
      </div>
    );
  }
}

ContactsPage.propTypes = {
  contacts: React.PropTypes.array.isRequired,
  fetchContacts: React.PropTypes.func.isRequired,
  deleteContact: React.PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  const { match } = props;
  //debugger;
  if (match && match.params._id ) {
    return {
      contacts: state.contacts,
      contact: state.contacts.find(item => item._id === match.params._id),
      _id: match.params._id,
      _pgtype: match.params._pgtype
    }
  }
  return {
    contacts: state.contacts,
    contact: null
  }
}

export default connect(mapStateToProps, { fetchContacts, deleteContact })(ContactsPage);
