import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMyContext, addReply } from '../context/Provider';
import Replies from './Replies';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

function Description(props) {
    const { dispatch } = useMyContext();
    const location = useLocation();
    const navigate = useNavigate();
    
    console.log('Location state:', location.state);

    const { character, replyInfo } = location.state || {};

    const [entry, setEntry] = useState({
        name: "",
        comment: "",
    });

    const [replies, setReplies] = useState(location.state?.replies || []);

    useEffect(() => {
        if (character) {
            async function fetchReplies() {
                try {
                    const response = await axios.get(`/api/comments/${character.name}`);  // Fetch replies by character name
                    setReplies(response.data);
                } catch (err) {
                    console.error('Error fetching comments:', err);
                }
            }

            fetchReplies();
        }
    }, [character]);

    if (!character) {
        return (
            <div>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
                Character information not available.
            </div>
        );
    }

    const charImg = '/images/' + character.image;

    function submit(e) {
        if (entry.name && entry.comment && character) {
            const replyData = {
                name: entry.name,
                comment: entry.comment,
                characterName: character.name,  
            };

            console.log("Reply Data:", replyData); 

            axios.post('http://localhost:5000/api/comments', replyData)  
                .then(response => {
                    setReplies([...replies, response.data]);  
                    setEntry({ name: "", comment: "" });  
                })
                .catch(err => {
                    console.error('Error saving reply:', err);
                });

            e.preventDefault();
        }
    }

    function update(e) {
        const { name, value } = e.target;
        setEntry(prevEntry => ({
            ...prevEntry,
            [name]: value
        }));
    }

    return (
        <div className='character-info'>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
            <h3>{character.name}</h3>
            <img src={charImg} alt={character.name} />
            <p>{character.bio}</p>

            <form onSubmit={submit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    onChange={update} 
                    value={entry.name} 
                />
                <input 
                    type="text" 
                    placeholder="Comment" 
                    name="comment" 
                    onChange={update} 
                    value={entry.comment} 
                />
                <button type="submit">Add Reply</button>
            </form>

            <div className='replies-section'>
                {replies.map((rep, index) => (
                    <Replies key={index} rep={rep} />
                ))}
            </div>
        </div>
    );
}

export default Description;
