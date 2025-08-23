#%%
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Scraping Configuration
    USER_AGENT = "Materna-App Research Bot (educational purpose)"
    REQUEST_DELAY = 1  # seconds between requests
    TIMEOUT = 30
    
    # Data Paths
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    DATA_DIR = os.path.join(BASE_DIR, "data-collection")
    SCRAPED_DATA_DIR = os.path.join(DATA_DIR, "scraped_data")
    VECTOR_DB_DIR = os.path.join(BASE_DIR, "vector_db")
    
    # Chunking Configuration
    CHUNK_SIZE = 1000
    CHUNK_OVERLAP = 200
    
    # Target Websites
    CDC_URLS = [
        "https://www.cdc.gov/pregnancy",
        "https://www.cdc.gov/reproductivehealth/maternalinfanthealth/index.html",
        "https://www.cdc.gov/reproductivehealth/maternalinfanthealth/pregnancy-complications.html"
    ]
    
    WHO_URLS = [
        "https://www.who.int/health-topics/maternal-health",
        "https://www.who.int/news-room/fact-sheets/detail/maternal-mortality"
    ]
    
    NHS_URLS = [
        "https://www.nhs.uk/pregnancy/",
        "https://www.nhs.uk/pregnancy/week-by-week/"
    ]
    
    ACOG_URLS = [
        "https://www.acog.org/womens-health",
        "https://www.acog.org/womens-health/faqs"
    ]

# Create directories if they don't exist
os.makedirs(Config.SCRAPED_DATA_DIR, exist_ok=True)
os.makedirs(Config.VECTOR_DB_DIR, exist_ok=True)

#%%

#3. config.py - Configuration Center

#Purpose: Stores all settings and paths
#Contains:

#API keys (from .env file)
#Website URLs to scrape
#Timeout and delay settings
#Directory paths for data storage