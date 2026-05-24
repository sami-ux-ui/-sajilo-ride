import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import GlobalHeader from "@/components/GlobalHeader";

export const metadata: Metadata = {
  title: "Sajilo Ride - Premium & Cultural Ride Booking Nepal",
  description: "Book auto-rickshaws, bike rides, comfortable cabs, and electric eco-scooters instantly across Nepal. Secure eSewa/Khalti integrations, dynamic AI pricing, and 90% driver payouts.",
  keywords: ["Sajilo Ride", "Nepal Ride Sharing", "Pathao", "InDrive", "Kathmandu ride sharing", "eSewa Payment", "Khalti Payment", "Nepal Taxi Booking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        <AppProvider>
          <div className="flex flex-col min-h-screen transition-colors duration-300">
            {/* Global Glassmorphic Header */}
            <GlobalHeader />
            
            {/* Page Content */}
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
