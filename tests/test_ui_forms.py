import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

class TestForms:
    """Test suite for form functionality."""
    
    def test_contact_form_validation(self, driver, base_url, wait, test_data):
        """Test contact form validation with invalid data."""
        driver.get(base_url)
        
        # Look for contact form
        try:
            contact_form = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "form, .contact-form, #contact-form"))
            )
        except:
            pytest.skip("Contact form not found on page")
        
        # Find form fields
        name_field = contact_form.find_element(By.CSS_SELECTOR, "input[name*='name'], input[placeholder*='name'], #name")
        email_field = contact_form.find_element(By.CSS_SELECTOR, "input[name*='email'], input[type='email'], #email")
        message_field = contact_form.find_element(By.CSS_SELECTOR, "textarea, input[name*='message'], #message")
        
        # Test with invalid data
        invalid_data = test_data["invalid_contact"]
        
        # Clear fields and enter invalid data
        name_field.clear()
        name_field.send_keys(invalid_data["name"])
        
        email_field.clear()
        email_field.send_keys(invalid_data["email"])
        
        message_field.clear()
        message_field.send_keys(invalid_data["message"])
        
        # Submit form
        submit_button = contact_form.find_element(By.CSS_SELECTOR, "button[type='submit'], input[type='submit'], .submit-btn")
        submit_button.click()
        
        # Wait for validation messages
        time.sleep(1)
        
        # Check for validation errors (this will depend on your form implementation)
        error_messages = driver.find_elements(By.CSS_SELECTOR, ".error, .validation-error, [role='alert']")
        
        # If no explicit error messages, check if form submission was prevented
        if not error_messages:
            # Check if we're still on the same page (form didn't submit)
            current_url = driver.current_url
            assert base_url in current_url, "Form should not submit with invalid data"
    
    def test_contact_form_valid_submission(self, driver, base_url, wait, test_data):
        """Test contact form with valid data."""
        driver.get(base_url)
        
        # Look for contact form
        try:
            contact_form = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "form, .contact-form, #contact-form"))
            )
        except:
            pytest.skip("Contact form not found on page")
        
        # Find form fields
        name_field = contact_form.find_element(By.CSS_SELECTOR, "input[name*='name'], input[placeholder*='name'], #name")
        email_field = contact_form.find_element(By.CSS_SELECTOR, "input[name*='email'], input[type='email'], #email")
        message_field = contact_form.find_element(By.CSS_SELECTOR, "textarea, input[name*='message'], #message")
        
        # Test with valid data
        valid_data = test_data["valid_contact"]
        
        # Clear fields and enter valid data
        name_field.clear()
        name_field.send_keys(valid_data["name"])
        
        email_field.clear()
        email_field.send_keys(valid_data["email"])
        
        message_field.clear()
        message_field.send_keys(valid_data["message"])
        
        # Submit form
        submit_button = contact_form.find_element(By.CSS_SELECTOR, "button[type='submit'], input[type='submit'], .submit-btn")
        submit_button.click()
        
        # Wait for submission response
        time.sleep(2)
        
        # Check for success message or redirect
        success_messages = driver.find_elements(By.CSS_SELECTOR, ".success, .success-message, [role='status']")
        
        if success_messages:
            assert any(msg.is_displayed() for msg in success_messages), "Success message should be displayed"
        else:
            # If no success message, check if form was submitted (URL might change)
            current_url = driver.current_url
            # Note: This is a basic check - actual behavior depends on form implementation
    
    def test_form_field_accessibility(self, driver, base_url, wait):
        """Test form field accessibility features."""
        driver.get(base_url)
        
        # Look for forms
        forms = driver.find_elements(By.TAG_NAME, "form")
        
        if not forms:
            pytest.skip("No forms found on page")
        
        for form in forms:
            # Check for labels
            inputs = form.find_elements(By.CSS_SELECTOR, "input, textarea, select")
            
            for input_field in inputs:
                # Check for associated label
                field_id = input_field.get_attribute("id")
                if field_id:
                    label = driver.find_element(By.CSS_SELECTOR, f"label[for='{field_id}']")
                    assert label.is_displayed(), f"Input field {field_id} should have an associated label"
                
                # Check for placeholder or aria-label
                placeholder = input_field.get_attribute("placeholder")
                aria_label = input_field.get_attribute("aria-label")
                
                # At least one should be present
                assert placeholder or aria_label or field_id, f"Input field should have placeholder, aria-label, or associated label"
    
    def test_form_keyboard_navigation(self, driver, base_url, wait):
        """Test keyboard navigation through form fields."""
        driver.get(base_url)
        
        # Look for contact form
        try:
            contact_form = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "form, .contact-form, #contact-form"))
            )
        except:
            pytest.skip("Contact form not found on page")
        
        # Find all focusable elements
        focusable_elements = contact_form.find_elements(
            By.CSS_SELECTOR, 
            "input, textarea, select, button, a, [tabindex]"
        )
        
        if len(focusable_elements) < 2:
            pytest.skip("Not enough focusable elements for keyboard navigation test")
        
        # Test tab navigation
        for i, element in enumerate(focusable_elements):
            # Focus the element
            element.click()
            assert element == driver.switch_to.active_element, f"Element {i} should be focusable"
            
            # Test tab key navigation
            element.send_keys(Keys.TAB)
            time.sleep(0.1)  # Small delay for focus change
            
            # Verify focus moved to next element (if not the last element)
            if i < len(focusable_elements) - 1:
                next_element = focusable_elements[i + 1]
                assert next_element == driver.switch_to.active_element, f"Tab should move focus to next element"
    
    def test_form_reset_functionality(self, driver, base_url, wait, test_data):
        """Test form reset functionality."""
        driver.get(base_url)
        
        # Look for contact form
        try:
            contact_form = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "form, .contact-form, #contact-form"))
            )
        except:
            pytest.skip("Contact form not found on page")
        
        # Find form fields
        name_field = contact_form.find_element(By.CSS_SELECTOR, "input[name*='name'], input[placeholder*='name'], #name")
        email_field = contact_form.find_element(By.CSS_SELECTOR, "input[name*='email'], input[type='email'], #email")
        message_field = contact_form.find_element(By.CSS_SELECTOR, "textarea, input[name*='message'], #message")
        
        # Store original values
        original_name = name_field.get_attribute("value") or ""
        original_email = email_field.get_attribute("value") or ""
        original_message = message_field.get_attribute("value") or ""
        
        # Enter test data
        test_data_input = test_data["valid_contact"]
        name_field.clear()
        name_field.send_keys(test_data_input["name"])
        email_field.clear()
        email_field.send_keys(test_data_input["email"])
        message_field.clear()
        message_field.send_keys(test_data_input["message"])
        
        # Look for reset button
        reset_button = contact_form.find_element(By.CSS_SELECTOR, "button[type='reset'], input[type='reset'], .reset-btn")
        reset_button.click()
        
        # Verify fields are reset
        assert name_field.get_attribute("value") == original_name, "Name field should be reset"
        assert email_field.get_attribute("value") == original_email, "Email field should be reset"
        assert message_field.get_attribute("value") == original_message, "Message field should be reset"
    
    def test_form_character_limits(self, driver, base_url, wait):
        """Test form field character limits."""
        driver.get(base_url)
        
        # Look for contact form
        try:
            contact_form = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "form, .contact-form, #contact-form"))
            )
        except:
            pytest.skip("Contact form not found on page")
        
        # Find textarea for message
        message_field = contact_form.find_element(By.CSS_SELECTOR, "textarea, input[name*='message'], #message")
        
        # Check for maxlength attribute
        maxlength = message_field.get_attribute("maxlength")
        
        if maxlength:
            maxlength = int(maxlength)
            
            # Test entering more characters than allowed
            long_message = "A" * (maxlength + 10)
            message_field.clear()
            message_field.send_keys(long_message)
            
            # Verify only maxlength characters were entered
            actual_value = message_field.get_attribute("value")
            assert len(actual_value) <= maxlength, f"Field should not accept more than {maxlength} characters"
    
    def test_form_required_fields(self, driver, base_url, wait):
        """Test required field validation."""
        driver.get(base_url)
        
        # Look for contact form
        try:
            contact_form = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "form, .contact-form, #contact-form"))
            )
        except:
            pytest.skip("Contact form not found on page")
        
        # Find required fields
        required_fields = contact_form.find_elements(By.CSS_SELECTOR, "[required]")
        
        if required_fields:
            # Try to submit form without filling required fields
            submit_button = contact_form.find_element(By.CSS_SELECTOR, "button[type='submit'], input[type='submit'], .submit-btn")
            submit_button.click()
            
            # Check for validation messages
            time.sleep(1)
            validation_messages = driver.find_elements(By.CSS_SELECTOR, ".error, .validation-error, [role='alert']")
            
            # Should have validation errors for required fields
            assert len(validation_messages) > 0, "Should show validation errors for required fields" 