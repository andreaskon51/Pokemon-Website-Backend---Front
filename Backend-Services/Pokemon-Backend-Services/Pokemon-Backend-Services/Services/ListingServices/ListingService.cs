using Pokemon_Backend_Services.Models;

namespace Pokemon_Backend_Services.Services.ListingServices
{
    public class ListingService : IListingService
    {
        private readonly  PokemonDbContext _dbContext;

        public ListingService(PokemonDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Listing>> getAllListing()
        {
            try
            {
                var list = _dbContext.Listing.ToList();
                return list;
            }catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
