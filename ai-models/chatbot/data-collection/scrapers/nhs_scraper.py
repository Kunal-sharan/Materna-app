
import sys
import os

# Add the current directory to path to import base_scraper
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from base_scraper import BaseScraper

class NHSScraper(BaseScraper):
    def __init__(self):
        super().__init__("NHS UK")
    
    def scrape(self):
        """Scrape NHS UK pregnancy resources"""
        self.logger.info("Starting NHS UK scraping...")
        
        nhs_urls = [
            "https://www.nhs.uk/pregnancy/",
            "https://www.nhs.uk/pregnancy/week-by-week/",
            "https://www.nhs.uk/pregnancy/keeping-well/",
            "https://www.nhs.uk/pregnancy/related-conditions/common-symptoms/",
            "https://www.nhs.uk/pregnancy/your-pregnancy-care/"
        ]
        
        # Discover additional week-by-week pages
        additional_urls = self.find_and_follow_links(
            "https://www.nhs.uk/pregnancy/week-by-week/",
            r"week-by-week/\d",
            max_pages=15
        )
        
        all_urls = list(set(nhs_urls + additional_urls))
        return self.scrape_urls(all_urls, "nhs_data.json")

# Test if run directly
if __name__ == "__main__":
    scraper = NHSScraper()
    data = scraper.scrape()
    print(f"Scraped {len(data)} documents from NHS UK")
