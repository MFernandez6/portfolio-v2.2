#!/usr/bin/env python3
"""
Test runner script for portfolio website testing.
Provides different test execution options and configurations.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors."""
    print(f"\n{'='*60}")
    print(f"Running: {description}")
    print(f"Command: {' '.join(command)}")
    print(f"{'='*60}\n")
    
    try:
        result = subprocess.run(command, check=True, capture_output=False)
        print(f"\n✅ {description} completed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"\n❌ {description} failed with exit code {e.returncode}")
        return False

def install_dependencies():
    """Install Python dependencies."""
    return run_command([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      "Installing Python dependencies")

def run_smoke_tests():
    """Run smoke tests (quick tests)."""
    return run_command([
        sys.executable, "-m", "pytest", 
        "-m", "smoke", 
        "--tb=short",
        "-v"
    ], "Running smoke tests")

def run_ui_tests():
    """Run UI tests."""
    return run_command([
        sys.executable, "-m", "pytest", 
        "tests/test_ui_*.py",
        "--tb=short",
        "-v"
    ], "Running UI tests")

def run_api_tests():
    """Run API tests."""
    return run_command([
        sys.executable, "-m", "pytest", 
        "tests/test_api_*.py",
        "--tb=short",
        "-v"
    ], "Running API tests")

def run_integration_tests():
    """Run integration tests."""
    return run_command([
        sys.executable, "-m", "pytest", 
        "tests/test_integration_*.py",
        "--tb=short",
        "-v"
    ], "Running integration tests")

def run_all_tests():
    """Run all tests."""
    return run_command([
        sys.executable, "-m", "pytest",
        "--tb=short",
        "-v"
    ], "Running all tests")

def run_tests_with_coverage():
    """Run tests with coverage report."""
    return run_command([
        sys.executable, "-m", "pytest",
        "--cov=src",
        "--cov-report=html:reports/coverage",
        "--cov-report=term-missing",
        "--cov-fail-under=80",
        "--tb=short",
        "-v"
    ], "Running tests with coverage")

def run_tests_parallel():
    """Run tests in parallel."""
    return run_command([
        sys.executable, "-m", "pytest",
        "-n", "auto",
        "--tb=short",
        "-v"
    ], "Running tests in parallel")

def run_specific_test(test_path):
    """Run a specific test file or test function."""
    return run_command([
        sys.executable, "-m", "pytest",
        test_path,
        "--tb=short",
        "-v"
    ], f"Running specific test: {test_path}")

def generate_test_report():
    """Generate HTML test report."""
    return run_command([
        sys.executable, "-m", "pytest",
        "--html=reports/test-report.html",
        "--self-contained-html",
        "--tb=short",
        "-v"
    ], "Generating HTML test report")

def main():
    parser = argparse.ArgumentParser(description="Test runner for portfolio website")
    parser.add_argument("--install", action="store_true", help="Install dependencies")
    parser.add_argument("--smoke", action="store_true", help="Run smoke tests")
    parser.add_argument("--ui", action="store_true", help="Run UI tests")
    parser.add_argument("--api", action="store_true", help="Run API tests")
    parser.add_argument("--integration", action="store_true", help="Run integration tests")
    parser.add_argument("--all", action="store_true", help="Run all tests")
    parser.add_argument("--coverage", action="store_true", help="Run tests with coverage")
    parser.add_argument("--parallel", action="store_true", help="Run tests in parallel")
    parser.add_argument("--report", action="store_true", help="Generate HTML test report")
    parser.add_argument("--test", type=str, help="Run specific test file or function")
    
    args = parser.parse_args()
    
    # Create reports directory
    Path("reports").mkdir(exist_ok=True)
    
    # Install dependencies if requested
    if args.install:
        if not install_dependencies():
            sys.exit(1)
    
    # Run tests based on arguments
    success = True
    
    if args.smoke:
        success &= run_smoke_tests()
    
    if args.ui:
        success &= run_ui_tests()
    
    if args.api:
        success &= run_api_tests()
    
    if args.integration:
        success &= run_integration_tests()
    
    if args.all:
        success &= run_all_tests()
    
    if args.coverage:
        success &= run_tests_with_coverage()
    
    if args.parallel:
        success &= run_tests_parallel()
    
    if args.report:
        success &= generate_test_report()
    
    if args.test:
        success &= run_specific_test(args.test)
    
    # If no specific test type was specified, run all tests
    if not any([args.smoke, args.ui, args.api, args.integration, args.all, 
                args.coverage, args.parallel, args.report, args.test]):
        print("No specific test type specified. Running all tests...")
        success &= run_all_tests()
    
    if success:
        print("\n🎉 All tests completed successfully!")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main() 