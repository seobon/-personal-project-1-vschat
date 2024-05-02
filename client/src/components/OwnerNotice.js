export default function HomeNotice({ message }) {
    return (
        <>
            {/* <div className="annotationPart">&lt;!-- {message} --&gt;</div> */}
            <div className="sentence">
              &lt;
              <span className="tagPart">owner </span>
              <span className="attributePart"> message </span>
              <span className="marksPart"> = </span>
              <span className="attributeValuePart" > {message} </span>
              /&gt;
            </div>
        </>
    )
}
