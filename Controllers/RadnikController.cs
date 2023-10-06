using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models{
    [ApiController]
    [Route ("[controller]")]
    public class RadnikController : ControllerBase{
        public Context _context;

        public RadnikController(Context context){
            _context = context;
        }

        [Route("VratiSveRadnike")]
        [HttpGet]
        public async Task<ActionResult>VratiSveRadnike(){
            try{
                var radnik = await _context.Radnici.ToListAsync();
                return Ok(radnik);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviRadnika")]
        [HttpPost]
        public async Task<ActionResult>NapraviRadnika(Radnik r){
            try{
                _context.Radnici.Add(r);
                await _context.SaveChangesAsync();
                return Ok("Uspesno napravljen radnik");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}