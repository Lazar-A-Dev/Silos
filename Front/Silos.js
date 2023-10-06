export class Silos{
    constructor(id, nazivSilosa, kapacitet, popunjenost, vlaznost){
        this.id = id;
        this.nazivSilosa = nazivSilosa;
        this.kapacitet = kapacitet;
        this.popunjenost = popunjenost;
        this.vlaznost = vlaznost;

        this.container = null;
    }

    vratiSilosId(){
        return this.id;
    }

    crtajSilos(host, kompanija){
        let graf = document.createElement("div");
        graf.className = "graf";
        host.appendChild(graf);

        // var idSilosa = parseInt(this.container.querySelector(".silosSelect").value);
        // var idRadnika = parseInt(this.container.querySelector(".radnikSelect").value);

        //console.log("Id silosa: " + idSilosa + "|" + idRadnika);

        graf.addEventListener("dblclick", () => {
            const idSilosa = parseInt(kompanija.silosSelect.value);
            const idRadnika = parseInt(kompanija.radnikSelect.value);
            izprazniSilos(idSilosa, idRadnika);
        })

        let chart = document.createElement("div");
        chart.className = "chart";
        graf.appendChild(chart);

        var podaci = "(" + this.nazivSilosa + ") - " + this.popunjenost + "/" + this.kapacitet + "(Vlaga): " + this.vlaznost + "%";


        let popuna = document.createElement("div");
        popuna.style.flexGrow = this.popunjenost / this.kapacitet;
        popuna.innerHTML = podaci;
        popuna.className = "popuna";

        if (this.vlaznost >= 0 && this.vlaznost <= 20) {
            popuna.classList.add("zelena-popuna");
        }

        if(this.vlaznost >= 21 && this.vlaznost <= 40){
            popuna.classList.add("plava-popuna");
        }

        if(this.vlaznost >= 41 && this.vlaznost <= 60){
            popuna.classList.add("zuta-popuna");
        }

        if(this.vlaznost >= 61 && this.vlaznost <= 80){
            popuna.classList.add("narandzasta-popuna");
        }

        if(this.vlaznost >= 81 && this.vlaznost <= 100){
            popuna.classList.add("crvena-popuna");
        }

        chart.appendChild(popuna);
    }

    async izprazniSilos(idSilosa, idRadnika){
        var response = await fetch(`http://localhost:5082/Silos/IzprazniSilos/${idSilosa}/${idRadnika}`, {
            method: "PUT"
        });

        //var data = await response.json();
    }
}