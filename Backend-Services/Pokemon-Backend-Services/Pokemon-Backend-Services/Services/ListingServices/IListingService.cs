using Pokemon_Backend_Services.Models;

namespace Pokemon_Backend_Services.Services.ListingServices
{
    public interface IListingService
    {
        public Task<List<Listing>> getAllListing();
    }
}
