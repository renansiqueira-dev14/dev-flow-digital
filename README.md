# DevFlow Digital

Site institucional responsivo em React + Vite, com páginas para início, projetos, serviços, segmentos comerciais, sobre e contato. Cada planeta de serviço e cada segmento comercial abre uma página própria com exemplos, benefícios e fluxo de trabalho.

## Rodar localmente

1. Instale Node.js (versão LTS).
2. Nesta pasta, execute `npm install`.
3. Execute `npm run dev` e abra o endereço local mostrado no terminal.
4. Para gerar a versão de publicação, execute `npm run build`. Os arquivos ficam em `dist/`.

## Onde personalizar

- `src/content.js`: e-mail, telefone, WhatsApp, Instagram, serviços, segmentos, páginas de detalhe, diferenciais e processo.
- `src/App.jsx`: conteúdo e estrutura das páginas, navegação, formulário, planeta interativo e demonstração do CRM.
- `src/styles.css`: cores, tipografia e estilos responsivos.
- `src/projects.json`: demonstrações do portfólio, sem editar os componentes do site.

WhatsApp e e-mail estão configurados. O formulário abre uma mensagem para revisão no WhatsApp e não grava os dados num servidor da DevFlow. Consulte `/privacidade` para a explicação do fluxo; a empresa deve revisar o texto antes da publicação final.

## Adicionar um projeto

Adicione um objeto a `src/projects.json`, seguindo este formato:

```json
{
  "name": "Nome do projeto",
  "slug": "nome-do-projeto",
  "segment": "Restaurante",
  "description": "Descrição breve da demonstração.",
  "status": "Protótipo demonstrativo",
  "objective": "O que esta demonstração ilustra.",
  "features": ["Recurso demonstrado"],
  "image": "/projects/restaurante.jpg",
  "demoUrl": "/project-demos/restaurante/index.html",
  "serviceId": "sites"
}
```

Coloque as imagens dentro de `public/projects/` e os arquivos da prévia em `public/project-demos/<slug>/`. Os cartões abrem uma página própria do portfólio que incorpora a prévia em um iframe. Os dados são importados com o aplicativo, sem uma requisição adicional ao catálogo.

## Rotas, busca e publicação

O comando `npm run build` gera uma página HTML para cada rota pública, com título, descrição e URL canônica próprios. Também cria `sitemap.xml` e `robots.txt` para o domínio GitHub Pages configurado em `scripts/generate-pages.mjs`. Atualize domínio e caminho do repositório nesse script se a URL pública mudar.

As demonstrações que dependem de Firebase usam dados de exemplo ou ficam sem conexão a um banco. Formulários, contatos, pagamentos e agendamentos exibidos nas prévias não enviam dados reais.

## Formulário de contato

O formulário valida nome, empresa, serviço e mensagem; o e-mail é opcional. Ao enviar, abre o WhatsApp comercial com uma mensagem preenchida para o visitante conferir e enviar.

## Demonstração do CRM

A página `/servicos/crm` inclui um painel interativo com filtro de período, resumo de vendas, produtos, quantidades e meios de pagamento. Os números são fictícios e estão identificados como demonstração; o painel não está conectado a um banco ou conta de cliente.

## Assistente guiado

A demonstração do assistente usa perguntas clicáveis e respostas explicativas preparadas pela DevFlow. Não precisa de chave de API nem de conexão externa. Para alterar as perguntas ou respostas, edite a lista `questions` dentro de `AgentDemo` em `src/App.jsx`.

## Logo e planeta interativo

O símbolo enviado foi separado da captura de tela e aplicado de forma circular. Na primeira tela, a logo é o planeta central; os três planetas de serviço e as órbitas ficam fixos. Segure a esfera central com o botão esquerdo e arraste para incliná-la e girá-la em 3D.
