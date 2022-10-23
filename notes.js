const fs = require('fs');
const chalk = require('chalk');


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

const getNoteList = () => { 
    const notes = loadNotes();

    if (notes.length === 0) {
        console.log(chalk.red.inverse('No notes found'))
    } else {
        console.log(chalk.green.inverse('Your Notes:'))
        notes.forEach((element) => {
            console.log(chalk.green('- ' + element.title))
        });
    }
 };

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
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const otherNotes = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length > otherNotes.length) {
        saveNotes(otherNotes);
        console.log(chalk.green.inverse('Note removed successfully!'))
    } else {
        console.log(chalk.red.inverse('Note does not exists'));
    }
}

module.exports = {
    getNoteList: getNoteList,
    addNote: addNote,
    removeNote: removeNote,
};