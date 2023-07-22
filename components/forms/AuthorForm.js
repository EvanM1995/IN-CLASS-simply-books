import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { useEffect, useState } from 'react';
import { createAuthor, updateAuthor } from '../../api/authorData';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput)
      .then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/author/authors');
        });
      });
  }
};

return (
  <Form onSubmit={handleSubmit}>
    <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h1>

    <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
      <Form.Control
      type="text"
      placeholder="First Name"
      name="first_name"
      value={formInput.first_name}
      onChange={handleChange}
      required
      />
    </FloatingLabel>

    <FloatingLabel controlId="floatingInput3" label="Last Name" className="mb-3">
     <Form.Control
     type="text"
     placeholder="Last Name"
     name="last_name"
     value={formInput.last_name}
     onChange={handleChange}
     required
    />
    </FloatingLabel>

    <FloatingLabel controlId="floatingTextarea" label="Email" className="mb-3">
      <Form.Control
      as="textarea"
      placeholder="email"
      style={{ height: '100px' }}
      name="email"
      value={formInput.email}
      onChange={handleChange}
      required
      />
    </FloatingLabel>

    <Form.Check
    className="text-white mb-3"
    type="switch"
    id="Favorite"
    name="favorite"
    label="Favorite?"
    checked={formInput.Favorite}
    onChange={(e) => {
      setFormInput((prevState) => ({
        ...prevState,
        favorite: e.target.checked,
      }));
    }}
    />

    <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>

  </Form>
);

}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};

export default AuthorForm;