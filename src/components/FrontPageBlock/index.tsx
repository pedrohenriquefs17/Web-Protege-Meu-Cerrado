import { ReactNode } from "react"

interface IPage {
    children: ReactNode | ReactNode[]
}

export const FrontPageBlock = ({ children }: IPage) => {
    const renderChildrenContent = Array.isArray(children) ? children : [children]

    return (
        <div className="my-4 flex justify-between">
            {renderChildrenContent.map((child, index) => (
                <div key={index} className="w-2/5">
                    {child}
                </div>
            ))}
        </div>
    );
};