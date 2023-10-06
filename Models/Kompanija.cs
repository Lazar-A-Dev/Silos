using System.ComponentModel.DataAnnotations;
namespace Models
{
    public class Kompanija
    {
        [Key]
        public int ID{get; set;}
        public List<Silos>? Silosi{get; set;}
        public List<Radnik>? Radnici{get; set;}
    }
}