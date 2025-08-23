#!/usr/bin/env python3
import sys
import os

# Add utils to path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'utils'))

from logger import setup_logger
from config import Config

# Import scrapers
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from scrapers.cdc_scraper import CDCScraper
from scrapers.who_scraper import WHOScraper

logger = setup_logger("main_pipeline")

def main():
    logger.info("Starting scraping pipeline...")
    
    # Run scrapers
    scrapers = [CDCScraper(), WHOScraper()]
    
    for scraper in scrapers:
        try:
            scraper.scrape()
        except Exception as e:
            logger.error(f"Error with {scraper.source_name}: {e}")
    
    logger.info("Scraping completed!")

if __name__ == "__main__":
    main()

    #%%
    # 
    # 5. run_scrapers.py - Orchestration Script

#Purpose: Main script that coordinates all scraping activities
#unction:

#Imports and runs all scrapers
#Handles errors gracefully
#Coordinates the entire pipeline