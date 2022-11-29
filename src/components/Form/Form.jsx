import React, { Component } from 'react';
import { Styled } from './Styled';
import PropTypes from 'prop-types';

class Form extends Component {
  static propTypes = {
    addContacts: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChang = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formSubmitHandle = e => {
    e.preventDefault();
    const add = this.props.addContacts(this.state);
    if (!add) {
      this.resetForm();
    }
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Styled onSubmit={this.formSubmitHandle}>
        <label>
          <span>Name</span>
          <input
            onChange={this.handleChang}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          <span>Number</span>
          <input
            onChange={this.handleChang}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </Styled>
    );
  }
}
export default Form;
