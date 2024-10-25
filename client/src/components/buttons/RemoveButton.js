import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { GET_PERSONS, REMOVE_PERSON, REMOVE_CAR } from '../../graphql/queries';
import { useMutation } from '@apollo/client';

export default function RemoveButton({ id, type, personId }) {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { persons } = cache.readQuery({ query: GET_PERSONS });

      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: persons.filter(person => person.id !== removePerson.id)
        }
      });
    }
  });

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { persons } = cache.readQuery({ query: GET_PERSONS });

      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: persons.map(person => 
            person.id === removeCar.personId
              ? { ...person, cars: person.cars.filter(car => car.id !== removeCar.id) }
              : person
          )
        }
      });
    }
  });

  const handleButtonClick = () => {
    const result = window.confirm(`Are you sure you want to delete this ${type}?`);

    if (result) {
      if (type === 'person') {
        removePerson({ variables: { id } });
      } else if (type === 'car') {
        removeCar({ variables: { id } });
      }
    }
  };

  return (
    <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
  );
}
