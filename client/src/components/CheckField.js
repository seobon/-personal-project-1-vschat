export default function CheckField({ what, message }) {
    return (
        <>
            <div>
                &lt;
                <span className="tagPart">{what}</span>
                &gt;
                <span className="marksPart">{message}</span>
                &lt;
                <span className="tagPart">{what}</span>
                /&gt;
            </div>
        </>
    )
}
