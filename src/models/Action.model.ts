import { ActionEnum } from "./Action.enum";

export class Action {
    type: ActionEnum;
    value: string;

    constructor(type: ActionEnum, value: string) {
        this.type = type;
        this.value = value;
    }
}