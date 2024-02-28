import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

import { StoreProvider } from "@/mobx-store/use-store-provider"; //!нужен такой импорт

import "./globals.css";

export const metadata: Metadata = {
  title: "Картографы",
  description: "Игровой планшет с автоматическим подсчетом очков",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <StoreProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
