import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteContactMutation, useGetContactsQuery } from '../../Store/services/Contacts';
import './ListContacts.css';

const ListContacts = () => {
  const { data, isLoading, isSuccess, isFetching } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const handleDelete = async id => {
    if (window.confirm('Are you sure that you wanted to delete that user ?')) {
      const result = await deleteContact(id);
      console.log(result);
      toast.success('Contact Deleted Successfully');
    }
  };
  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2>Redux Toolkit RTK Query CRUD with React and JSON Server </h2>
      <Link to="/contacts/add">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      {isLoading && <div>Loading .....</div>}
      {isFetching && <div>Fetching .....</div>}
      {isSuccess && (
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Contact</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>
                      <Link to={`/contacts/update/${item.id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                      <Link to={`/contacts/view/${item.id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListContacts;
