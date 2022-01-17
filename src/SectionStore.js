import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class SectionStore{
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getSections() {
        try {
            const response = await fetch(`${SERVER}/sections`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_SECTIONS_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_SECTION_ERROR')
        }
    }

    async addSection(section) {
        try {
            // section.title = section.newtitle
            // delete section.newtitle
            const response = await fetch(`${SERVER}/sections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(section)
                // body: {'newtitle':section.newtitle}
            })
            if (!response.ok) {
                throw response
            }
            this.getSections()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_SECTION_ERROR')
        }
    }
}

const store = new SectionStore()

export default store