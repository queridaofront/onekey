# Modal OneKey Wallet

Este componente é um modal completo de onboarding/conexão de carteira, extraído do projeto OneKeyNova, pronto para ser utilizado em qualquer projeto React + Tailwind.

## Como usar

1. **Copie a pasta `modal-wallet`** para dentro do seu projeto React.
2. **Garanta que você está usando TailwindCSS** (ou adapte as classes para seu framework de estilos).
3. **Imagens necessárias:**
   - Copie os arquivos abaixo para a pasta `public/` do seu projeto:
     - `/iamgemwallet.png`
     - `/bvip39.png`
     - `/icons8-conector-usb.gif`
     - `/eth.png`
     - `/bsc.png`
     - `/avalanche.png`
     - `/celular.png`
   - Ajuste os caminhos das imagens no componente, se necessário.
4. **Importe e use o modal:**

```jsx
import { OneKeyWalletModal } from "./modal-wallet/OneKeyWalletModal";

function App() {
  return (
    <div>
      <OneKeyWalletModal open={true} onClose={() => {}} />
    </div>
  );
}
```

## Props

- `open`: boolean — controla se o modal está aberto.
- `onClose`: função chamada ao fechar o modal.

## Dependências

- React 18+
- TailwindCSS

## Observações

- O modal é totalmente controlado por estado interno, mas pode ser adaptado para receber mais props conforme necessidade.
- Para internacionalização, adapte os textos conforme seu projeto.
