import fs from 'fs'
import Vue from 'vue'

export default class FileWrapper {
    constructor({path, stats, name}) {
        this.path = path
        this.stats = stats
        this.name = name
    }
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) return reject(err)
                return resolve(data)
            })
        })
    }
    write() {

    }
}