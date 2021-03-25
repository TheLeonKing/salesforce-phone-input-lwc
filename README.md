# Salesforce Phone Input LWC
Author: Leon Kempers

## Description
A simple phone input component for Lightning Screen Flows. Features:
* Automatically formats an American phone number while the user enters it.
* Returns the unformatted (numeric-only) phone number as an output variable.
* Validates that the user entered a correct phone number before allowing them to navigate to the next screen (only if the Required attribute is set to True).

<img src="/docs/img/demo.gif" alt="Demo" width="300px">


## Setup
Drag the Lightning Web Component to your Flow screen, and set the following input variables:
* **Phone Number:** Variable that stores the phone number
* **Input Label:** Label for the input box
* **Input Placeholder:** Placeholder for the input box
* **Placeholder:** Placeholder for the input box
* **Required:** Boolean indicating whether this field is required
* **Validation Error Message:** Error message when the user does not enter a valid phone number; defaults to "Enter a 10-digit phone number"

To store the phone number the user entered, enable "Manually assign variables" under Advanced, and specify the variable which should hold the phone number. Note that the component will return the unformatted, numeric phone number. E.g., "(415) 537-1420" will be converted to "4155371420".

Note: if the validation is not working, try changing the default value of the "Validation Error Message" in the Flow Builder, and then saving the Flow again. This seems to be a bug in Salesforce.