import React from 'react';

const SpellList = ({spellList, name, deleteSpell}) => {
  const allSpells = [];
  spellList.forEach( ele => {
      allSpells.push(<h3>{ele.name}</h3>)
      let ritual = '';
      if(ele.ritual) ritual = '(ritual)';
      allSpells.push(<i>Level {ele.level} {ele.school.name} {ritual}</i>)
      allSpells.push(<div><b>Casting Time: </b>{ele.casting_time}</div>)
      allSpells.push(<div><b>Range: </b>{ele.range}</div>)
      let material = '';
      if(ele.material) material = ele.material;
      allSpells.push(<div><b>Components: </b>{ele.components} {material}</div>)
      let concentration = '';
      if(ele.concentration) concentration = 'Concentration,';
      allSpells.push(<div><b>Duration: </b>{concentration} {ele.duration}</div>)
      let higherLevel = '';
      if(ele.higher_level) higherLevel = ele.higher_level;
      allSpells.push(<div><b>Description: </b>{ele.desc} {higherLevel}</div>)
      allSpells.push(
        <div>
          <br/>
          <button onClick={()=>deleteSpell(ele.index)}>Delete Spell</button>
        </div>)
  });
  
  return (
    <div>
      <h2>{name}'s Spell List</h2>
      {allSpells}
    </div> 
  );
};

export default SpellList;