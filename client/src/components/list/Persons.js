import { useQuery } from '@apollo/client'
import { GET_PERSONS } from '../../graphql/queries'
import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'

const Persons = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PERSONS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
    <h1 style={styles.heading}>Records</h1>
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.persons.map(({ id, firstName, lastName,cars }) => (
        <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName} cars={cars} allUsers={data}/>
        </List.Item>
      ))}
    </List>
    </>
  )
}

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  },
  heading: {
    textAlign: 'center', // Center-aligns the heading
    marginBottom: '20px'
  }
})

export default Persons
