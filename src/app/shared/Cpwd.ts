import { FormGroup } from '@angular/forms';
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        // const control = signupForm.controls['password'];
        const matchingControl = formGroup.controls[matchingControlName];
        // const matchingControl = signupForm.controls['cPaswword'];
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }

}









