import React, {ReactElement} from "react";

interface IAlignCenterProps {
    children: ReactElement | ReactElement[]
}

const AlignCenter = ({ children }: IAlignCenterProps) => (
    <div className="alignCenter">{children}</div>
)

export default AlignCenter