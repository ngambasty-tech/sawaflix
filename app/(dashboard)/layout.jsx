// import { Inter } from 'next/font/google';
// import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* navbar */}
        {/* leftbar */}
        {children}
        {/* rightbar */}
        {/*footer */}
        </body>
    </html>
  )
}