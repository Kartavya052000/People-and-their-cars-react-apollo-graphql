import { Card } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../Forms/UpdatePerson";
import { Link } from "react-router-dom";
import RemoveButton from "../buttons/RemoveButton";
import UpdateCar from "../Forms/UpdateCar"; 

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editCarMode, setEditCarMode] = useState(false); 
  const { id, firstName, lastName, cars, allUsers } = props;
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleCarEditClick = () => {
    setEditCarMode(!editCarMode); 
  };

  return (
    <div>
      {/* <Link to={ */}
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveButton id={id} type="person" />,
          ]}
        >
          <h3>
            {firstName} {lastName}
          </h3>
          {cars && cars.length > 0 ? (
            <div>
              <h4>Cars:</h4>
              {cars.map((car, index) => (
                <Card
                  key={`${id}-car-${index}`}
                  type="inner"
                  title={`${car.year} ${car.make} ${car.model} -> $${car.price}`}
                  actions={[
                    <EditOutlined key="edit" onClick={handleCarEditClick} />,
                    <RemoveButton id={car.id} personId={id} type="car" />,
                  ]}
                >
                  {editCarMode && (
                    <UpdateCar
                      car={car} // Pass the car object to UpdateCar
                      onButtonClick={handleCarEditClick} // Callback to exit edit mode
                      allUsers={allUsers} // Pass all users to UpdateCar
                      id={id}
                    />
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p>No cars available</p>
          )}
          <Link to={`/person/${id}`}>Learn More</Link>{" "}
          {/* Link to the person's details page */}
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "1100px",
    marginBottom: "20px",
  },
});

export default PersonCard;
