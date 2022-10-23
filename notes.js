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
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    });

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body,
        })
    
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken')
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
};