import { useParams, Link } from 'react-router-dom';
import { useGetContactByIdQuery } from '../../Store/services/Contacts';
import './ContactInfo.css';

const ContactInfo = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isFetching } = useGetContactByIdQuery(id);
  return (
    <div style={{ marginTop: '150px' }}>
      <div className="card">
        <div className="card-header">
          <p>Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          {isLoading && <span>Loading......</span>}
          {isFetching && <span>Fetching......</span>}
          {isSuccess && <span>{data?.name}</span>}
          <br />
          <br />
          <strong>Email: </strong>
          <span>{data?.email}</span>
          <br />
          <br />
          <strong>Contact: </strong>
          <span>{data?.contact}</span>
          <br />
          <br />
          <Link to="/contacts">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
