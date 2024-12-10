import React from "react";
import Image from "next/image";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <Image
                    src="/logo-protege-meu-cerrado.png"
                    width={200}
                    height={41}
                    className="hidden md:block"
                    alt="Logo do projeto."
                />
            </header>
            <main style={styles.main}>{children}</main>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    header: {
        backgroundColor: "#127351",
        padding: "10px 10px",
    },
    main: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        //backgroundImage: "url('https://boomi.b-cdn.net/wp-content/uploads/2023/09/Dia-Nacional-do-Cerrado-A-importancia-do-cerrado-brasileiro.png')",
        backgroundImage: "url('/lobo2.png')",
        //backgroundImage: "url('/tucanoo.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden"
    },
};

export default Layout;