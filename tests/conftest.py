import pytest
import os
import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Add the project root to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Test configuration
BASE_URL = "http://localhost:3000"  # Default Next.js development server
TIMEOUT = 10  # Default timeout for web elements

@pytest.fixture(scope="session")
def base_url():
    """Base URL for the application under test."""
    return os.getenv("BASE_URL", BASE_URL)

@pytest.fixture(scope="session")
def timeout():
    """Default timeout for web elements."""
    return int(os.getenv("TIMEOUT", TIMEOUT))

@pytest.fixture(scope="function")
def driver():
    """Selenium WebDriver fixture with Chrome browser."""
    chrome_options = Options()
    
    # Headless mode for CI/CD environments
    if os.getenv("HEADLESS", "false").lower() == "true":
        chrome_options.add_argument("--headless")
    
    # Additional options for stability
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-plugins")
    
    # Fix for macOS ARM64
    chrome_options.add_argument("--remote-debugging-port=9222")
    
    try:
        # Initialize WebDriver with proper ChromeDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.implicitly_wait(10)
        
        yield driver
        
        # Cleanup
        driver.quit()
    except Exception as e:
        # If ChromeDriver fails, skip UI tests
        pytest.skip(f"ChromeDriver not available: {e}")

@pytest.fixture(scope="function")
def wait(driver):
    """WebDriverWait fixture for explicit waits."""
    return WebDriverWait(driver, 10)

@pytest.fixture(scope="session")
def test_data():
    """Test data for various test scenarios."""
    return {
        "valid_contact": {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message for contact form validation."
        },
        "invalid_contact": {
            "name": "",
            "email": "invalid-email",
            "message": ""
        },
        "navigation_links": [
            "Home",
            "About",
            "Projects", 
            "News",
            "Contact"
        ]
    }

def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "slow: marks tests as slow (deselect with '-m \"not slow\"')"
    )
    config.addinivalue_line(
        "markers", "integration: marks tests as integration tests"
    )
    config.addinivalue_line(
        "markers", "ui: marks tests as UI tests"
    )
    config.addinivalue_line(
        "markers", "api: marks tests as API tests"
    )
    config.addinivalue_line(
        "markers", "smoke: marks tests as smoke tests"
    )
    config.addinivalue_line(
        "markers", "regression: marks tests as regression tests"
    )

def pytest_collection_modifyitems(config, items):
    """Modify test collection to add markers based on test names."""
    for item in items:
        if "test_ui_" in item.name:
            item.add_marker(pytest.mark.ui)
        elif "test_api_" in item.name:
            item.add_marker(pytest.mark.api)
        elif "test_integration_" in item.name:
            item.add_marker(pytest.mark.integration) 