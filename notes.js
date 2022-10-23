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

const removeNote = (title) => {
    const notes = loadNotes();
    const otherNotes = notes.filter((note) => {
        note.title !== title
    })

    if (otherNotes.length === 0) {
        console.log('Note does not exists');
    } else {
        saveNotes(otherNotes);
        console.log('Note removed successfully!')
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
};