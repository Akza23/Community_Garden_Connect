import { useState } from "react";
function Section(props) {
    return (
        <>
            <div id="hero">
                <div>
                    <h1 id="h1">{props.title}<p id="para1">{props.title1}</p></h1><br />
                    <p id="para">{props.description}</p>
                    <button className="btn btn-success button">{props.button}</button>
                </div>
                <img className="img" src={props.src} />
            </div>
        </>
    )
}

export default Section;