// Component
import NavBarMenu from './components/NavBars/NavBarMenu/NavBarMenu';
// Styles
import './globals.css';
// Fonts
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aruba MID Docs App',
  description: 'Designed and developed by Team Upstream',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarMenu />
        {children}
      </body>
    </html>
  );
}
