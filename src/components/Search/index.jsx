import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Search = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const validationSchema = Yup.object({
    query: Yup.string().required('Search query is required')
  });

  const handleSearch = (values) => {
    const filtered = data.filter(item => 
      item.title.toLowerCase().includes(values.query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Search Todos</h1>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSearch}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="query" placeholder="Search..." />
            <ErrorMessage name="query" component="div" />
            <button type="submit" disabled={isSubmitting}>Search</button>
          </Form>
        )}
      </Formik>
      <div>
        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>No Data found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
