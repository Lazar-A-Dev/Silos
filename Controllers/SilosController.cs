using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models{
    [ApiController]
    [Route ("[controller]")]
    public class SilosController : ControllerBase{
        public Context _context;

        public SilosController(Context context){
            _context = context;
        }

        [Route("VratiSveSilose")]
        [HttpGet]
        public async Task<ActionResult>VratiSveSilose(){
            try{
                var silos = await _context.Silosi.ToListAsync();
                return Ok(silos);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviSilos")]
        [HttpPost]
        public async Task<ActionResult>NapraviSilos(Silos s){
            try{
                _context.Silosi.Add(s);
                await _context.SaveChangesAsync();
                return Ok("Uspesno napravljen silos");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajSilosu/{idSilosa}/{kolicina}/{vlaga}")]
        [HttpPut]
        public async Task<ActionResult>DodajSilosu(int idSilosa, int kolicina, int vlaga){
            try{
                var silos = await _context.Silosi.FindAsync(idSilosa);
                if(silos == null)
                    return BadRequest("Silos sa ovim id-jem ne postoji");

                if(silos.Popunjenost + kolicina > silos.Kapacitet)
                    return BadRequest("Nije moguce popuniti silos preko njegovog kapaciteta");

                if(silos.Vlaznost + vlaga > 100)
                return BadRequest("Nije moguce povecati vlagu preko 100%");

                silos.Popunjenost+=kolicina;
                silos.Vlaznost+=vlaga;

                await _context.SaveChangesAsync();
                return Ok("Uspesno dopunjen silos");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("IzprazniSilos/{idSilosa}/{idRadnika}")]
        [HttpPut]
        public async Task<ActionResult>IzprazniSilos(int idSilosa, int idRadnika){
            try{
                
                var radnik = await _context.Radnici.FindAsync(idRadnika);
                if(radnik == null)
                    return BadRequest("Radnik sa ovim id-jem ne postoji");

                var silos = await _context.Silosi.FindAsync(idSilosa);
                if(silos == null)
                    return BadRequest("Silos sa ovim id-jem ne postoji");

                radnik.Izpraznio+=silos.Popunjenost;
                silos.Popunjenost=0;
                silos.Vlaznost=0;

                await _context.SaveChangesAsync();
                return Ok("Uspesno izpraznjen");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}