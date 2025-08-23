# 🤰 Materna AI - Maternal Health Assistant

## 🏗️ Architecture

```
Materna-app/
├── 📁 ai-models/chatbot/
│   ├── 📁 data-collection/          # Web scraping pipeline
│   │   ├── 📁 scrapers/             # Website-specific scrapers
│   │   └── run_scrapers.py          # Main orchestration script
│   ├── 📁 utils/                    # Configuration & logging
│   ├── 📁 scraped_data/             # Raw JSON data from websites
│   ├── 📁 vector_db/                # FAISS vector database storage
│   └── 📁 logs/                     # Application logs
├── requirements.txt                 # Python dependencies
└── .env                            # Environment variables
```

## 🎯 Data Sources

Currently scraping:
- **CDC (Centers for Disease Control)**: Pregnancy guidelines, nutrition, complications
- **WHO (World Health Organization)**: Global maternal health standards
- **NHS UK**: Pregnancy week-by-week guides
- **ACOG**: Professional obstetric guidelines


Planned sources:
- Mayo Clinic, NIH, PubMed research papers, HuggingFace datasets


## 📊 Data Flow

1. **Scraping**: `run_scrapers.py` → `base_scraper.py` → Website
2. **Storage**: Raw JSON → `scraped_data/` directory
3. **Processing**: Cleaning → Chunking → Embedding
4. **Querying**: FAISS vector search → LLM context → Response

## 🛠️ Technical Stack

- **Web Scraping**: BeautifulSoup4, Requests, Selenium
- **NLP Processing**: NLTK, SpaCy, SentenceTransformers
- **Vector Database**: FAISS (Facebook AI Similarity Search)
- **AI Models**: OpenAI API, HuggingFace Transformers
- **Data Processing**: Pandas, NumPy

## 🔧 Configuration

Edit `ai-models/chatbot/utils/config.py` for:

```python
# Adjust scraping behavior
REQUEST_DELAY = 2  # Seconds between requests
TIMEOUT = 30       # Request timeout

# Modify text processing
CHUNK_SIZE = 1000    # Characters per chunk
CHUNK_OVERLAP = 200  # Overlap between chunks

# Add new data sources
NEW_SOURCE_URLS = ["https://new-source.com/pregnancy"]
```

## 📈 Monitoring & Logs

Check the logs directory for detailed operations:
```bash
# View recent logs
ls -la ../logs/

# Monitor in real-time
tail -f ../logs/scraping_*.log
```

Logs include:
- ✅ Successful page scrapes
- ⚠️ Warnings and retries
- ❌ Errors and failures
- 📊 Performance metrics

## 🗃️ Data Management

### Raw Data Location
```
ai-models/chatbot/scraped_data/
├── cdc_data.json
├── who_data.json
├── nhs_data.json
└── acog_data.json
```

### Vector Database Location
```
ai-models/chatbot/vector_db/
├── faiss_index
└── metadata.pkl
```






