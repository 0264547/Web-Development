import React ,{useState} from 'react';

function Description(props){

    var character = props.character
    var charImg = '/images/' + character.image;

    const [entry, setEntry] = useState({
      name:"",
      comment:"",
    });

    function submit(e){
      if(entry.name !== "" && entry.comment !== ""){
        props.replyInfo(entry);
        setEntry({
        name:"",
        comment:"",
      });
      e.preventDefault();
      }
    }

    function update(e){
      const {name,value} = e.target;
      setEntry(prevEntry => {
          return{
              ...prevEntry,
              [name]: value
          }
      });
    }

    return(
        <div className='character-info'>
          <h3>{character.name}</h3>
          <img src={charImg} alt={character.name}/>
          <p>{character.bio}</p>

          <form onSubmit={submit}>
            <input type="text" placeholder="Name" name="name" onChange={update} value={entry.name}></input>
            <input type="text" placeholder="Comment" name="comment" onChange={update} value={entry.comment}></input>
            <button type="submit">Add Reply</button>
          </form>
        </div>
    );
}

export default Description;
