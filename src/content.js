// Atualize os dados quando receber as informações definitivas da empresa.
export const studio = {
  name: 'DevFlow Digital',
  email: 'devflow06@gmail.com',
  phone: '+55 (81) 99467-3091',
  whatsapp: '5581994673091', // somente números, com código do país
  instagram: 'https://www.instagram.com/devflowdigital.com.br/',
  about: 'Este espaço será preenchido com a apresentação da empresa enviada por você.',
}

// Projetos reais vêm de public/projects.json; não há clientes fictícios no portfólio.
export const projectSlots = ['Projeto 01', 'Projeto 02', 'Projeto 03', 'Projeto 04']

export const services = [
  { id: 'sites', detailPath: '/servicos/sites', number: '01', title: 'Desenvolvimento de sites', short: 'Sites para o seu negócio', nodeText: 'Mostre produtos e facilite pedidos, orçamentos e contatos.', text: 'Seu site apresenta serviços, produtos, preços, localização e formas de contato mesmo quando sua equipe está ocupada ou fora do horário. Ele ajuda o cliente a entender sua oferta e iniciar um pedido de orçamento. Assim, você reduz explicações repetidas e facilita a chegada de novos contatos.', icon: '◫', examples: 'Institucional · catálogo · cardápio · página de orçamento' },
  { id: 'clientes', detailPath: '/servicos/crm', number: '02', title: 'CRM: sistema de clientes, vendas e produtos', short: 'Clientes e vendas', nodeText: 'Veja vendas por dia, produto e pagamento; acompanhe clientes e retornos.', text: 'CRM é um sistema para organizar clientes e acompanhar as vendas. Registre o valor vendido em cada dia, os produtos e quantidades vendidos, quanto cada produto vendeu e o método de pagamento. Veja o que tem mais saída, acompanhe conversas e próximos passos e reduza controles manuais espalhados entre cadernos e planilhas.', icon: '▦', examples: 'Vendas por dia · quantidade e valor por produto · formas de pagamento · clientes e oportunidades' },
  { id: 'ia', detailPath: '/servicos/ia', number: '03', title: 'Agentes de inteligência artificial', short: 'Agentes de IA', nodeText: 'Automatize dúvidas e tarefas repetidas para liberar sua equipe.', text: 'Agentes de IA podem responder dúvidas frequentes, coletar informações de clientes, apoiar pedidos e executar tarefas repetitivas conforme as regras da empresa. Isso reduz o tempo gasto em atividades manuais e deixa a equipe mais livre para resolver casos especiais e atender melhor.', icon: '✧', examples: 'Dúvidas frequentes · coleta de pedidos · encaminhamento · tarefas automáticas' },
]

export const segments = [
  { id: 'restaurantes', name: 'Restaurantes', icon: 'utensils', examples: ['Pizzarias', 'Lanchonetes', 'Delivery'] },
  { id: 'distribuidoras', name: 'Distribuidoras', icon: 'boxes', examples: ['Alimentos e bebidas', 'Autopeças', 'Materiais de construção'] },
  { id: 'lojas', name: 'Lojas e comércios', icon: 'store', examples: ['Moda', 'Eletrônicos', 'Comércio local'] },
  { id: 'servicos', name: 'Prestadores de serviços', icon: 'briefcase', examples: ['Advocacia', 'Barbearias e salões', 'Oficinas'] },
  { id: 'crescimento', name: 'Empresas em crescimento', icon: 'growth', examples: ['Vendas em vários canais', 'Times comerciais', 'Operações em expansão'] },
]

export const differentiators = [
  'Soluções pensadas para as necessidades do seu negócio.',
  'Design profissional e simples de usar.',
  'Tecnologia aplicada para resolver problemas reais.',
  'Sites, gestão e automação trabalhando juntos.',
  'Atendimento próximo e comunicação transparente.',
]

export const processSteps = [
  { title: 'Entendemos seu negócio', text: 'Conversamos sobre suas necessidades e seus objetivos.' },
  { title: 'Planejamos a solução', text: 'Definimos a estrutura mais adequada para seu projeto.' },
  { title: 'Desenvolvemos', text: 'Criamos e configuramos a solução personalizada.' },
  { title: 'Entregamos', text: 'Apresentamos o projeto e orientamos você sobre o uso.' },
]

