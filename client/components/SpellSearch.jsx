import React from 'react';

const SpellSearch = ({spellSearch, searchSpell, spellField, updateSpellField, addSpell}) => {
  const searchResults = [];
  if(spellSearch.hasOwnProperty('name')) {
    searchResults.push(<h3>{spellSearch.name}</h3>)
    let ritual = '';
    if(spellSearch.ritual) ritual = '(ritual)';
    searchResults.push(<i>Level {spellSearch.level} {spellSearch.school.name} {ritual}</i>)
    searchResults.push(<div><b>Casting Time: </b>{spellSearch.casting_time}</div>)
    searchResults.push(<div><b>Range: </b>{spellSearch.range}</div>)
    let material = '';
    if(spellSearch.material) material = spellSearch.material;
    searchResults.push(<div><b>Components: </b>{spellSearch.components} {material}</div>)
    let concentration = '';
    if(spellSearch.concentration) concentration = 'Concentration,';
    searchResults.push(<div><b>Duration: </b>{concentration} {spellSearch.duration}</div>)
    let higherLevel = '';
    if(spellSearch.higher_level) higherLevel = spellSearch.higher_level;
    searchResults.push(<div><b>Description: </b>{spellSearch.desc} {higherLevel}</div>)
    searchResults.push(
      <div>
        <br/>
        <button onClick={()=>addSpell()}>Add Spell</button>
      </div>)
  }
  if(spellSearch.hasOwnProperty('error')) {
    searchResults.push(<p>Spell cannot be found, try again</p>)
  }
  
  return (
    <div>
      <form onSubmit={searchSpell}>
          <label>
            Spell Look Up: 
            <input type="text" value={spellField} onChange={updateSpellField} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {searchResults}
    </div>
    
  );
};

export default SpellSearch;