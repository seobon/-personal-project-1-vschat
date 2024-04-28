import { useEffect, useState } from "react";

export default function Header ({room}) {
    const [mark, setMark] = useState('');
    useEffect(() => {
        const fun = () => {
            if (room.roomType == "dm") {
                setMark("SB")
            }
            else {
                setMark("<>")
            }
        }
        fun();
      }, []);
    return (
        <>
            <button className={`${room.roomType}FilePart button`} >
                <span className={`${room.roomType}Part`}>{mark} </span>{room.roomName}.{room.roomType}
            </button>
        </>
    )
}