export const serviceDetails = {
  sites: {
    eyebrow: 'SITE PROFISSIONAL PARA SUA EMPRESA',
    headline: 'Sua empresa aberta na internet, mesmo quando você está ocupado.',
    intro: 'Um site personalizado apresenta o que você vende, responde às dúvidas mais comuns e facilita o próximo passo do cliente: pedir um orçamento, fazer um pedido ou chamar sua equipe.',
    features: ['Apresentação de serviços, produtos e diferenciais', 'Cardápio ou catálogo digital organizado', 'Botões para WhatsApp, localização e redes sociais', 'Formulário para pedidos de orçamento e contato', 'Layout adaptado para celular, tablet e computador'],
    benefits: ['Menos tempo repetindo informações básicas', 'Cliente encontra detalhes da empresa a qualquer hora', 'Um caminho mais simples entre conhecer sua oferta e falar com você'],
    closing: 'A estrutura é planejada conforme o tipo de negócio e o que seus clientes precisam encontrar.'
  },
  clientes: {
    eyebrow: 'CLIENTES, PRODUTOS E VENDAS ORGANIZADOS',
    headline: 'Saiba quanto vendeu, o que saiu e como cada venda foi paga.',
    intro: 'CRM é um sistema para acompanhar o relacionamento com clientes e organizar as vendas da empresa. Em vez de procurar informações em vários lugares, você consulta registros e enxerga o movimento do negócio em um só ambiente.',
    features: ['Resumo de vendas por dia e método de pagamento', 'Produtos vendidos, quantidades e valor de cada item', 'Quadro visual de etapas para acompanhar negociações', 'Cadastro de contatos e histórico de atividades', 'Tarefas, lembretes e anotações ligados a cada cliente', 'Importação e exportação dos dados; integrações por API quando previstas no projeto'],
    benefits: ['Menos somas e controles manuais no fechamento do dia', 'Mais clareza para identificar produtos com maior ou menor saída', 'Menos risco de esquecer um cliente, tarefa ou negociação', 'Equipe consulta o histórico e sabe quem está cuidando de cada oportunidade'],
    closing: 'O CRM pode combinar acompanhamento de clientes, tarefas e vendas em um sistema adaptado ao processo da sua empresa.'
  },
  ia: {
    eyebrow: 'AUTOMAÇÃO PARA ATENDER E PRODUZIR MAIS',
    headline: 'Deixe as tarefas repetitivas com a automação e foque no que precisa de você.',
    intro: 'Um agente de inteligência artificial pode conversar com clientes e executar tarefas definidas para sua empresa. Ele ajuda a lidar com perguntas frequentes e organizar informações, enquanto sua equipe dedica atenção aos casos que pedem cuidado humano.',
    features: ['Respostas para dúvidas frequentes sobre produtos e serviços', 'Coleta de informações antes de encaminhar o atendimento', 'Apoio na organização de pedidos e solicitações', 'Encaminhamento de casos para a pessoa ou equipe certa', 'Automação de tarefas repetitivas conforme as regras combinadas'],
    benefits: ['Menos tempo respondendo a mesma pergunta manualmente', 'Atendimento inicial mais organizado', 'Equipe com mais tempo para vendas, execução e situações especiais'],
    closing: 'O agente é desenhado para as tarefas e limites combinados com cada empresa; casos especiais podem ser encaminhados à equipe.'
  }
}

