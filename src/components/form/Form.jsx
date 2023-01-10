/* import { useState } from 'react';
import { nanoid } from 'nanoid';
import style from '../form/Form.module.css';


export function ContactForm({onSubmit}) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const contactsId = nanoid();

  function handleChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return
    }
  };

 const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    onSubmit(name.value, number.value);
    setName('');
    setNumber('');
  };



  return (
    <form onSubmit={handleSubmit}>
      <p>Name</p>
      <label htmlFor={contactsId}>
        <input
          id={contactsId}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <p>Number</p>
      <label htmlFor={contactsId}>
        <input
          id={contactsId}
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={style.form_btn} type="submit">
        Add contact
      </button>
    </form>
  );
} */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';
import { getContacts } from 'components/redux/selectors';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../form/Form.module.css';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const contactsId = nanoid();

  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        throw new Error("There isn't such option");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;

    const isExist = contacts.find(contact => {
      return contact.name === name;
    });
    if (isExist) {
      return toast.warn(`${name} is already in contacts.`);
    }

    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmit} /* className={style.form} */>
      <label htmlFor={contactsId}>
        <p>Name</p>{' '}
        <input
          value={name}
          id={contactsId}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor={contactsId}>
        <p>Number</p>{' '}
        <input
          value={number}
          id={contactsId}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={style.form_btn}>
        Add contact
      </button>
      <ToastContainer />
    </form>
  );
}
