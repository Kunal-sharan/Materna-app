import requests
from bs4 import BeautifulSoup
import time
from urllib.parse import urljoin, urlparse
import json
from typing import List, Dict, Optional
import re
import sys
import os

# Add the utils directory to Python path
utils_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'utils')
sys.path.append(utils_path)

try:
    from logger import setup_logger
    from config import Config
    print("✓ Successfully imported from utils")
except ImportError as e:
    print(f"Could not import from utils: {e}")
    # Fallback if utils is not available
    import logging
    def setup_logger(name):
        logger = logging.getLogger(name)
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            logger.setLevel(logging.INFO)
        return logger
    
    class Config:
        USER_AGENT = "Materna-App Research Bot"
        REQUEST_DELAY = 2
        TIMEOUT = 30
        SCRAPED_DATA_DIR = "../scraped_data"

class BaseScraper:
    def __init__(self, source_name: str):
        self.source_name = source_name
        self.logger = setup_logger(f"scraper.{source_name}")
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': getattr(Config, 'USER_AGENT', 'Materna-App Bot')
        })
        self.scraped_data = []

    def fetch_url(self, url: str) -> Optional[str]:
        """Fetch HTML content from a URL"""
        try:
            timeout = getattr(Config, 'TIMEOUT', 30)
            response = self.session.get(url, timeout=timeout)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            self.logger.error(f"Error fetching {url}: {e}")
            return None

    def extract_main_content(self, html: str, url: str) -> Dict:
        """Extract clean text from HTML with metadata"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove unwanted elements
        for element in soup(["script", "style", "nav", "footer", "aside", "header"]):
            element.decompose()
        
        # Try to find main content area
        main_content = soup.find('main') or soup.find('article') or soup.find('div', class_=re.compile(r'content|main'))
        
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

    def scrape_urls(self, urls: List[str], output_file: str) -> List[Dict]:
        """Scrape multiple URLs and save results"""
        scraped_data = []
        delay = getattr(Config, 'REQUEST_DELAY', 2)
        
        for url in urls:
            self.logger.info(f"Scraping: {url}")
            html = self.fetch_url(url)
            
            if html:
                content = self.extract_main_content(html, url)
                scraped_data.append(content)
                self.logger.info(f"✓ Successfully scraped: {content['title']}")
            
            time.sleep(delay)
        
        # Save to file
        output_dir = getattr(Config, 'SCRAPED_DATA_DIR', '../scraped_data')
        output_path = os.path.join(output_dir, output_file)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(scraped_data, f, indent=2, ensure_ascii=False)
        
        self.logger.info(f"Saved {len(scraped_data)} documents to {output_path}")
        return scraped_data

    def find_and_follow_links(self, base_url: str, pattern: str, max_pages: int = 10) -> List[str]:
        """Find and follow links that match a pattern"""
        self.logger.info(f"Finding links from {base_url} matching pattern: {pattern}")
        
        html = self.fetch_url(base_url)
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'html.parser')
        links = []
        
        for a in soup.find_all('a', href=True):
            href = a['href']
            full_url = urljoin(base_url, href)
            
            if re.search(pattern, full_url) and full_url not in links:
                links.append(full_url)
                
                if len(links) >= max_pages:
                    break
        
        return links

# Test if run directly
if __name__ == "__main__":
    print("BaseScraper class loaded successfully!")
    print("This file is meant to be imported, not run directly.")

#%%
#%% 
#. base_scraper.py - The Core Engine 
 
#Purpose: Contains the main scraping logic that all other scrapers inherit from 
#Responsibilities: 
 
#Fetches web pages using HTTP requests 
#Extracts clean text from HTML (removes scripts, nav, footers) 
#Handles errors and rate limiting 
#Saves data to JSON files 
#Can follow links to discover more content 
