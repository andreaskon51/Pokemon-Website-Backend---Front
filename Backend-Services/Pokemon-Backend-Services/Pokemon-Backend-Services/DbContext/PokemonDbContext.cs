using Microsoft.EntityFrameworkCore;
using Pokemon_Backend_Services.Models;


public class PokemonDbContext: DbContext
    {

        public PokemonDbContext(DbContextOptions<PokemonDbContext> options) : base(options)
        {

        }
        
        public DbSet<Listing> Listing { get; set; }
        
    }

