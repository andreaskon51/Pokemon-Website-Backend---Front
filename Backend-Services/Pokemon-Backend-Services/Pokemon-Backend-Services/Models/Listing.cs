using System.ComponentModel.DataAnnotations;

namespace Pokemon_Backend_Services.Models
{
    public class Listing
    {
        public Guid id { get; set; }

        public string sellerId { get; set; }

        [MaxLength(200)]
        public string title { get; set; }

        [MaxLength(100)]
        public string cardName { get; set; }

        [MaxLength(100)]
        public string set {  get; set; }

        [MaxLength(50)]
        public string cardNumber { get; set; }

        [MaxLength(100)]
        public string edition { get; set; }

        [MaxLength(50)]
        public string language { get; set; }

        [MaxLength(50)]
        public string condition { get; set; }

        [MaxLength(50)]
        public string rarity { get; set; }

        [MaxLength(50)]
        public string pokemonType { get; set; }

        public DateTime year { get; set; }

        public string description { get; set; }

        public List<string> images {  get; set; }

        [MaxLength(20)]
        public string listingType { get; set; }

        public decimal? price { get; set; }

        public string? tradePreferences { get; set; }

        public decimal? startingBid { get; set; }


        public decimal? currentBid { get; set; }

        public decimal? reservePrice { get; set; }

        public decimal? buyItNowPrice { get; set; }

        public DateTime? auctionEnd {  get; set; }

        public int bidCount { get; set; }

        public int quantity { get; set; }

        public int views { get; set; }

        public int watchers { get; set; }

        [MaxLength(20)]
        public string status { get; set; }

        public DateTime createdAt { get; set; }

        public DateTime updatedAt { get; set; }



    }
}
