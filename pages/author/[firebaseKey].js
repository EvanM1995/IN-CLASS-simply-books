import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorBooks, setAuthorBooks] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  console.warn(authorBooks);
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorBooks);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-blue ms-5 details">
        <h5>
          By {authorBooks.first_name} {authorBooks.last_name}
          {authorBooks.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorBooks.email}`}>{authorBooks.email}</a>
      </div>
      <div className="d-flex flex-wrap">
        {authorBooks.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={viewAuthorDetails} />
        ))}
      </div>
    </div>
  );
}
