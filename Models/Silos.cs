using System.ComponentModel.DataAnnotations;
namespace Models
{
    public class Silos
    {
        [Key]
        public int ID{get; set;}
        public string? NazivSilosa{get; set;}
        public int Kapacitet{get; set;}//max
        public int Popunjenost{get; set;}//trenutno
        public int Vlaznost{get; set;}//vlaga
    }
}