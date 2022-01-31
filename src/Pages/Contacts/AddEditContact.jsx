import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddContactMutation, useEditContactMutation, useGetContactByIdQuery } from '../../Store/services/Contacts';
import './AddEditContact.css';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEditContact = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const [addContact] = useAddContactMutation();
  const [editContact] = useEditContactMutation();
  const { data } = useGetContactByIdQuery(id, { skip: !editMode });
  const { name, email, contact } = formValue;

  useEffect(() => {
    if (id) {
      setEditMode(true);
      data && setFormValue(data);
    } else {
      setEditMode(false);
      setFormValue(initialState);
    }
  }, [id, data]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error('Please provide value into each input field');
    } else {
      if (!editMode) {
        await addContact(formValue)
          .unwrap()
          .then(res => console.log(res))
          .catch(error => console.log(error));
        navigate('/contacts');
        toast.success('Contact Added Successfully');
      } else {
        await editContact({ id, ...formValue })
          .unwrap()
          .then(res => console.log(res))
          .catch(error => console.log(error));
        navigate('/contacts');
        setEditMode(false);
        toast.success('Contact Updated Successfully');
      }
    }
  };

  const handleInputChange = e => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your Name..." value={name || ''} onChange={handleInputChange} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Your Email..." value={email || ''} onChange={handleInputChange} />
        <label htmlFor="contact">Contact</label>
        <input type="text" id="contact" name="contact" placeholder="Your Contact No. ..." value={contact || ''} onChange={handleInputChange} />

        <input type="submit" value={id ? 'Update' : 'Save'} />
      </form>
    </div>
  );
};

export default AddEditContact;
