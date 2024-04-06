import { CartContextProvider } from '@/components/CartContext';
import '@/styles/globals.css'
import { createGlobalStyle } from 'styled-components'
// import "../styles/global.css";
const GlobalStyles = createGlobalStyle`
body{
  background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
  padding: 0;
  margin: 0;
  font-family: "Merriweather", serif;
  font-weight: 400;
  font-style: normal;
}
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
