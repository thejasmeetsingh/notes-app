const fs = require('fs');

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const getNotes = () => { return "Your Notes..." };

const addNote = (title, body) => {
    const notes = loadNotes();
    
    notes.push({
        title: title,
        body: body,
    })

    saveNotes(notes);
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
};