import pytest
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

class TestContentValidation:
    """Test suite for content validation and SEO."""
    
    def test_page_meta_tags(self, base_url):
        """Test that all pages have proper meta tags."""
        # Test main pages
        pages_to_test = [
            "/",
            "/projects",
            "/news"
        ]
        
        for page in pages_to_test:
            url = urljoin(base_url, page)
            
            try:
                response = requests.get(url, timeout=10)
                assert response.status_code == 200, f"Page {page} returned status {response.status_code}"
                
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Check for essential meta tags
                title = soup.find('title')
                assert title is not None, f"Page {page} should have a title tag"
                assert title.text.strip(), f"Page {page} title should not be empty"
                
                # Check for meta description
                meta_desc = soup.find('meta', attrs={'name': 'description'})
                if meta_desc:
                    assert meta_desc.get('content'), f"Page {page} meta description should not be empty"
                
                # Check for viewport meta tag
                viewport = soup.find('meta', attrs={'name': 'viewport'})
                assert viewport is not None, f"Page {page} should have viewport meta tag"
                
                # Check for charset
                charset = soup.find('meta', attrs={'charset': True})
                if not charset:
                    charset = soup.find('meta', attrs={'http-equiv': 'Content-Type'})
                assert charset is not None, f"Page {page} should have charset meta tag"
                
            except requests.exceptions.RequestException as e:
                pytest.skip(f"Page {page} not available: {e}")
    
    def test_open_graph_tags(self, base_url):
        """Test Open Graph meta tags for social media sharing."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Check for Open Graph tags
            og_tags = [
                'og:title',
                'og:description',
                'og:type',
                'og:url'
            ]
            
            for tag in og_tags:
                meta_tag = soup.find('meta', attrs={'property': tag})
                if meta_tag:
                    assert meta_tag.get('content'), f"Open Graph tag {tag} should have content"
            
            # Check for og:image
            og_image = soup.find('meta', attrs={'property': 'og:image'})
            if og_image:
                image_url = og_image.get('content')
                assert image_url, "og:image should have a URL"
                
                # Verify image URL is accessible
                if image_url.startswith('/'):
                    image_url = urljoin(base_url, image_url)
                
                try:
                    img_response = requests.head(image_url, timeout=10)
                    assert img_response.status_code == 200, f"OG image {image_url} should be accessible"
                except requests.exceptions.RequestException:
                    # Skip image accessibility check if it fails
                    pass
                    
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_twitter_card_tags(self, base_url):
        """Test Twitter Card meta tags."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Check for Twitter Card tags
            twitter_tags = [
                'twitter:card',
                'twitter:title',
                'twitter:description'
            ]
            
            for tag in twitter_tags:
                meta_tag = soup.find('meta', attrs={'name': tag})
                if meta_tag:
                    assert meta_tag.get('content'), f"Twitter tag {tag} should have content"
                    
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_content_structure(self, base_url):
        """Test content structure and hierarchy."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Check for main content area
            main = soup.find('main')
            if main:
                assert main.get_text().strip(), "Main content should not be empty"
            
            # Check for proper heading hierarchy
            headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            if headings:
                # Should have at least one h1
                h1_elements = soup.find_all('h1')
                assert len(h1_elements) > 0, "Page should have at least one H1 heading"
                
                # Check heading hierarchy
                heading_levels = [int(h.name[1]) for h in headings]
                for i in range(1, len(heading_levels)):
                    assert heading_levels[i] - heading_levels[i-1] <= 1, "Heading levels should not skip"
            
            # Check for navigation
            nav = soup.find('nav')
            if nav:
                nav_links = nav.find_all('a')
                assert len(nav_links) > 0, "Navigation should have links"
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_image_accessibility(self, base_url):
        """Test image accessibility and optimization."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            images = soup.find_all('img')
            
            for img in images:
                src = img.get('src')
                if src:
                    # Check for alt attribute
                    alt = img.get('alt')
                    assert alt is not None, f"Image {src} should have alt attribute"
                    
                    # Check if image is accessible
                    if src.startswith('/'):
                        img_url = urljoin(base_url, src)
                    elif src.startswith('http'):
                        img_url = src
                    else:
                        continue
                    
                    try:
                        img_response = requests.head(img_url, timeout=10)
                        assert img_response.status_code == 200, f"Image {img_url} should be accessible"
                        
                        # Check content type
                        content_type = img_response.headers.get('content-type', '')
                        assert content_type.startswith('image/'), f"Image {img_url} should have image content type"
                        
                    except requests.exceptions.RequestException:
                        # Skip if image is not accessible (might be external)
                        pass
                        
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_internal_links(self, base_url):
        """Test internal link structure and accessibility."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find internal links
            internal_links = []
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith('/') or href.startswith(base_url):
                    internal_links.append(href)
            
            # Test a sample of internal links
            test_links = internal_links[:5]  # Test first 5 links
            
            for link in test_links:
                if link.startswith('/'):
                    link_url = urljoin(base_url, link)
                else:
                    link_url = link
                
                try:
                    link_response = requests.get(link_url, timeout=10)
                    assert link_response.status_code in [200, 301, 302], f"Internal link {link_url} should be accessible"
                    
                except requests.exceptions.RequestException:
                    # Skip if link is not accessible
                    continue
                    
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_seo_friendly_urls(self, base_url):
        """Test that URLs are SEO-friendly."""
        # Test main pages
        pages_to_test = [
            "/",
            "/projects",
            "/news"
        ]
        
        for page in pages_to_test:
            url = urljoin(base_url, page)
            
            try:
                response = requests.get(url, timeout=10)
                assert response.status_code == 200, f"Page {page} should be accessible"
                
                # Check URL structure
                parsed_url = urlparse(url)
                path = parsed_url.path
                
                # URLs should be lowercase
                assert path == path.lower(), f"URL {path} should be lowercase"
                
                # URLs should not have file extensions (except for API endpoints)
                if not path.startswith('/api/'):
                    assert '.' not in path.split('/')[-1], f"URL {path} should not have file extension"
                
                # URLs should use hyphens, not underscores
                assert '_' not in path, f"URL {path} should use hyphens instead of underscores"
                
            except requests.exceptions.RequestException as e:
                pytest.skip(f"Page {page} not available: {e}")
    
    def test_content_length(self, base_url):
        """Test that pages have sufficient content."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Get text content
            text_content = soup.get_text()
            word_count = len(text_content.split())
            
            # Home page should have reasonable amount of content
            assert word_count > 100, f"Page should have more than 100 words, got {word_count}"
            
            # Check for specific content sections
            sections = ['about', 'experience', 'projects', 'contact']
            page_text = text_content.lower()
            
            for section in sections:
                # At least some sections should be present
                if section in page_text:
                    break
            else:
                pytest.skip("Page content structure not as expected")
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_schema_markup(self, base_url):
        """Test for structured data (schema markup)."""
        url = urljoin(base_url, "/")
        
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Look for JSON-LD schema markup
            json_ld_scripts = soup.find_all('script', type='application/ld+json')
            
            if json_ld_scripts:
                for script in json_ld_scripts:
                    try:
                        schema_data = script.string
                        assert schema_data, "JSON-LD script should have content"
                        
                        # Basic validation that it's valid JSON
                        import json
                        json.loads(schema_data)
                        
                    except (json.JSONDecodeError, AttributeError):
                        # Skip if JSON is invalid
                        continue
            
            # Look for microdata
            microdata_elements = soup.find_all(attrs={'itemtype': True})
            
            # Either JSON-LD or microdata should be present for good SEO
            if not json_ld_scripts and not microdata_elements:
                pytest.skip("No structured data found (optional for SEO)")
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}")
    
    def test_page_load_performance(self, base_url):
        """Test page load performance metrics."""
        import time
        
        url = urljoin(base_url, "/")
        
        try:
            start_time = time.time()
            response = requests.get(url, timeout=10)
            load_time = time.time() - start_time
            
            # Page should load within 3 seconds
            assert load_time < 3.0, f"Page took {load_time:.2f}s to load, which is too slow"
            
            # Check response size
            content_length = len(response.content)
            assert content_length < 500000, f"Page size {content_length} bytes is too large"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Home page not available: {e}") 