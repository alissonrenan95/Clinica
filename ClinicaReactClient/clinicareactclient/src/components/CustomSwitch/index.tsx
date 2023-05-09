import React, {useState} from 'react'
import "./styles.css";

type Props = {label:string, checkvalue:boolean, setCheckvalue:React.Dispatch<React.SetStateAction<boolean>>}

const CustomSwitch = (props: Props) => {
    return (
        <div className="controls-check">
            <label htmlFor={props.label} className="switch">
                <div className="switch-wrapper">
                    <input type="checkbox" name={props.label} id={props.label} checked={props.checkvalue} onChange={(e) => { props.setCheckvalue(e.target.checked) }} />
                    <span className="switch-button"></span>
                </div>
                <span className="switch-text">{props.label}</span>
            </label>
        </div>
    )
}

export default CustomSwitch;