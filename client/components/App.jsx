import React, {Component} from 'react';
import SpellSearch from './SpellSearch.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      spellList: [],
      spellSearch: {name:'fireball'},
      currentChar: '',
      createField: '',
      spellField: '',
    };
    this.loadChar = this.loadChar.bind(this);
    this.updateCreateField = this.updateCreateField.bind(this);
    this.updateSpellField = this.updateSpellField.bind(this);
    this.createChar = this.createChar.bind(this);
    this.getChars = this.getChars.bind(this);
    this.searchSpell = this.searchSpell.bind(this);
    }
  
  componentDidMount() {
    this.getChars();
  }

  updateCreateField(event) {
    this.setState({
      createField: event.target.value,
    });
  }

  updateSpellField(event) {
    this.setState({
      spellField: event.target.value,
    });
  }

  getChars() {
    fetch('/character')
      .then(response => response.json())
      .then(data => {
        this.setState({
          characters: data,
        });
      });
  }

  createChar(event) {
    fetch('/character', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({state:this.state.createField}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    this.getChars();
    this.setState({
        createField: '',
      });
    event.preventDefault();
  }

  loadChar(char) {
    this.setState({
      currentChar: char,
    });
  }

  deleteChar(char) {
    fetch('/character', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({state:char}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    this.getChars();  
  }

  searchSpell() {
    console.log(this.state.spellField);
    //fetch not working, need to make state lowercase,nospaces,slashes
    const fetchURL = `https://www.dnd5eapi.co/api/spells/${this.state.spellField}`
    fetch(fetchURL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          spellSearch: data,
          spellField: '',
        });
    });
  }

  render() {
    const characterList = [];
    const deleteList= [];
    this.state.characters.forEach( (char, i) => {
        characterList.push(<p key={i} onClick={() => this.loadChar(char)}>{char}</p>)
        deleteList.push(<p key={`d${i}`} onClick={() => this.deleteChar(char)}>{char}</p>)
    })
    return (
      <div>
        <div className="dropdown">
          <button className="dropbtn">Load Character</button>
            <div className="dropdown-content">
              {characterList}
            </div>
        </div> 
        <div className="dropdown">
          <button className="dropbtn">Delete Character</button>
            <div className="dropdown-content">
              {deleteList}
            </div>  
        </div>
        <form onSubmit={this.createChar}>
          <label>
            Create New Character:
            <input type="text" value={this.state.createField} onChange={this.updateCreateField} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <SpellSearch spellField={this.state.spellField} spellSearch={this.state.spellSearch} updateSpellField={this.updateSpellField} searchSpell={this.searchSpell}/>
      </div>
    );
  }
}

export default App;