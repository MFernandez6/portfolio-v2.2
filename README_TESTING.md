# Portfolio Website Testing Suite

This document provides comprehensive information about the testing framework for the portfolio website.

## Overview

The testing suite includes:

- **UI Tests**: Selenium-based browser automation tests
- **API Tests**: REST API endpoint testing
- **Integration Tests**: Content validation and SEO testing
- **Performance Tests**: Load time and responsiveness testing

## Prerequisites

- Python 3.8+
- Chrome browser (for Selenium tests)
- Node.js and npm (for the Next.js application)

## Installation

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Or use the test runner script:

```bash
python scripts/run_tests.py --install
```

## Test Structure

```
tests/
├── __init__.py
├── conftest.py                 # Pytest configuration and fixtures
├── test_ui_navigation.py      # UI navigation tests
├── test_ui_forms.py           # Form functionality tests
├── test_api_endpoints.py      # API endpoint tests
└── test_integration_content.py # Content and SEO tests
```

## Running Tests

### Using the Test Runner Script

The test runner script provides convenient options for different test scenarios:

```bash
# Install dependencies
python scripts/run_tests.py --install

# Run all tests
python scripts/run_tests.py --all

# Run specific test types
python scripts/run_tests.py --ui
python scripts/run_tests.py --api
python scripts/run_tests.py --integration

# Run tests with coverage
python scripts/run_tests.py --coverage

# Run tests in parallel
python scripts/run_tests.py --parallel

# Generate HTML report
python scripts/run_tests.py --report

# Run specific test file
python scripts/run_tests.py --test tests/test_ui_navigation.py
```

### Using Pytest Directly

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_ui_navigation.py

# Run tests with specific markers
pytest -m "ui"
pytest -m "api"
pytest -m "integration"

# Run tests excluding slow tests
pytest -m "not slow"

# Run tests with verbose output
pytest -v

# Run tests with coverage
pytest --cov=src --cov-report=html
```

## Test Categories

### UI Tests (`test_ui_*.py`)

Tests user interface functionality using Selenium WebDriver:

- **Navigation Tests**: Menu functionality, link validation, mobile responsiveness
- **Form Tests**: Contact form validation, accessibility, keyboard navigation
- **Responsive Design**: Different screen sizes and orientations
- **Accessibility**: Alt text, heading hierarchy, keyboard navigation

### API Tests (`test_api_*.py`)

Tests backend API endpoints:

- **Health Check**: API availability and status
- **Contact Form**: Form submission and validation
- **Data Endpoints**: Projects, news, and other data endpoints
- **Error Handling**: Invalid requests and error responses
- **Performance**: Response time validation

### Integration Tests (`test_integration_*.py`)

Tests content and SEO aspects:

- **Meta Tags**: Title, description, viewport, charset
- **Open Graph**: Social media sharing tags
- **Content Structure**: Heading hierarchy, navigation
- **SEO**: URL structure, content length, schema markup
- **Performance**: Page load times and optimization

## Configuration

### Environment Variables

Set these environment variables to customize test behavior:

```bash
# Base URL for testing (default: http://localhost:3000)
export BASE_URL="https://your-domain.com"

# Browser headless mode (default: false)
export HEADLESS="true"

# Test timeout in seconds (default: 10)
export TIMEOUT="15"
```

### Pytest Configuration

The `pytest.ini` file contains:

- Test discovery patterns
- Default command-line options
- Custom markers
- Coverage settings

## Test Reports

### HTML Reports

Generate comprehensive HTML reports:

```bash
pytest --html=reports/test-report.html --self-contained-html
```

### Coverage Reports

Generate code coverage reports:

```bash
pytest --cov=src --cov-report=html:reports/coverage --cov-report=term-missing
```

### Allure Reports (Optional)

For more advanced reporting, install Allure:

```bash
pip install allure-pytest
pytest --alluredir=reports/allure-results
allure serve reports/allure-results
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
      - name: Install Chrome
        run: |
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable
      - name: Run tests
        run: |
          python scripts/run_tests.py --all
        env:
          HEADLESS: true
          BASE_URL: ${{ secrets.BASE_URL }}
```

## Best Practices

### Writing Tests

1. **Use descriptive test names**: Test names should clearly describe what is being tested
2. **Follow AAA pattern**: Arrange, Act, Assert
3. **Use appropriate markers**: Mark tests as `@pytest.mark.ui`, `@pytest.mark.api`, etc.
4. **Handle flaky tests**: Use retries and proper waits for UI tests
5. **Clean up resources**: Ensure proper cleanup in fixtures

### Test Data

- Use the `test_data` fixture for consistent test data
- Generate dynamic data using Faker when needed
- Keep test data separate from test logic

### Error Handling

- Use `pytest.skip()` for optional features
- Handle network errors gracefully
- Provide meaningful error messages

## Troubleshooting

### Common Issues

1. **ChromeDriver issues**: The test suite automatically downloads ChromeDriver
2. **Timeout errors**: Increase timeout values in environment variables
3. **Element not found**: Check selectors and page structure
4. **Network errors**: Verify the application is running and accessible

### Debug Mode

Run tests with debug output:

```bash
pytest -v -s --tb=long
```

### Visual Debugging

For UI tests, disable headless mode:

```bash
HEADLESS=false pytest tests/test_ui_navigation.py -v -s
```

## Performance Testing

### Load Testing (Optional)

For more advanced performance testing, consider using:

- **Locust**: Python-based load testing
- **Artillery**: Node.js-based load testing
- **JMeter**: Java-based load testing

Example Locust test:

```python
from locust import HttpUser, task

class WebsiteUser(HttpUser):
    @task
    def test_homepage(self):
        self.client.get("/")

    @task
    def test_projects(self):
        self.client.get("/projects")
```

## Security Testing

### Basic Security Tests

The test suite includes basic security checks:

- Input validation
- XSS prevention
- CSRF protection
- Secure headers

### Advanced Security Testing

For comprehensive security testing, consider:

- **OWASP ZAP**: Automated security testing
- **Burp Suite**: Manual security testing
- **Snyk**: Dependency vulnerability scanning

## Maintenance

### Regular Tasks

1. **Update dependencies**: Keep testing libraries up to date
2. **Review test coverage**: Ensure adequate coverage of new features
3. **Update selectors**: Keep UI selectors current with application changes
4. **Performance monitoring**: Track test execution times

### Test Maintenance

- Review and update tests when application changes
- Remove obsolete tests
- Refactor tests for better maintainability
- Add tests for new features

## Support

For issues with the testing framework:

1. Check the troubleshooting section
2. Review test logs and reports
3. Verify environment configuration
4. Check for dependency conflicts

## Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Use appropriate markers
3. Add documentation for new test types
4. Update this README if needed
