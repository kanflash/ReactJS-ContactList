import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import ContactsPage from './ContactsPage';
import ContactFormPage from './ContactFormPage';
import './App.css';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <li>
      <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
    </li>
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="global-wrapper ng-scope">
        <header className="navbar navbar-static-top bs-docs-nav" id="top" role="banner"> 
          <nav className="navbar navbar-default navbar-fixed-top"> 
              <div className="container">
                <div className="nav-header">
                  <div className="navbar-brand hidden-xs">My Contacts</div>
                </div>
                <nav className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <ActiveLink activeOnlyWhenExact to="/contacts" label="Home" />
                </ul>
                </nav>
              </div> 
          </nav>
        </header>
        
        <div className="container">
          <Route exact path="/contacts" component={ContactsPage} />
          <Route exact path="/contacts/:_id"  component={ContactsPage} />
          <Route path="/contacts/:_id/:_pgtype" component={ContactsPage} />
        </div> 
        
        <footer className="footer">
          <div className="container">
            <p className="text-muted">MongoDB + Express + React + Redux + Node.js (MERRN)</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
