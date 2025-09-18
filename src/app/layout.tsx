import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from "@mui/system";
import theme from "@/src/theme/theme";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hungaroton Művészek",
    description: "Fedezze fel a magyar klasszikus zene művészeit",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
