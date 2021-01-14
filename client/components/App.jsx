import React, {Component} from 'react';
import SpellSearch from './SpellSearch.jsx';
import SpellList from './SpellList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      currentChar: '',
      spellList: [],
      createField: '',
      spellField: '',
      spellSearch: {},
    };
    this.loadChar = this.loadChar.bind(this);
    this.updateCreateField = this.updateCreateField.bind(this);
    this.updateSpellField = this.updateSpellField.bind(this);
    this.createChar = this.createChar.bind(this);
    this.getChars = this.getChars.bind(this);
    this.searchSpell = this.searchSpell.bind(this);
    this.addSpell = this.addSpell.bind(this);
    this.deleteSpell = this.deleteSpell.bind(this);
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
        body: JSON.stringify({name:this.state.createField}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    this.getChars();
    this.loadChar(this.state.createField);
    this.setState({
        createField: '',
      });
    event.preventDefault();
  }

  loadChar(char) {
    this.setState({
      currentChar: char,
    });
    fetch(`/updatespells/${char}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        spellList: data,
      });
    });
  }

  deleteChar(char) {
    fetch('/character', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:char}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    this.getChars();
    if(this.state.currentChar === char) this.loadChar(''); 
  }

  searchSpell(event) {
    const endUrl = this.state.spellField.replace(/[ \/]/g,'-').toLowerCase()
    const fetchURL = `https://www.dnd5eapi.co/api/spells/${endUrl}`
    fetch(fetchURL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          spellSearch: data,
          spellField: '',
        });
    });
    event.preventDefault();
  }

  addSpell() {
    const newList = this.state.spellList;
    newList.push(this.state.spellSearch);
    this.setState({
      spellList: newList,
    }) 
    fetch('/updatespells', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({name:this.state.currentChar,spells:newList}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    this.setState({
      spellField: '',
      spellSearch: {},
    })
  }

  deleteSpell(spell) {
    const newList = [];
    this.state.spellList.forEach( ele => {
      if(ele.index !== spell) newList.push(ele);
    })
    this.setState({
      spellList: newList,
    }) 
    fetch('/updatespells', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({name:this.state.currentChar,spells:newList}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  render() {
    const characterList = [];
    const deleteList= [];
    this.state.characters.forEach( (char, i) => {
        characterList.push(<p key={i} onClick={() => this.loadChar(char)}>{char}</p>)
        deleteList.push(<p key={`d${i}`} onClick={() => this.deleteChar(char)}>{char}</p>)
    })
    let loaded = <div></div>;
    if(this.state.currentChar !== '') loaded = 
      <div>
      <SpellSearch spellField={this.state.spellField} spellSearch={this.state.spellSearch} updateSpellField={this.updateSpellField} searchSpell={this.searchSpell} addSpell={this.addSpell}/>
      <br/>
      <SpellList spellList={this.state.spellList} name={this.state.currentChar} deleteSpell={this.deleteSpell}/>
      </div>
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
        {loaded}
      </div>
    );
  }
}

export default App;