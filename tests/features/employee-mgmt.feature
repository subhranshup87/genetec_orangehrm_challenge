Feature: Employee Management

  Background:
    Given user login to OrangeHRM
    When user navigates to PIM module
    And user creates a new employee
    And user searches for the new employee

  @regression
  Scenario: Create new employee and Edit employee information
    And user opens employee details
    When user edits employee information
    Then user verifies the changes were saved successfully

  @regression
  Scenario: Create new Employee and Delete the same
    When user deletes the new employee
    Then user verifies the employee was deleted

  @regression
  Scenario: Update employee job details and verify persistence
    And user opens employee details
    When user updates employee job information
    Then user verifies the job information is persisted
