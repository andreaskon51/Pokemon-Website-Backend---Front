using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pokemon_Backend_Services.Models;
using Pokemon_Backend_Services.Services.ListingServices;

namespace Pokemon_Backend_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingService _listingService;

        public ListingController(IListingService listingService)
        {
             _listingService = listingService;
        }

        [HttpGet("getAllListing")]
        public async Task<ActionResult<List<Listing>>> getAllListing()
        {
            var list = await _listingService.getAllListing();
            return Ok(list);
        }
    }
}
