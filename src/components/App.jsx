import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactsList/ContactsList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = ({ name, number }) => {
    const checkedName = this.checkingNameInState(name);
    if (checkedName) {
      alert('this name is already available');
      return true;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(el => el.id !== contactId),
      };
    });
  };

  checkingNameInState = e => {
    return this.state.contacts.find(
      ({ name }) => name.toLowerCase() === e.toLowerCase()
    );
  };

  handleFilterChange = ({target:{value}}) => {
    this.setState({ 'filter': value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filterContacts = this.getFilterContacts();
    return (
      <div>
        <h2>Phonebook</h2>
        <Form addContacts={this.addContacts} />
        <h2>Contacts</h2>
        <Filter
          handleChange={this.handleFilterChange}
          filterStateData={this.state.filter}
        />
        <ContactList
          filterContacts={filterContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
};


export default App;
