import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Sri Vinayaka Ganapathi Temple | ಶ್ರೀ ವಿನಾಯಕ ಗಣಪತಿ ದೇವಾಲಯ',
  description: 'Sri Vinayaka Ganapathi Temple - Basavanagudi, Bangalore. Book sevas, make donations, and seek divine blessings of Lord Ganapathi.',
  keywords: 'Vinayaka Temple, Ganapathi Temple, Bangalore Temple, Ganesh Temple, Seva Booking, Temple Donations, Basavanagudi',
  authors: [{ name: 'Sri Vinayaka Ganapathi Temple' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Sri Vinayaka Ganapathi Temple',
    description: 'Seek blessings of Lord Ganapathi at Sri Vinayaka Temple, Basavanagudi, Bangalore.',
    type: 'website',
    locale: 'en_IN',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#fff', color: '#2C1A0E', border: '1px solid #D4AF37', borderRadius: '12px' },
              success: { iconTheme: { primary: '#FF9A00', secondary: '#fff' } },
              error: { iconTheme: { primary: '#CC2200', secondary: '#fff' } },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
