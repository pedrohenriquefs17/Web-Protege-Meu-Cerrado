import { ReactNode } from "react"

interface IPage {
    children: ReactNode | ReactNode[]
}

const LinearWrapper = ({ children }: IPage) => {
    const renderChildrenContent = Array.isArray(children) ? children : [children]
    const length = renderChildrenContent.length

    return (
        <div className="my-4 justify-between">
            {renderChildrenContent.map((child, index) => (
                <div key={index} className={`w-1/${length} px-4`}>
                    {child}
                </div>
            ))}
        </div>
    )
}

export default LinearWrapper