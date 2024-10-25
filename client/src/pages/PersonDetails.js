import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GET_PERSON } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import PersonCard from '../components/listItems/PersonCard';
import { Button } from 'antd'; 

export default function PersonDetails() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { id }, 
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! {error.message}</div>;

    const { person } = data; 

    return (
      <>
          <Link to={`/`}>
              <Button type="primary" style={{ marginBottom: '20px' }}>
                  Go Back Home
              </Button>
          </Link>
          <PersonCard id={id} firstName={person.firstName} lastName={person.lastName} cars={person.cars}/>
      </>
    );
}
