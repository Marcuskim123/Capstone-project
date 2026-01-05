import { AuthProvider } from '@/lib/AuthContext'


export default function RootLayout({ children }) {

    const geistSans = Geist({
      variable: "--font-geist-sans",
      subsets: ["latin"],
    });
    
    const geistMono = Geist_Mono({
      variable: "--font-geist-mono",
      subsets: ["latin"],
    });
    
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AuthProvider>
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}