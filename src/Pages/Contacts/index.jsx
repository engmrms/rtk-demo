import { Route, Routes } from 'react-router-dom';
import ListContacts from './ListContacts';
import AddEditContact from './AddEditContact';
import ContactInfo from './ContactInfo';

const Contacts = () => {
  const handleDelete = async id => {
    if (window.confirm('Are you sure that you wanted to delete that user ?')) {
      toast.success('Contact Deleted Successfully');
    }
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <Routes>
        <Route path="/" element={<ListContacts />}></Route>
        <Route path="add" element={<AddEditContact />}></Route>
        <Route path="update/:id" element={<AddEditContact />}></Route>
        <Route path="view/:id" element={<ContactInfo />}></Route>
      </Routes>
    </div>
  );
};

export default Contacts;
