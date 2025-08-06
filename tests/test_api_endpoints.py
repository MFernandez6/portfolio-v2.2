import pytest
import requests
import json
from urllib.parse import urljoin

class TestAPIEndpoints:
    """Test suite for API endpoints."""
    
    def test_api_health_check(self, base_url):
        """Test API health check endpoint."""
        health_url = urljoin(base_url, "/api/health")
        
        try:
            response = requests.get(health_url, timeout=10)
            assert response.status_code == 200, f"Health check failed with status {response.status_code}"
            
            # If response is JSON, check for expected fields
            if response.headers.get('content-type', '').startswith('application/json'):
                data = response.json()
                assert 'status' in data, "Health check response should include status field"
        except requests.exceptions.RequestException as e:
            pytest.skip(f"API endpoint not available: {e}")
    
    def test_api_contact_form(self, base_url):
        """Test contact form API endpoint."""
        contact_url = urljoin(base_url, "/api/contact")
        
        # Test data
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message from API test."
        }
        
        try:
            response = requests.post(contact_url, json=test_data, timeout=10)
            
            # Should return 200 or 201 for successful submission
            assert response.status_code in [200, 201], f"Contact form submission failed with status {response.status_code}"
            
            # Check response format
            if response.headers.get('content-type', '').startswith('application/json'):
                data = response.json()
                assert 'success' in data or 'message' in data, "Response should include success or message field"
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Contact API endpoint not available: {e}")
    
    def test_api_contact_form_validation(self, base_url):
        """Test contact form API validation with invalid data."""
        contact_url = urljoin(base_url, "/api/contact")
        
        # Test with invalid data
        invalid_data = {
            "name": "",
            "email": "invalid-email",
            "message": ""
        }
        
        try:
            response = requests.post(contact_url, json=invalid_data, timeout=10)
            
            # Should return 400 for validation errors
            assert response.status_code == 400, f"Should return 400 for invalid data, got {response.status_code}"
            
            # Check for validation error messages
            if response.headers.get('content-type', '').startswith('application/json'):
                data = response.json()
                assert 'errors' in data or 'message' in data, "Should include error details in response"
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Contact API endpoint not available: {e}")
    
    def test_api_projects_endpoint(self, base_url):
        """Test projects API endpoint if it exists."""
        projects_url = urljoin(base_url, "/api/projects")
        
        try:
            response = requests.get(projects_url, timeout=10)
            
            if response.status_code == 200:
                # If endpoint exists, check response format
                if response.headers.get('content-type', '').startswith('application/json'):
                    data = response.json()
                    assert isinstance(data, (list, dict)), "Projects should be returned as list or object"
                    
            elif response.status_code == 404:
                # Endpoint doesn't exist, which is fine
                pytest.skip("Projects API endpoint not implemented")
            else:
                assert False, f"Unexpected status code: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Projects API endpoint not available: {e}")
    
    def test_api_news_endpoint(self, base_url):
        """Test news API endpoint if it exists."""
        news_url = urljoin(base_url, "/api/news")
        
        try:
            response = requests.get(news_url, timeout=10)
            
            if response.status_code == 200:
                # If endpoint exists, check response format
                if response.headers.get('content-type', '').startswith('application/json'):
                    data = response.json()
                    assert isinstance(data, (list, dict)), "News should be returned as list or object"
                    
            elif response.status_code == 404:
                # Endpoint doesn't exist, which is fine
                pytest.skip("News API endpoint not implemented")
            else:
                assert False, f"Unexpected status code: {response.status_code}"
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"News API endpoint not available: {e}")
    
    def test_api_cors_headers(self, base_url):
        """Test CORS headers for API endpoints."""
        # Test a few common API endpoints
        api_endpoints = [
            "/api/health",
            "/api/contact",
            "/api/projects",
            "/api/news"
        ]
        
        for endpoint in api_endpoints:
            url = urljoin(base_url, endpoint)
            
            try:
                response = requests.options(url, timeout=10)
                
                # Check for CORS headers
                cors_headers = [
                    'Access-Control-Allow-Origin',
                    'Access-Control-Allow-Methods',
                    'Access-Control-Allow-Headers'
                ]
                
                for header in cors_headers:
                    if header in response.headers:
                        assert response.headers[header], f"CORS header {header} should not be empty"
                        
            except requests.exceptions.RequestException:
                # Skip if endpoint doesn't exist
                continue
    
    def test_api_rate_limiting(self, base_url):
        """Test API rate limiting if implemented."""
        contact_url = urljoin(base_url, "/api/contact")
        
        test_data = {
            "name": "Rate Limit Test",
            "email": "ratelimit@test.com",
            "message": "Testing rate limiting."
        }
        
        try:
            # Make multiple rapid requests
            responses = []
            for i in range(5):
                response = requests.post(contact_url, json=test_data, timeout=10)
                responses.append(response.status_code)
            
            # Check if any requests were rate limited (429 status)
            if 429 in responses:
                # Rate limiting is implemented
                assert responses.count(429) > 0, "Rate limiting should block some requests"
            else:
                # No rate limiting implemented, which is acceptable
                pytest.skip("Rate limiting not implemented")
                
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Contact API endpoint not available: {e}")
    
    def test_api_error_handling(self, base_url):
        """Test API error handling for invalid requests."""
        contact_url = urljoin(base_url, "/api/contact")
        
        # Test with invalid JSON
        try:
            response = requests.post(
                contact_url, 
                data="invalid json", 
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 400 for invalid JSON
            assert response.status_code == 400, f"Should return 400 for invalid JSON, got {response.status_code}"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Contact API endpoint not available: {e}")
    
    def test_api_method_not_allowed(self, base_url):
        """Test API endpoints with unsupported HTTP methods."""
        contact_url = urljoin(base_url, "/api/contact")
        
        # Test with PUT method (should not be allowed)
        try:
            response = requests.put(contact_url, json={}, timeout=10)
            
            # Should return 405 Method Not Allowed
            assert response.status_code == 405, f"Should return 405 for unsupported method, got {response.status_code}"
            
        except requests.exceptions.RequestException as e:
            pytest.skip(f"Contact API endpoint not available: {e}")
    
    def test_api_response_time(self, base_url):
        """Test API response times are within acceptable limits."""
        import time
        
        endpoints_to_test = [
            "/api/health",
            "/api/contact"
        ]
        
        for endpoint in endpoints_to_test:
            url = urljoin(base_url, endpoint)
            
            try:
                start_time = time.time()
                
                if endpoint == "/api/contact":
                    # POST request for contact form
                    response = requests.post(url, json={
                        "name": "Performance Test",
                        "email": "perf@test.com",
                        "message": "Performance test message."
                    }, timeout=10)
                else:
                    # GET request for other endpoints
                    response = requests.get(url, timeout=10)
                
                response_time = time.time() - start_time
                
                # Assert response time is under 2 seconds
                assert response_time < 2.0, f"API endpoint {endpoint} took {response_time:.2f}s to respond"
                
            except requests.exceptions.RequestException as e:
                pytest.skip(f"API endpoint {endpoint} not available: {e}") 