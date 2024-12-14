import Image from "next/image"

const Footer: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-2 bg-secondaryGreen h-16 w-screen -ml-20">
            <h4 className="pr-4">Projeto desenvolvido pelos alunos do IFTM - Campus Paracatu</h4>
            <Image
                alt="Logo IFTM - Campus Paracatu"
                src={"/logo-iftm-paracatu.png"}
                height={70}
                width={150}
            />
        </div>
    )
}

export default Footer