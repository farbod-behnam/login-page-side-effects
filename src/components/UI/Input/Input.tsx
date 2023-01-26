import React, { FormEvent, useRef } from "react";
import classes from "./Input.module.css";

interface Props {
    label: string;
    id: string;
    type: string;
    value: string;
    isValid: boolean;
    onChange: (event: FormEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

export default function Input(props: Props) {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
}