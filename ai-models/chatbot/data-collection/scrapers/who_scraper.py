import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from base_scraper import BaseScraper
from config import Config

class WHOScraper(BaseScraper):
    def __init__(self):
        super().__init__("WHO")
    
    def scrape(self):
        self.logger.info("Starting WHO scraping...")
        return self.scrape_urls(Config.WHO_URLS, "who_data.json")