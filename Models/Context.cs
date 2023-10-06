using Microsoft.EntityFrameworkCore;

namespace Models{
    public class Context:DbContext{
        public DbSet<Kompanija> Kompanije{get; set;}
        public DbSet<Silos> Silosi{get; set;}
        public DbSet<Radnik> Radnici{get; set;}
        public Context(DbContextOptions options) : base(options){

        }
    }
}