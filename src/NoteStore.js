import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class NoteStore{
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
        this.specificNote = null;
    }

    async getNotes() {
        try {
            const response = await fetch(`${SERVER}/notes`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            // this.data.map(e => JSON.parse(e))
            this.emitter.emit('GET_NOTES_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_NOTES_ERROR')
        }
    }

    async getNote(name) {
        try {
            // const response = await fetch(`${SERVER}/notes`)
            // if (!response.ok) {
            //     throw response
            // }
            // this.data = await response.json()
            // this.emitter.emit('GET_NOTES_SUCCESS')
            this.getNotes();
            
            this.specificNote = this.data.find(element => element.title = name);
            console.log(name + " " + this.specificNote)
            // return this.specificNote;
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_NOTES_ERROR')
        }
    }

    async addNote(note) {
        try {
            note.title = note.newtitle
            delete note.newtitle
            const response = await fetch(`${SERVER}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
                // body: {'newtitle':section.newtitle}
            })
            if (!response.ok) {
                throw response
            }
            this.getNotes()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_NOTE_ERROR')
        }
    }

    async saveNote(id, note) {
        try {
            const response = await fetch(`${SERVER}/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            if (!response.ok) {
                throw response
            }
            this.getNotes()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('SAVE_NOTE_ERROR')
        }
    }
}

const store = new NoteStore()

export default store