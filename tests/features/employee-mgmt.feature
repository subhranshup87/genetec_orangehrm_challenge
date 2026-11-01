Feature: Employee Management

  Scenario: Create new Employee
    Given user login to OrangeHRM
    When user navigates to PIM module
    And user creates a new employee
    And user searches for the new employee
    And user opens employee details
    When user edits employee information
    Then user verifies the changes were saved successfully
