export class State {
    value: string;
    isValid: boolean;

    constructor(value: string, isValid: boolean) {
        this.value = value;
        this.isValid = isValid;
    }
}