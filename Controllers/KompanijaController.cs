using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models{
    [ApiController]
    [Route ("[controller]")]
    public class KompanijaController : ControllerBase{
        public Context _context;

        public KompanijaController(Context context){
            _context = context;
        }

        [Route("VratiSveKompanije")]
        [HttpGet]
        public async Task<ActionResult>VratiSveKompanije(){
            try{
                var komp = await _context.Kompanije.Include(s => s.Silosi).Include(r => r.Radnici).ToListAsync();
                return Ok(komp);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviKompaniju")]
        [HttpPost]
        public async Task<ActionResult>NapraviKompaniju(Kompanija k){
            try{
                _context.Kompanije.Add(k);
                await _context.SaveChangesAsync();
                return Ok("Uspesno napravljena kompanija");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajSilosKompaniji")]
        [HttpPut]
        public async Task<ActionResult> DodajSilosKompaniji(int idSilos){
            try{
                var komp = await _context.Kompanije.Include(s => s.Silosi).FirstOrDefaultAsync(k => k.ID == 1);
                if(komp == null)
                    return BadRequest("Kompanija sa ovim id-jem ne postoji");
                var silos = await _context.Silosi.FindAsync(idSilos);

                komp.Silosi.Add(silos);
                await _context.SaveChangesAsync();
                return Ok("Uspesno dodat silos kompaniji");

            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajRadnikaKompaniji")]
        [HttpPut]
        public async Task<ActionResult> DodajRadnikaKompaniji(int idRadnika){
            try{
                var komp = await _context.Kompanije.Include(r => r.Radnici).FirstOrDefaultAsync(k => k.ID == 1);
                if(komp == null)
                    return BadRequest("Kompanija sa ovim id-jem ne postoji");
                var radnik = await _context.Radnici.FindAsync(idRadnika);

                komp.Radnici.Add(radnik);
                await _context.SaveChangesAsync();
                return Ok("Uspesno dodat radnik kompaniji");

            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}