import sys
import os
import re
import time
from bs4 import BeautifulSoup

# Add the current directory to path to import base_scraper
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from base_scraper import BaseScraper

class ACOGScraper(BaseScraper):
    def __init__(self):
        super().__init__("ACOG")
        # ACOG might need different headers or handling
        self.session.headers.update({
            'User-Agent': 'Materna-App Research Bot (medical education purpose)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        })
    
    def scrape(self):
        """Scrape ACOG women's health resources"""
        self.logger.info("Starting ACOG scraping...")
        
        acog_urls = [
            "https://www.acog.org/womens-health",
            "https://www.acog.org/womens-health/faqs",
            "https://www.acog.org/womens-health/faqs/pregnancy",
            "https://www.acog.org/womens-health/faqs/postpartum",
            "https://www.acog.org/womens-health/faqs/prenatal-care"
        ]
        
        return self.scrape_urls(acog_urls, "acog_data.json")
    
    def extract_main_content(self, html: str, url: str):
        """Custom extraction for ACOG's website structure"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove unwanted elements specific to ACOG
        for element in soup(["script", "style", "nav", "footer", "aside", "header", 
                           "div.header", "div.footer", "div.sidebar"]):
            element.decompose()
        
        # Try to find main content - ACOG specific selectors
        main_content = (soup.find('main') or 
                       soup.find('article') or 
                       soup.find('div', class_=re.compile(r'content|main|body')) or
                       soup.find('div', id=re.compile(r'content|main|body')))
        
        if main_content:
            text = main_content.get_text(separator=' ', strip=True)
        else:
            text = soup.get_text(separator=' ', strip=True)
        
        # Clean text
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'\n+', '\n', text)
        
        # Get title
        title = soup.find('title')
        title_text = title.get_text() if title else "No Title Found"
        
        return {
            "url": url,
            "title": title_text,
            "text": text,
            "source": self.source_name,
            "timestamp": time.time()
        }

# Test if run directly
if __name__ == "__main__":
    scraper = ACOGScraper()
    data = scraper.scrape()
    print(f"Scraped {len(data)} documents from ACOG")
