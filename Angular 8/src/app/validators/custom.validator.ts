import { FormControl } from '@angular/forms';

export class CustomValidator {
    constructor() { }

    static CodigoValidator(control: FormControl) {
        if (!control.value) {
            return null;
        }
        
        let value = control.value.replace(/[^a-zA-Z]+/, "");
       
        if (!value) {
            return { 'Código inválido': true };
        }

        return null;
    }
}