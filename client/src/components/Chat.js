import { useEffect, useState } from "react";

export default function Chat ({chat}) {
    const [who, setWho] = useState('');
    useEffect(() => {
        const fun = () => {
            if (chat.type == "my") {
                setWho("me")
            }
            else {
                setWho("other")
            }
        }
        fun();
      }, []);
    return (
        <>
            <div>
                &lt;
                <span className="tagPart">{who} </span>
                <span className="attributePart"> writer</span>
                <span className="marksPart">=</span>
                <span className="attributeValuePart">"{chat.userId}" </span>
                <span className="attributePart"> reciever</span>
                <span className="marksPart">=</span>
                <span className="attributeValuePart">"</span>
                <span className="functionPart">{chat.isDM}</span>
                <span className="bracketPart">&#40; &#41;</span>
                <span className="attributeValuePart">"</span>
                &gt;
                <br />
                <div className="console-container">
                    &lt;
                    <span className="tagPart">p</span>
                    &gt;
                    <span className="marksPart">{chat.content}</span>
                    &lt;
                    <span className="tagPart">p</span>
                    /&gt;
                </div>
                &lt;
                <span className="tagPart">{who}</span>
                /&gt;
            </div>
        </>
    )
}