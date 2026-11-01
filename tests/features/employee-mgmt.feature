Feature: Employee Management

  Background:
    Given user login to OrangeHRM
    When user navigates to PIM module

  @regression
  Scenario: Create new employee and Edit employee information
    And user creates a new employee
    And user searches for the new employee
    And user opens employee details
    When user edits employee information
    Then user verifies the changes were saved successfully

  @regression
  Scenario: Create new Employee and Delete the same
    And user creates a new employee
    And user searches for the new employee
    When user deletes the new employee
    Then user verifies the employee was deleted
