/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { getAuthors } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';
import AuthorCard from '../../components/AuthorCard';

const Author = () => {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);
  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {authors.map((author) => (
        <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
      ))}
    </div>
  );
};

export default Author;