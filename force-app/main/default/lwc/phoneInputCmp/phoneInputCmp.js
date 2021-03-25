import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from "lightning/flowSupport";

export default class PhoneInputCmp extends LightningElement {

    @api errorMessage;
    @api inputLabel;
    @api inputPlaceholder;
    @api isRequired;
    @api phoneNumber;

    // Phone number formatting based on https://bit.ly/2QDBVTM
    isNumericInput(event) {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    }
    
    isModifierKey(event) {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    }
    
    enforceFormat(event) {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!this.isNumericInput(event) && !this.isModifierKey(event)){
            event.preventDefault();
        }
    }

    formatToPhone(inputVal) {
        const input = inputVal.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const areaCode = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);
    
        if(input.length > 6) {return `(${areaCode}) ${middle} - ${last}`;}
        else if(input.length > 3) {return `(${areaCode}) ${middle}`;}
        else if(input.length > 0) {return `(${areaCode}`;}

    }

    handleChange(event) {

        // Format phone number
        this.enforceFormat(event);
        if(!this.isModifierKey(event)) {
            event.target.value = this.formatToPhone(event.target.value);
        }
        
        // For phoneNumber attribute, filter out all non-numeric characters
        this.phoneNumber = event.target.value.replace(/[^0-9]/g, '');

        // Dispatch attribute change event for validation
        const attributeChangeEvent = new FlowAttributeChangeEvent(
            "phoneNumber",
            this.phoneNumber
        );
      
        this.dispatchEvent(attributeChangeEvent);
    }

    renderedCallback(){
        // If phone number input variable is passed on, initialize the input field
        if (this.phoneNumber) {
            let inp = this.template.querySelector('lightning-input');
            inp.value = this.formatToPhone(this.phoneNumber);
        }
    }

    @api
    validate() {
        let length = (this.phoneNumber) ? this.phoneNumber.length : 0;

        if ((this.isRequired && length == 10) || (!this.isRequired && length == 0)) {
            return { isValid: true };
        } else {
            return {
                isValid: false,
                errorMessage: this.errorMessage
            };
        }
    }

}