# MARGEPLAY — app Android

App de filmes, desenhos, anime clássico, séries antigas e canais ao vivo, usando só fontes gratuitas e liberadas.

## O que o app faz
- **Catálogo:** filmes clássicos, desenhos e animações, anime clássico, séries de TV, terror e ficção, policial noir, cinema mudo e filmes abertos. Vem do Internet Archive (domínio público e licenças abertas).
- **Biblioteca de filmes:** aba própria com o acervo completo, filtro por categoria e década, ordenação (mais assistidos, adicionados recentemente, A–Z, ano) e rolagem infinita.
- **Filtro de idioma opcional:** por padrão mostra todos os idiomas. Se quiser, escolha "Só com PT" (áudio em português, selo DUB PT, ou legenda PT-BR, selo LEG PT) ou um idioma específico com legenda PT-BR.
- **Títulos oficiais em português:** quando o filme está cadastrado no Wikidata, aparece o título usado no Brasil, com o título original menor embaixo. Sem tradução, o app mostra o título original limpo, sem "(1922)", "Restored" ou "HD". A busca também encontra pelo nome em português.
- **Player no próprio app:** tela cheia, lista de episódios, botão "Próximo" e legenda PT-BR ligada automaticamente.
- **Busca** por título, ator, diretor ou tema, com filtro por categoria e idioma.
- **Minha lista:** favoritos, continuar assistindo (salva o ponto onde você parou) e já assistidos.
- **Ao vivo:** canais oficiais do YouTube. Vem com TV Cultura e Lofi Girl, e você pode adicionar outros colando o link.

## Provedores e atualização automática
Os endereços que o app usa (Internet Archive, Wikidata, categorias e canais ao vivo) ficam no arquivo **`providers.json`**, na raiz do projeto.
- Quando o APK é gerado pelo GitHub Actions, o app já vem apontado para o `providers.json` do seu repositório. Para trocar um link, edite esse arquivo no GitHub e aumente o número de `version`. O app baixa a versão nova sozinho, sem precisar gerar outro APK.
- O app confere a lista ao abrir e a cada 6 horas. Em `archive`, os endereços são testados em ordem: se o primeiro cair, ele passa para o próximo.
- Tudo isso fica em **Ajustes** (engrenagem no topo): ligar ou desligar a atualização automática, trocar o endereço da lista, "Atualizar agora", "Testar provedores" e "Restaurar padrão".
- O repositório precisa ser **público** para o app conseguir ler o `providers.json`. Se for privado, hospede o arquivo em outro lugar público e cole o endereço em Ajustes.
- Gerando pelo Android Studio, o endereço vem vazio: cole o link "raw" do seu `providers.json` em Ajustes, ou preencha `app/src/main/assets/www/config.js`.

## Como gerar o APK

### Opção 1: Android Studio (no computador)
1. Instale o Android Studio (gratuito) em developer.android.com/studio.
2. Descompacte este ZIP e abra a pasta `margeplay` em **File > Open**.
3. Espere o Android Studio baixar o que falta. Isso acontece sozinho na primeira vez.
4. Vá em **Build > Build App Bundle(s) / APK(s) > Build APK(s)**.
5. O arquivo sai em `app/build/outputs/apk/`. Passe para o celular e instale. O Android vai pedir para permitir "instalar apps desconhecidos".

### Opção 2: GitHub (sem instalar nada)
1. Crie um repositório no GitHub e envie todo o conteúdo desta pasta.
2. Na aba **Actions**, o processo "Gerar APK do MARGEPLAY" roda sozinho.
3. Quando terminar, baixe o arquivo **MARGEPLAY-apk** e instale no celular.

## Onde mexer
- Interface completa: `app/src/main/assets/www/index.html`. Esse arquivo também abre no navegador do PC para testes.
- Ícone: `app/src/main/res/mipmap-*/ic_launcher.png`.
- Nome do app: `app/src/main/res/values/strings.xml`.

## Observações
- O Internet Archive não diferencia português do Brasil de português de Portugal. Títulos marcados como "Portuguese" entram como DUB PT.
- O acervo dublado ou legendado em PT-BR em domínio público é pequeno. Com o filtro "Só com PT" ligado, algumas categorias podem aparecer vazias; volte para "Todos os idiomas" para ver tudo.
- Para publicar na Play Store, você precisa de uma assinatura própria e de autorização para usar a foto do ícone.
