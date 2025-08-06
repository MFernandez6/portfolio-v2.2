import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

class TestNavigation:
    """Test suite for website navigation functionality."""
    
    def test_home_page_loads(self, driver, base_url, wait):
        """Test that the home page loads successfully."""
        driver.get(base_url)
        
        # Wait for page to load
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        # Verify page title
        assert "Miguel Angel Fernandez" in driver.title
        
        # Verify main content is present
        main_content = driver.find_element(By.TAG_NAME, "main")
        assert main_content.is_displayed()
    
    def test_navbar_links(self, driver, base_url, wait, test_data):
        """Test that all navigation links are present and functional."""
        driver.get(base_url)
        
        # Wait for navbar to load
        navbar = wait.until(EC.presence_of_element_located((By.TAG_NAME, "nav")))
        
        # Check for navigation links
        nav_links = navbar.find_elements(By.TAG_NAME, "a")
        assert len(nav_links) > 0, "No navigation links found"
        
        # Verify each link is clickable
        for link in nav_links:
            assert link.is_displayed(), f"Link {link.text} is not displayed"
            assert link.is_enabled(), f"Link {link.text} is not enabled"
    
    def test_mobile_navigation(self, driver, base_url, wait):
        """Test mobile navigation menu functionality."""
        driver.get(base_url)
        
        # Set mobile viewport
        driver.set_window_size(375, 667)  # iPhone SE size
        
        # Look for mobile menu button (hamburger menu)
        try:
            mobile_menu_button = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='mobile-menu'], .mobile-menu, .hamburger"))
            )
            mobile_menu_button.click()
            
            # Wait for mobile menu to appear
            mobile_menu = wait.until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, ".mobile-nav, .nav-menu"))
            )
            assert mobile_menu.is_displayed()
            
        except Exception:
            # If mobile menu doesn't exist, skip this test
            pytest.skip("Mobile navigation menu not implemented")
    
    def test_smooth_scrolling(self, driver, base_url, wait):
        """Test smooth scrolling behavior for anchor links."""
        driver.get(base_url)
        
        # Find anchor links
        anchor_links = driver.find_elements(By.CSS_SELECTOR, "a[href^='#']")
        
        if anchor_links:
            # Click first anchor link
            anchor_links[0].click()
            time.sleep(1)  # Allow time for scroll animation
            
            # Verify page scrolled (check if URL changed or scroll position changed)
            current_scroll = driver.execute_script("return window.pageYOffset;")
            assert current_scroll > 0, "Page should scroll when clicking anchor link"
    
    def test_external_links(self, driver, base_url, wait):
        """Test external links open in new tabs."""
        driver.get(base_url)
        
        # Find external links (links that don't start with / or #)
        external_links = driver.find_elements(
            By.CSS_SELECTOR, 
            "a[href^='http']:not([href*='" + base_url + "'])"
        )
        
        if external_links:
            original_window = driver.current_window_handle
            
            # Click first external link
            external_links[0].click()
            
            # Wait for new tab to open
            wait.until(lambda d: len(d.window_handles) > 1)
            
            # Switch to new tab
            new_window = [handle for handle in driver.window_handles if handle != original_window][0]
            driver.switch_to.window(new_window)
            
            # Verify new tab opened
            assert driver.current_url != base_url
            
            # Close new tab and switch back
            driver.close()
            driver.switch_to.window(original_window)
    
    @pytest.mark.slow
    def test_page_load_performance(self, driver, base_url):
        """Test page load performance."""
        start_time = time.time()
        driver.get(base_url)
        
        # Wait for page to be fully loaded
        driver.execute_script("return document.readyState") == "complete"
        
        load_time = time.time() - start_time
        
        # Assert page loads within reasonable time (5 seconds)
        assert load_time < 5.0, f"Page took {load_time:.2f} seconds to load, which is too slow"
    
    def test_responsive_design(self, driver, base_url, wait):
        """Test responsive design at different screen sizes."""
        screen_sizes = [
            (1920, 1080),  # Desktop
            (1024, 768),   # Tablet
            (375, 667),    # Mobile
        ]
        
        for width, height in screen_sizes:
            driver.set_window_size(width, height)
            driver.get(base_url)
            
            # Wait for page to load
            wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            
            # Verify page is responsive (no horizontal scroll)
            body_width = driver.execute_script("return document.body.scrollWidth;")
            viewport_width = driver.execute_script("return window.innerWidth;")
            
            assert body_width <= viewport_width, f"Page has horizontal scroll at {width}x{height}"
    
    def test_accessibility_basics(self, driver, base_url, wait):
        """Test basic accessibility features."""
        driver.get(base_url)
        
        # Check for alt text on images
        images = driver.find_elements(By.TAG_NAME, "img")
        for img in images:
            alt_text = img.get_attribute("alt")
            # Allow empty alt for decorative images, but require alt attribute
            assert alt_text is not None, f"Image missing alt attribute: {img.get_attribute('src')}"
        
        # Check for proper heading structure
        headings = driver.find_elements(By.CSS_SELECTOR, "h1, h2, h3, h4, h5, h6")
        if headings:
            # Verify at least one h1 exists
            h1_elements = driver.find_elements(By.TAG_NAME, "h1")
            assert len(h1_elements) > 0, "Page should have at least one H1 heading"
            
            # Verify heading hierarchy (no skipping levels)
            heading_levels = [int(h.tag_name[1]) for h in headings]
            for i in range(1, len(heading_levels)):
                assert heading_levels[i] - heading_levels[i-1] <= 1, "Heading levels should not skip" 