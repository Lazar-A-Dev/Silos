export class Radnik {
    constructor(id, nazivRadnika, izpraznio) {
        this.id = id;
        this.nazivRadnika = nazivRadnika;
        this.izpraznio = izpraznio;

        this.container = null;
    }

    vratiRadnikId(){
        return this.id;
    }
}