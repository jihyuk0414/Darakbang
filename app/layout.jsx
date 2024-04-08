import StyledComponentsRegistry from "../lib/registry";
import Providers from "./providers";


export const metadata = {
  title: "다락방",
  description: "당신의 숨겨진 물건을 찾으세요!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}