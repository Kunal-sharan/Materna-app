#!/usr/bin/env python3
import sys
import os

# Add the scrapers directory to path
sys.path.append('scrapers')

from base_scraper import BaseScraper

def main():
    print("Testing BaseScraper...")
    
    # Create a test scraper
    scraper = BaseScraper('TestScraper')
    print("✓ BaseScraper created successfully!")
    
    # Test a simple URL
    test_url = "https://www.cdc.gov/pregnancy"
    print(f"Testing URL: {test_url}")
    
    html = scraper.fetch_url(test_url)
    if html:
        print("✓ Successfully fetched HTML content!")
        content = scraper.extract_main_content(html, test_url)
        print(f"✓ Extracted content: {content['title']}")
        print(f"Content length: {len(content['text'])} characters")
    else:
        print("✗ Failed to fetch HTML content")

if __name__ == "__main__":
    main()
