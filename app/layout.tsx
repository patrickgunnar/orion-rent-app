import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import MainContent from "@/components/MainContent";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { Toaster } from "react-hot-toast";
import { MyUserContextProvider } from "@/hooks/useUser";


export const metadata = {
    title: "OrionRent",
    description: "Find the best place for your leisure.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // render content
    return (
        <html lang="en-GB">
            <body>
                <Toaster position="top-center" reverseOrder={false} />
                <SupabaseProvider>
                    <MyUserContextProvider>
                        <Navbar />
                        <MainContent>
                            {children}
                            <ModalProvider />
                        </MainContent>
                        <Footer />
                    </MyUserContextProvider>
                </SupabaseProvider>
			</body>
        </html>
    );
}
