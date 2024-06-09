import { ValidatorFn, AbstractControl } from "@angular/forms";

export function integerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isInteger = Number.isInteger(Number(control.value));
      return isInteger ? null : { 'notInteger': { value: control.value } };
    };
  }