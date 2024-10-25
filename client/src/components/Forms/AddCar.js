import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { ADD_CAR, GET_PERSONS } from '../../graphql/queries'
import { v4 as uuidv4 } from 'uuid'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const { loading, error, data } = useQuery(GET_PERSONS)

  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PERSONS }] 
  })

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId
      },
      update: (cache, { data: { addCar } }) => {
        const existingPersons = cache.readQuery({ query: GET_PERSONS })

        if (existingPersons) {
          cache.writeQuery({
            query: GET_PERSONS,
            data: {
              ...existingPersons,
              persons: existingPersons.persons.map(person => 
                person.id === personId
                  ? { ...person, cars: [...(person.cars || []), addCar] } 
                  : person
              )
            }
          })
        }
      }
    })
    form.resetFields()
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading persons</p>

  if (!data?.persons?.length) return <p>No persons available. Please add a person first.</p>

  return (
    <>
      <h1>Add Car</h1>
      <Form
        name='add-car-form'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px' }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='year'
          rules={[{ required: true, message: 'Enter car year' }]}
          getValueFromEvent={e => parseInt(e.target.value)}  
        >
          <Input placeholder='Year' />
        </Form.Item>
        <Form.Item
          name='make'
          rules={[{ required: true, message: 'Enter car make' }]}
        >
          <Input placeholder='Make' />
        </Form.Item>
        <Form.Item
          name='model'
          rules={[{ required: true, message: 'Enter car model' }]}
        >
          <Input placeholder='Model' />
        </Form.Item>
        <Form.Item
          name='price'
          rules={[{ required: true, message: 'Enter car price' }]}
          getValueFromEvent={e => parseFloat(e.target.value)}  
        >
          <Input placeholder='Price' prefix="$" />
          </Form.Item>
        <Form.Item
          name='personId'
          rules={[{ required: true, message: 'Select a person' }]}
        >
          <Select placeholder="Select a person">
            {data.persons.map(person => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCar
