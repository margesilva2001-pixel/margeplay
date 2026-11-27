# NeGoPLAy — projeto inicial Android

Projeto Expo/React Native com identidade preta e roxa, ícone fornecido, biblioteca por categorias, busca, favoritos, cadastro manual de títulos e player de links diretos compatíveis.

## Importante
- Este é um protótipo inicial funcional, não um serviço de streaming pronto.
- O player reproduz URLs diretas compatíveis (por exemplo MP4/HLS) e fontes autorizadas. Páginas web comuns não são necessariamente arquivos de vídeo reproduzíveis.
- Os dados ainda estão em memória: ao fechar o app, o catálogo de demonstração e cadastros são reiniciados. Persistência local (SQLite/AsyncStorage), metadados TMDB/AniList e sincronização são próximas etapas.
- Não inclui raspagem de sites, bypass de DRM ou remoção de anúncios de terceiros.

## Gerar APK na nuvem
1. Envie a pasta do projeto para um repositório GitHub ou abra-a em um ambiente de desenvolvimento na nuvem.
2. No terminal desse ambiente, instale dependências: `npm install`.
3. Faça login no Expo: `npx eas-cli login`.
4. Configure o projeto: `npx eas-cli build:configure`.
5. Gere APK: `npx eas-cli build --platform android --profile preview`.
6. Abra o link fornecido pelo Expo Build e baixe o APK no Android.

A documentação oficial: https://docs.expo.dev/build-reference/apk/
