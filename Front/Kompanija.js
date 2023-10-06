
export class Kompanija {
    constructor(id) {
        this.id = id;

        this.listaSilosa = [];
        this.listaRadnika = [];

        this.container = null;
    }

    dodajListiSilosa(silos) {
        this.listaSilosa.push(silos);
    }

    dodajListiRadnika(radnik) {
        this.listaRadnika.push(radnik);
    }

    crtajKompaniju(host) {
        this.container = document.createElement("div");
        this.container.className = "glavni";
        host.appendChild(this.container);

        var levi = document.createElement("div");
        levi.className = "levi";
        this.container.appendChild(levi);

        var desni = document.createElement("div");
        desni.className = "desni";
        this.container.appendChild(desni);

        //Red1

        var red1 = document.createElement("div");
        red1.className = "red1";
        levi.appendChild(red1);

        var silosLabel = document.createElement("label");
        silosLabel.innerHTML = "Silos: ";
        silosLabel.className = "silosLabel";
        red1.appendChild(silosLabel);

        var silosSelect = document.createElement("select");
        silosSelect.className = "silosSelect";
        red1.appendChild(silosSelect);

        this.listaSilosa.forEach(silos => {
            var option = document.createElement("option");
            option.value = silos.vratiSilosId();
            option.text = silos.nazivSilosa; // Možete prilagoditi tekst prikazivanja ovde
            silosSelect.appendChild(option);
        });

        //Red1

        //Red2

        var red2 = document.createElement("div");
        red2.className = "red2";
        levi.appendChild(red2);

        var dopuniLabel = document.createElement("label");
        dopuniLabel.innerHTML = "Dopuni: ";
        dopuniLabel.className = "dopuniLabel";
        red2.appendChild(dopuniLabel);

        var dopuniInput = document.createElement("input");
        dopuniInput.type = "number";
        dopuniInput.min = 0;
        dopuniInput.className = "dopuniInput";
        red2.appendChild(dopuniInput);

        var tona = document.createElement("label");
        tona.innerHTML = "t";
        tona.className = "tona";
        red2.appendChild(tona);

        //Red2

        //Red3

        var red3 = document.createElement("div");
        red3.className = "red3";
        levi.appendChild(red3);

        var vlagaLabel = document.createElement("label");
        vlagaLabel.innerHTML = "Vlaznost: ";
        vlagaLabel.className = "vlagaLabel";
        red3.appendChild(vlagaLabel);

        var vlagaInput = document.createElement("input");
        vlagaInput.type = "number";
        vlagaInput.min = 0;
        vlagaInput.className = "vlagaInput";
        red3.appendChild(vlagaInput);

        var procenat = document.createElement("label");
        procenat.innerHTML = "%";
        procenat.className = "procenat";
        red3.appendChild(procenat);

        //Red3

        //Red4 Dugme

        var red4 = document.createElement("div");
        red4.className = "red4";
        levi.appendChild(red4);

        var dugmeDodaj = document.createElement("button");
        dugmeDodaj.className = "dugmeDodaj";
        dugmeDodaj.innerHTML = "Dodaj";
        red4.appendChild(dugmeDodaj);

        dugmeDodaj.onclick = (ev) => this.Dopuni();
        //Red4 Dugme

        //Red4 NazivRadnika

        var red5 = document.createElement("div");
        red5.className = "red5";
        levi.appendChild(red5);

        var radnikLabel = document.createElement("label");
        radnikLabel.className = "radnikLabel";
        radnikLabel.innerHTML = "Radnik: ";
        red5.appendChild(radnikLabel);

        var radnikSelect = document.createElement("select");
        radnikSelect.className = "radnikSelect";
        red5.appendChild(radnikSelect);


        this.listaRadnika.forEach(radnik => {
            var option = document.createElement("option");
            option.value = radnik.vratiRadnikId();
            option.text = radnik.nazivRadnika;
            radnikSelect.appendChild(option);
        });



        //Red4 NazivRadnika

        //Desni

        this.listaSilosa.forEach(s => {
            s.crtajSilos(desni);
        })

        //Desni
    }

    async Dopuni() {
        var idSilosa = parseInt(this.container.querySelector(".silosSelect").value);
        var kolicina = parseInt(this.container.querySelector(".dopuniInput").value);
        var vlaga = parseInt(this.container.querySelector(".vlagaInput").value);

        //console.log(idSilosa, kolicina, vlaga);

        var response = await fetch(`http://localhost:5082/Silos/DodajSilosu/${idSilosa}/${kolicina}/${vlaga}`, {
            method: "PUT"
        });

        //var data = await response.json();

    }

    get silosSelect() {
        return this.container.querySelector(".silosSelect");
    }
    
      get radnikSelect() {
        return this.container.querySelector(".radnikSelect");
    }
}