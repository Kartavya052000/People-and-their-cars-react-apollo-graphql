import logo from './logo.svg';
import './App.css';
import Persons from './components/list/Persons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddPerson from './components/Forms/AddPerson';
import AddCar from './components/Forms/AddCar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonDetails from './pages/PersonDetails';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
function App() {
  return (
    <ApolloProvider client={client} >
    <div className="App">
      <h1>PEOPLE AND THEIR CARS</h1>
    <Router>
        <Routes>
          {/* Main Routes */}
          <Route
            path="/"
            element={
              <>
              <AddPerson />
      <AddCar />
      <Persons />
              </>
            }
          />
           <Route
            path="/person/:id"
            element={
              <>
                <PersonDetails />
              </>
            }
          />
          </Routes>
          </Router>
      
    </div>
    </ApolloProvider>
  );
}

export default App;
