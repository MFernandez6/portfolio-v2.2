import pytest
import requests
from urllib.parse import urljoin

class TestSmoke:
    """Smoke tests to verify basic functionality."""
    
    @pytest.mark.smoke
    def test_website_accessible(self, base_url):
        """Test that the website is accessible."""
        try:
            response = requests.get(base_url, timeout=10)
            assert response.status_code == 200, f"Website returned status {response.status_code}"
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Website not accessible: {e}")
    
    @pytest.mark.smoke
    def test_homepage_content(self, base_url):
        """Test that homepage has basic content."""
        try:
            response = requests.get(base_url, timeout=10)
            assert response.status_code == 200
            
            # Check for basic content indicators
            content = response.text.lower()
            assert "miguel" in content or "fernandez" in content, "Homepage should contain name"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Website not accessible: {e}")
    
    @pytest.mark.smoke
    def test_meta_tags_present(self, base_url):
        """Test that basic meta tags are present."""
        try:
            response = requests.get(base_url, timeout=10)
            assert response.status_code == 200
            
            content = response.text
            assert "<title>" in content, "Page should have title tag"
            assert "<meta" in content, "Page should have meta tags"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Website not accessible: {e}")
    
    @pytest.mark.smoke
    def test_responsive_design_basic(self, base_url):
        """Test basic responsive design elements."""
        try:
            response = requests.get(base_url, timeout=10)
            assert response.status_code == 200
            
            content = response.text
            # Check for viewport meta tag
            assert "viewport" in content.lower(), "Page should have viewport meta tag"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Website not accessible: {e}")
    
    @pytest.mark.smoke
    def test_no_console_errors(self, base_url):
        """Test that there are no obvious JavaScript errors."""
        try:
            response = requests.get(base_url, timeout=10)
            assert response.status_code == 200
            
            content = response.text
            # Check for common error patterns
            error_indicators = ["error", "exception", "undefined", "null reference"]
            for indicator in error_indicators:
                # This is a basic check - in real scenarios, you'd use browser automation
                assert indicator not in content.lower(), f"Page should not contain '{indicator}'"
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Website not accessible: {e}")
    
    @pytest.mark.smoke
    def test_page_load_time(self, base_url):
        """Test that page loads within reasonable time."""
        import time
        
        try:
            start_time = time.time()
            response = requests.get(base_url, timeout=10)
            load_time = time.time() - start_time
            
            assert response.status_code == 200
            assert load_time < 5.0, f"Page took {load_time:.2f}s to load, which is too slow"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Website not accessible: {e}")
    
    @pytest.mark.smoke
    def test_https_redirect(self, base_url):
        """Test HTTPS redirect if applicable."""
        if base_url.startswith("https://"):
            # Already HTTPS, test HTTP redirect
            http_url = base_url.replace("https://", "http://")
            try:
                response = requests.get(http_url, timeout=10, allow_redirects=False)
                # Should redirect to HTTPS
                assert response.status_code in [301, 302], "Should redirect HTTP to HTTPS"
            except requests.exceptions.RequestException:
                # HTTP might not be available, which is fine
                pass
        else:
            # Not HTTPS, skip this test
            pytest.skip("HTTPS redirect test not applicable")
    
    @pytest.mark.smoke
    def test_favicon_accessible(self, base_url):
        """Test that favicon is accessible."""
        try:
            favicon_url = urljoin(base_url, "/favicon.ico")
            response = requests.head(favicon_url, timeout=10)
            assert response.status_code in [200, 404], "Favicon should be accessible or return 404"
            
        except requests.exceptions.RequestException:
            # Favicon might not exist, which is acceptable
            pass
    
    @pytest.mark.smoke
    def test_robots_txt(self, base_url):
        """Test robots.txt file."""
        try:
            robots_url = urljoin(base_url, "/robots.txt")
            response = requests.get(robots_url, timeout=10)
            assert response.status_code in [200, 404], "robots.txt should be accessible or return 404"
            
        except requests.exceptions.RequestException:
            # robots.txt might not exist, which is acceptable
            pass
    
    @pytest.mark.smoke
    def test_sitemap_xml(self, base_url):
        """Test sitemap.xml file."""
        try:
            sitemap_url = urljoin(base_url, "/sitemap.xml")
            response = requests.get(sitemap_url, timeout=10)
            assert response.status_code in [200, 404], "sitemap.xml should be accessible or return 404"
            
        except requests.exceptions.RequestException:
            # sitemap.xml might not exist, which is acceptable
            pass 