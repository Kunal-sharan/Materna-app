import sys
import os

# Add the current directory to path to import base_scraper
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from base_scraper import BaseScraper

class CDCScraper(BaseScraper):
    def __init__(self):
        super().__init__("CDC")
    
    def scrape(self):
        """Scrape CDC pregnancy resources"""
        self.logger.info("Starting CDC scraping...")
        
        cdc_urls = [
            "https://www.cdc.gov/pregnancy",
            "https://www.cdc.gov/reproductivehealth/maternalinfanthealth/index.html"
        ]
        
        return self.scrape_urls(cdc_urls, "cdc_data.json")

# Test if run directly
if __name__ == "__main__":
    scraper = CDCScraper()
    data = scraper.scrape()
    print(f"Scraped {len(data)} documents from CDC")

#%%

#2. cdc_scraper.py - CDC-specific Scraper

#Purpose: Specialized scraper for CDC pregnancy resources
#What it scrapes:

#https://www.cdc.gov/pregnancy - General pregnancy information
#https://www.cdc.gov/reproductivehealth/maternalinfanthealth/index.html - Maternal health resources
#Data includes: Nutrition guidelines, prenatal care, pregnancy complications, FAQs