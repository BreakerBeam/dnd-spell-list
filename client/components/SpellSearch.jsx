import React from 'react';

const SpellSearch = (props) => {
  const searchResults = [];
  searchResults.push(<p>{props.spellSearch.name}</p>)
  return (
    <div>
      <form onSubmit={props.searchSpell}>
          <label>
            Spell Search:
            <input type="text" value={props.spellField} onChange={props.updateSpellField} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {searchResults}
    </div>
    
  );
};

export default SpellSearch;