import { Icon } from "@iconify/react"

export const Header = () => {
    return (
        <div className="flex bg-[#386641] -ml-20 h-16 py-2 px-4 justify-between w-screen sticky top-0">
            <img src="logo-protege-meu-cerrado.png" />
            {/* TODO: ADICIONAR LINK PARA TELA DE LOGIN */}
            <a href="#" className="border-2 border-black rounded mr-4 px-2 bg-[#6a994e]">
                <button className="flex items-center">
                    <p>Login</p>
                    <Icon icon="material-symbols:login" height={40} />
                </button>
            </a>
        </div>
    )
}