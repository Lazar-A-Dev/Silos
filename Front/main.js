import { Kompanija } from "./Kompanija.js";
import { Silos } from "./Silos.js";
import { Radnik } from "./Radnik.js";

var response = await fetch("http://localhost:5082/Kompanija/VratiSveKompanije");
var data = await response.json();
data.forEach( async k => {
    var kompanija = new Kompanija(k["id"]);
    var silosi = k["silosi"];
    var radnici = k["radnici"];

    silosi.forEach(s => {
        var silos = new Silos(s["id"], s["nazivSilosa"], s["kapacitet"], s["popunjenost"], s["vlaznost"]);
        kompanija.dodajListiSilosa(silos);
    })
    
    radnici.forEach(r => {
        var radnik = new Radnik(r["id"], r["nazivRadnika"], r["izpraznio"]);
        kompanija.dodajListiRadnika(radnik);
    })

    console.log(kompanija);
    kompanija.crtajKompaniju(document.body);
});


