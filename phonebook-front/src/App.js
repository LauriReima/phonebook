import "./App.css";
import React from "react";

import Persons from "./Components/Persons";
import Form from "./Components/Form";
import personService from "./services/persons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
    };
  }
  addPerson = (e) => {
    e.preventDefault();
    const personObj = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.persons[this.state.persons.length - 1].id + 1,
    };
    const samaNimi = this.state.persons
      .map((p) => p.name)
      .includes(personObj.name);

    personObj.name === "" || personObj.number === ""
      ? alert("Täytä molemmat lokerot")
      : !samaNimi
      ? personService.create(personObj).then((persons) => {
          this.setState({
            persons: this.state.persons.concat(persons),
            newName: "",
            newNumber: "",
          });
        })
      : alert("Nimi löytyy jo listasta!!!");
  };
  deletePerson = (id) => {
    const nimi = this.state.persons.filter((p) => p.id === id)[0].name;
    return () => {
      if (
        window.confirm(`Haluatko varmasti poistaa käyttäjän ${nimi} tiedot?`)
      ) {
        personService.deleteP(id).then(
          this.setState({
            persons: this.state.persons.filter((p) => p.id !== id),
            newName: "",
            newNumber: "",
          })
        );
      }
    };
  };
  handleChangeName = (e) => {
    this.setState({
      newName: e.target.value,
    });
  };
  handleChangeNumber = (e) => {
    this.setState({
      newNumber: e.target.value,
    });
  };
  componentDidMount() {
    personService.getAll().then((persons) => {
      this.setState({ persons });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="form">
          <h2>Puhelinluettelo</h2>
          <Form
            addPerson={this.addPerson}
            state={this.state}
            handleChangeName={this.handleChangeName}
            handleChangeNumber={this.handleChangeNumber}
          />
        </div>
        <div className="numberList">
          <h2>Numerot</h2>
          <ul>
            {this.state.persons.map((p) => (
              <Persons
                key={p.name}
                persons={p}
                deletePerson={this.deletePerson(p.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
