using System.ComponentModel.DataAnnotations;
namespace Models
{
    public class Radnik
    {
        [Key]
        public int ID{get; set;}
        public string? NazivRadnika{get; set;}
        public int Izpraznio{get; set;}
    }
}