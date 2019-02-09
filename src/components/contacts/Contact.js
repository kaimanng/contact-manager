import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  // if this were a frontend to a backend website, we've have to make HTTP request to delete it from the backend, from the actual database, and we try to mimic it here

  // it gives us a 404 error because what we're doing is we're trying to make a DELETE Request to the url (https://jsonplaceholder.typicode.com/users/11), as 11 is the id that was assigned to us, but this didn't actually get stored in the database, so it's trying to delete something that's not there

  // in an arrow function we put async before the parameters
  onDeleteClick = async (id, dispatch) => {
    // we try to do the await
    try {
      // DELETE Request
      // it makes the request first, when it's done, we do the dispatch
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // then we want to do the dispatch either way
      // if it works we want to do the dispatch here
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      // even if there's an error (e.g. 404 message), we still want to do the dispatch beacuse we want it to acutally delete from the DOM
      // this is something we wouldn't do in real life if we could actually have acess to database and make updates
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
