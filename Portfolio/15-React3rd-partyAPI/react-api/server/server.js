const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',  
}));

const uri = `mongodb+srv://0264547:PtRTk33hxe3KNT@cluster0.rld85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const ReplySchema = new mongoose.Schema({
    characterName: { type: String, required: true },  
    name: { type: String, required: true },
    comment: { type: String, required: true },
});

const Reply = mongoose.model('Reply', ReplySchema);

app.get('/api/comments/:characterName', async (req, res) => {
    const { characterName } = req.params;
    try {
        const replies = await Reply.find({ characterName }); 
        res.status(200).json(replies);
    } catch (err) {
        console.error('Error fetching replies:', err);
        res.status(500).json({ message: 'Failed to fetch replies' });
    }
});


app.post('/api/comments', async (req, res) => {
    const { name, comment, characterName } = req.body;
    
    if (!characterName) {
        return res.status(400).send("Character name is required.");
    }

    const newReply = new Reply({
        name: name,
        comment: comment,
        characterName: characterName,  
    });

    try {
        const savedReply = await newReply.save();
        res.json(savedReply);
    } catch (err) {
        console.error("Error saving reply:", err);
        res.status(500).send("Error saving reply.");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