export const segmentDetails = {
  restaurantes: {
    eyebrow: 'PARA PIZZARIAS, LANCHONETES E RESTAURANTES', headline: 'Do cardápio ao pedido: facilite a escolha antes do cliente chamar.',
    intro: 'No horário de pico, a equipe não pode parar para mandar foto do cardápio, repetir o endereço ou responder as mesmas perguntas. Uma página própria pode mostrar categorias, itens, preços, horário e entrega; o pedido pode seguir para o WhatsApp para a equipe confirmar.',
    features: ['Cardápio separado por categorias, como pizzas, bebidas, combos e sobremesas', 'Preço e descrição dos itens para o cliente montar a escolha', 'Botão de pedido que abre o WhatsApp com a solicitação', 'CRM para registrar venda do dia, item, quantidade e forma de pagamento', 'Agente de IA para dúvidas como horário, endereço e opções de entrega, com encaminhamento para a equipe confirmar o pedido'],
    benefits: ['Menos interrupções para enviar cardápio e responder perguntas repetidas', 'O cliente chega ao atendimento já sabendo o que quer pedir', 'No fechamento, a equipe pode consultar quais itens saíram e como foram pagos'],
    examples: [{ title: 'Pizzaria', text: 'Organize sabores, tamanhos, adicionais e combos. O cliente envia a escolha para a equipe confirmar.' }, { title: 'Marmitaria', text: 'Destaque prato do dia, opções e horários para pedido ou retirada.' }, { title: 'Delivery', text: 'Mostre bairros atendidos, horário, formas de pagamento e caminho do pedido.' }],
    workflow: ['Cliente abre o cardápio pelo link ou QR Code', 'Escolhe itens, quantidades e adicionais disponíveis', 'Pedido chega ao WhatsApp para a equipe confirmar', 'Venda é registrada para acompanhar itens e pagamentos'],
    services: ['sites', 'clientes', 'ia']
  },
  distribuidoras: {
    eyebrow: 'PARA DISTRIBUIDORAS E ATACADISTAS B2B', headline: 'Ajude o lojista a montar o pedido e sua equipe a não perder a cotação.',
    intro: 'O comprador geralmente precisa conferir produtos, quantidades, condição comercial e prazo antes de fechar. Um catálogo B2B apresenta o mix da distribuidora; um formulário pode reunir a lista de interesse para o vendedor revisar preço, disponibilidade e entrega antes da confirmação.',
    features: ['Catálogo por marca, categoria ou linha de produto, com código e apresentação', 'Pedido de cotação com os itens e quantidades desejados pelo comprador', 'CRM com cadastro da empresa cliente, histórico de pedidos e vendedor responsável', 'Lembretes para retomar cotações abertas e clientes que costumam recomprar', 'Relatório das vendas por dia, produto, quantidade e meio de pagamento'],
    benefits: ['Menos tempo procurando e reenviando catálogos em conversas antigas', 'O vendedor recebe a lista do que o lojista quer cotar antes de retornar', 'A carteira e o histórico continuam organizados mesmo quando muda o responsável'],
    examples: [{ title: 'Alimentos e bebidas', text: 'Separe marcas, embalagens e volumes; receba uma lista de compra com quantidades para cotação.' }, { title: 'Autopeças', text: 'Exiba códigos e características. A equipe confirma aplicação e disponibilidade antes de fechar.' }, { title: 'Materiais de construção', text: 'Ajude o comprador a listar itens e medidas; vendedor confirma preço e prazo de entrega.' }],
    workflow: ['Lojista consulta o catálogo e separa os produtos', 'Envia itens e quantidades para cotação', 'Vendedor confere preço, disponibilidade e prazo de entrega', 'CRM registra negociação, pedido confirmado e próximo contato'],
    services: ['sites', 'clientes', 'ia']
  },
  lojas: {
    eyebrow: 'PARA LOJAS FÍSICAS E COMÉRCIO LOCAL', headline: 'Leve a vitrine da loja para o celular sem perder o atendimento próximo.',
    intro: 'Muita gente vê um produto no Instagram, pergunta o preço pelo WhatsApp e depois passa na loja para retirar. Uma vitrine digital ajuda a mostrar fotos, variações, preço e como comprar; o CRM registra o interesse e o que foi vendido para a equipe dar continuidade ao atendimento.',
    features: ['Catálogo com fotos, descrições, preços e variações informadas pela loja', 'Links a partir do Instagram e WhatsApp para cada produto ou categoria', 'Opção para chamar no WhatsApp, consultar ou combinar retirada na loja', 'CRM para anotar interesse, cliente, produto vendido, quantidade e pagamento', 'Agente de IA para responder perguntas sobre produtos e encaminhar dúvidas específicas'],
    benefits: ['Menos fotos e preços enviados um por um no atendimento', 'Cliente pode pesquisar antes de ir até a loja', 'A equipe consegue retomar uma conversa sobre um produto específico'],
    examples: [{ title: 'Moda', text: 'Mostre cores, tamanhos e fotos para a pessoa conferir antes de chamar ou visitar a loja.' }, { title: 'Eletrônicos', text: 'Apresente especificações, compatibilidade e perguntas frequentes de cada produto.' }, { title: 'Comércio local', text: 'Divulgue novidades e facilite consulta, pedido e retirada pelo canal da loja.' }],
    workflow: ['Loja publica o catálogo e compartilha o link nas redes', 'Cliente consulta foto, preço e detalhes do produto', 'Conversa ou pedido chega à equipe pelo canal escolhido', 'Equipe registra a venda e consulta os produtos com maior saída'],
    services: ['sites', 'clientes', 'ia']
  },
  servicos: {
    eyebrow: 'PARA PROFISSIONAIS, OFICINAS E EMPRESAS DE SERVIÇO', headline: 'Transforme o pedido de orçamento em um processo que você consegue acompanhar.',
    intro: 'Quem presta serviço precisa entender o problema antes de dar preço: local, tipo de serviço, urgência e, às vezes, fotos ou medidas. O site pode coletar esses dados logo no primeiro contato; o CRM acompanha orçamento enviado, aprovação, agendamento e retorno após a entrega.',
    features: ['Página de serviços com área atendida, portfólio e perguntas comuns', 'Formulário de orçamento que coleta tipo de serviço, localização e prazo desejado', 'CRM com etapas: novo pedido, orçamento enviado, aprovado, agendado e concluído', 'Lembretes para retornar propostas e confirmar compromissos', 'Agente de IA para coletar detalhes iniciais e passar casos urgentes para uma pessoa'],
    benefits: ['Menos troca de mensagens só para descobrir o que o cliente precisa', 'Orçamentos e compromissos ficam mais fáceis de acompanhar', 'Histórico ajuda a retomar proposta e fazer o pós-atendimento'],
    examples: [{ title: 'Advocacia', text: 'Apresente áreas de atuação e receba pedidos de consulta com assunto e melhor horário para retorno.' }, { title: 'Barbearias e salões', text: 'Liste serviços e duração aproximada; receba pedidos de horário e acompanhe retornos de clientes.' }, { title: 'Oficinas', text: 'Colete modelo do veículo, descrição do problema e fotos antes da avaliação do profissional.' }],
    workflow: ['Cliente descreve o serviço e informa local e prazo', 'Profissional avalia os detalhes e prepara o orçamento', 'CRM acompanha aprovação e data agendada', 'Após o serviço, equipe registra conclusão e combina o próximo passo'],
    services: ['sites', 'clientes', 'ia']
  },
  crescimento: {
    eyebrow: 'PARA EMPRESAS COM MAIS CLIENTES E UMA EQUIPE CRESCENDO', headline: 'Quando o volume aumenta, cada pedido precisa ter dono e próximo passo.',
    intro: 'O crescimento costuma trazer contatos de vários canais, mais vendedores e mais tarefas de acompanhamento. A solução começa por registrar de onde veio cada oportunidade, quem ficou responsável e o que precisa acontecer em seguida; depois, automatiza as tarefas repetitivas que já têm um processo claro.',
    features: ['Site que direciona cada tipo de cliente ao serviço, produto ou equipe certa', 'CRM com origem do contato, responsável, etapa da venda e histórico', 'Visão diária das vendas e detalhamento por produto, quantidade e pagamento', 'Painel de retornos e negociações paradas para a equipe priorizar', 'Agentes de IA para responder perguntas iniciais e organizar solicitações padronizadas'],
    benefits: ['Menos dependência de mensagens e planilhas pessoais de cada vendedor', 'Gestor enxerga o que está parado e consegue redistribuir prioridades', 'Automação libera tempo da equipe sem esconder os casos que precisam de análise humana'],
    examples: [{ title: 'Mais canais', text: 'Registre se o contato veio do site, WhatsApp, Instagram ou indicação e direcione ao responsável.' }, { title: 'Equipe comercial', text: 'Acompanhe etapa, responsável e tarefa seguinte para que oportunidades não parem sem retorno.' }, { title: 'Vendas em escala', text: 'Consulte vendas por dia, produto, quantidade e pagamento em um relatório organizado.' }],
    workflow: ['Contato entra pelo site ou canal comercial', 'CRM registra origem e atribui um responsável', 'Equipe avança a oportunidade e anota o próximo passo', 'Relatórios mostram vendas, produtos e negociações que pedem atenção'],
    services: ['sites', 'clientes', 'ia']
  }
}
