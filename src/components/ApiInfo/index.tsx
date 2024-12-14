import { Icon } from "@iconify/react/dist/iconify.js"

interface IApiInfo {
    title: string
    text: string | number
    icon: string
}

const ApiInfo = ({
    title,
    icon,
    text
}: IApiInfo) => {
    return (
        <div className="flex flex-col items-center w-72 p-2 border-2 border-secondaryGreen">
            <Icon icon={icon} color="#38B887" width={40}/>
            <h3 className="text-xl text-center my-1">{title}</h3>
            <h4>{text}</h4>
        </div>
    )
}

export default ApiInfo