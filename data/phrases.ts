/**
 * Phrase Database for Fluent Now
 * 
 * Organized by:
 * - Category: travel, business, casual, academic
 * - Level: beginner, intermediate, advanced
 */

import { Card, createCard } from '@/lib/srs';

interface PhraseData {
    phrase: string;
    translation: string;
}

// ============================================================================
// TRAVEL PHRASES
// ============================================================================

const travelBeginner: PhraseData[] = [
    { phrase: "Where is the bathroom?", translation: "Onde fica o banheiro?" },
    { phrase: "How much does this cost?", translation: "Quanto custa isso?" },
    { phrase: "I need help", translation: "Eu preciso de ajuda" },
    { phrase: "Can you speak slower?", translation: "Você pode falar mais devagar?" },
    { phrase: "I don't understand", translation: "Eu não entendo" },
    { phrase: "Where is the airport?", translation: "Onde fica o aeroporto?" },
    { phrase: "I'm lost", translation: "Estou perdido" },
    { phrase: "Can I have the menu?", translation: "Posso ver o cardápio?" },
    { phrase: "Water, please", translation: "Água, por favor" },
    { phrase: "Thank you very much", translation: "Muito obrigado" },
    { phrase: "Excuse me", translation: "Com licença" },
    { phrase: "I would like to book a room", translation: "Gostaria de reservar um quarto" },
    { phrase: "What time is it?", translation: "Que horas são?" },
    { phrase: "Where is the train station?", translation: "Onde fica a estação de trem?" },
    { phrase: "How do I get to...?", translation: "Como chego em...?" },
];

const travelIntermediate: PhraseData[] = [
    { phrase: "Could you recommend a good restaurant nearby?", translation: "Você poderia recomendar um bom restaurante por perto?" },
    { phrase: "I'd like to check in, please", translation: "Gostaria de fazer check-in, por favor" },
    { phrase: "Is breakfast included in the price?", translation: "O café da manhã está incluído no preço?" },
    { phrase: "Can I have a window seat?", translation: "Posso ter um assento na janela?" },
    { phrase: "What time does the museum close?", translation: "Que horas o museu fecha?" },
    { phrase: "I have a reservation under the name...", translation: "Tenho uma reserva no nome de..." },
    { phrase: "Could you call a taxi for me?", translation: "Você poderia chamar um táxi para mim?" },
    { phrase: "Is there WiFi available?", translation: "Tem WiFi disponível?" },
    { phrase: "I'm allergic to peanuts", translation: "Sou alérgico a amendoim" },
    { phrase: "Can I pay by credit card?", translation: "Posso pagar com cartão de crédito?" },
    { phrase: "What's the best way to get downtown?", translation: "Qual é a melhor forma de chegar ao centro?" },
    { phrase: "Do you have any vegetarian options?", translation: "Vocês têm opções vegetarianas?" },
    { phrase: "I'd like to exchange some currency", translation: "Gostaria de trocar algum dinheiro" },
    { phrase: "How long does the tour take?", translation: "Quanto tempo dura o passeio?" },
    { phrase: "Can I get a receipt?", translation: "Posso pegar um recibo?" },
];

const travelAdvanced: PhraseData[] = [
    { phrase: "I'm experiencing some issues with my accommodation", translation: "Estou tendo alguns problemas com minha acomodação" },
    { phrase: "Could you assist me with rebooking my flight?", translation: "Você poderia me ajudar a remarcar meu voo?" },
    { phrase: "I'd appreciate it if you could expedite the process", translation: "Eu agradeceria se você pudesse agilizar o processo" },
    { phrase: "What are the cancellation policies?", translation: "Quais são as políticas de cancelamento?" },
    { phrase: "I need to file a complaint about the service", translation: "Preciso fazer uma reclamação sobre o serviço" },
    { phrase: "Could you provide me with a detailed itinerary?", translation: "Você poderia me fornecer um itinerário detalhado?" },
    { phrase: "I'm looking for authentic local experiences", translation: "Estou procurando experiências locais autênticas" },
    { phrase: "What's the cultural significance of this landmark?", translation: "Qual é o significado cultural deste marco?" },
    { phrase: "I'd like to extend my stay for a few more days", translation: "Gostaria de estender minha estadia por mais alguns dias" },
    { phrase: "Are there any hidden fees I should be aware of?", translation: "Há alguma taxa oculta que eu deveria saber?" },
];

// ============================================================================
// BUSINESS PHRASES
// ============================================================================

const businessBeginner: PhraseData[] = [
    { phrase: "Nice to meet you", translation: "Prazer em conhecê-lo" },
    { phrase: "What do you do?", translation: "O que você faz?" },
    { phrase: "I work in marketing", translation: "Trabalho com marketing" },
    { phrase: "Can I have your business card?", translation: "Posso pegar seu cartão de visita?" },
    { phrase: "Let's schedule a meeting", translation: "Vamos agendar uma reunião" },
    { phrase: "I'll send you an email", translation: "Vou te enviar um email" },
    { phrase: "Thank you for your time", translation: "Obrigado pelo seu tempo" },
    { phrase: "I have a question", translation: "Tenho uma pergunta" },
    { phrase: "Could you repeat that?", translation: "Você poderia repetir isso?" },
    { phrase: "I agree with you", translation: "Concordo com você" },
    { phrase: "That's a good idea", translation: "Essa é uma boa ideia" },
    { phrase: "Let me think about it", translation: "Deixe-me pensar sobre isso" },
    { phrase: "I'll get back to you", translation: "Vou retornar para você" },
    { phrase: "What's your phone number?", translation: "Qual é o seu número de telefone?" },
    { phrase: "See you tomorrow", translation: "Vejo você amanhã" },
];

const businessIntermediate: PhraseData[] = [
    { phrase: "I'd like to discuss the project timeline", translation: "Gostaria de discutir o cronograma do projeto" },
    { phrase: "Could we schedule a follow-up meeting?", translation: "Poderíamos agendar uma reunião de acompanhamento?" },
    { phrase: "I'll need to consult with my team first", translation: "Vou precisar consultar minha equipe primeiro" },
    { phrase: "What are the key performance indicators?", translation: "Quais são os indicadores-chave de desempenho?" },
    { phrase: "Let's review the quarterly results", translation: "Vamos revisar os resultados trimestrais" },
    { phrase: "I'm responsible for client relations", translation: "Sou responsável pelas relações com clientes" },
    { phrase: "We need to meet the deadline", translation: "Precisamos cumprir o prazo" },
    { phrase: "Can you provide a cost estimate?", translation: "Você pode fornecer uma estimativa de custo?" },
    { phrase: "I'd like to propose an alternative solution", translation: "Gostaria de propor uma solução alternativa" },
    { phrase: "Let's brainstorm some ideas", translation: "Vamos fazer um brainstorm de ideias" },
    { phrase: "What's your availability next week?", translation: "Qual é sua disponibilidade na próxima semana?" },
    { phrase: "I'll forward you the presentation", translation: "Vou encaminhar a apresentação para você" },
    { phrase: "We should prioritize this task", translation: "Devemos priorizar esta tarefa" },
    { phrase: "Can we reschedule for another day?", translation: "Podemos reagendar para outro dia?" },
    { phrase: "I appreciate your feedback", translation: "Agradeço seu feedback" },
];

const businessAdvanced: PhraseData[] = [
    { phrase: "We need to leverage our competitive advantages", translation: "Precisamos aproveitar nossas vantagens competitivas" },
    { phrase: "Let's align our strategies with market trends", translation: "Vamos alinhar nossas estratégias com as tendências do mercado" },
    { phrase: "I'd like to negotiate the terms of the contract", translation: "Gostaria de negociar os termos do contrato" },
    { phrase: "We should conduct a thorough market analysis", translation: "Devemos conduzir uma análise de mercado completa" },
    { phrase: "What's the return on investment for this initiative?", translation: "Qual é o retorno sobre investimento para esta iniciativa?" },
    { phrase: "We need to streamline our operational processes", translation: "Precisamos otimizar nossos processos operacionais" },
    { phrase: "I propose we implement a phased approach", translation: "Proponho que implementemos uma abordagem em fases" },
    { phrase: "Let's establish clear key performance metrics", translation: "Vamos estabelecer métricas de desempenho claras" },
    { phrase: "We should diversify our portfolio", translation: "Devemos diversificar nosso portfólio" },
    { phrase: "I'd like to address the stakeholder concerns", translation: "Gostaria de abordar as preocupações das partes interessadas" },
];

// ============================================================================
// CASUAL PHRASES
// ============================================================================

const casualBeginner: PhraseData[] = [
    { phrase: "How are you?", translation: "Como você está?" },
    { phrase: "I'm fine, thanks", translation: "Estou bem, obrigado" },
    { phrase: "What's your name?", translation: "Qual é o seu nome?" },
    { phrase: "My name is...", translation: "Meu nome é..." },
    { phrase: "Where are you from?", translation: "De onde você é?" },
    { phrase: "I'm from Brazil", translation: "Sou do Brasil" },
    { phrase: "Do you speak English?", translation: "Você fala inglês?" },
    { phrase: "Yes, a little", translation: "Sim, um pouco" },
    { phrase: "Have a nice day", translation: "Tenha um bom dia" },
    { phrase: "See you later", translation: "Até mais tarde" },
    { phrase: "What time is it?", translation: "Que horas são?" },
    { phrase: "I like it", translation: "Eu gosto" },
    { phrase: "That's cool", translation: "Isso é legal" },
    { phrase: "I'm hungry", translation: "Estou com fome" },
    { phrase: "Let's go", translation: "Vamos" },
];

const casualIntermediate: PhraseData[] = [
    { phrase: "What do you do for fun?", translation: "O que você faz para se divertir?" },
    { phrase: "I love watching movies", translation: "Adoro assistir filmes" },
    { phrase: "Have you seen the latest episode?", translation: "Você viu o último episódio?" },
    { phrase: "What kind of music do you like?", translation: "Que tipo de música você gosta?" },
    { phrase: "I'm into rock and indie music", translation: "Curto rock e música indie" },
    { phrase: "Do you want to hang out sometime?", translation: "Quer sair alguma hora?" },
    { phrase: "That sounds like fun", translation: "Isso parece divertido" },
    { phrase: "I'm not really into that", translation: "Não curto muito isso" },
    { phrase: "What are you up to this weekend?", translation: "O que você vai fazer neste fim de semana?" },
    { phrase: "I'm planning to relax at home", translation: "Estou planejando relaxar em casa" },
    { phrase: "Have you tried that new restaurant?", translation: "Você experimentou aquele restaurante novo?" },
    { phrase: "I heard it's really good", translation: "Ouvi dizer que é muito bom" },
    { phrase: "Let's catch up soon", translation: "Vamos nos encontrar em breve" },
    { phrase: "I totally agree with you", translation: "Concordo totalmente com você" },
    { phrase: "That's hilarious!", translation: "Isso é hilário!" },
];

const casualAdvanced: PhraseData[] = [
    { phrase: "I've been meaning to check out that new art exhibition", translation: "Estava querendo conferir aquela nova exposição de arte" },
    { phrase: "What's your take on the current political situation?", translation: "Qual é sua opinião sobre a situação política atual?" },
    { phrase: "I'm really passionate about environmental issues", translation: "Sou muito apaixonado por questões ambientais" },
    { phrase: "That movie really resonated with me", translation: "Aquele filme realmente ressoou comigo" },
    { phrase: "I've been trying to broaden my horizons lately", translation: "Tenho tentado ampliar meus horizontes ultimamente" },
    { phrase: "What's your perspective on work-life balance?", translation: "Qual é sua perspectiva sobre equilíbrio trabalho-vida?" },
    { phrase: "I find that concept quite intriguing", translation: "Acho esse conceito bastante intrigante" },
    { phrase: "We should definitely explore that idea further", translation: "Definitivamente deveríamos explorar essa ideia mais a fundo" },
    { phrase: "I've been contemplating a career change", translation: "Tenho contemplado uma mudança de carreira" },
    { phrase: "That's a thought-provoking question", translation: "Essa é uma pergunta instigante" },
];

// ============================================================================
// ACADEMIC PHRASES
// ============================================================================

const academicBeginner: PhraseData[] = [
    { phrase: "I'm a student", translation: "Sou estudante" },
    { phrase: "What are you studying?", translation: "O que você está estudando?" },
    { phrase: "I study engineering", translation: "Estudo engenharia" },
    { phrase: "I have a test tomorrow", translation: "Tenho uma prova amanhã" },
    { phrase: "Can you help me with homework?", translation: "Você pode me ajudar com a lição de casa?" },
    { phrase: "I don't understand this", translation: "Não entendo isso" },
    { phrase: "Could you explain it again?", translation: "Você poderia explicar de novo?" },
    { phrase: "What's the deadline?", translation: "Qual é o prazo?" },
    { phrase: "I need to study more", translation: "Preciso estudar mais" },
    { phrase: "The class starts at 9 AM", translation: "A aula começa às 9h" },
    { phrase: "I'm doing research", translation: "Estou fazendo pesquisa" },
    { phrase: "Where is the library?", translation: "Onde fica a biblioteca?" },
    { phrase: "I have a presentation next week", translation: "Tenho uma apresentação semana que vem" },
    { phrase: "Can I borrow your notes?", translation: "Posso pegar suas anotações emprestadas?" },
    { phrase: "I passed the exam", translation: "Passei na prova" },
];

const academicIntermediate: PhraseData[] = [
    { phrase: "I'm conducting research on climate change", translation: "Estou conduzindo pesquisa sobre mudanças climáticas" },
    { phrase: "Could you clarify the methodology?", translation: "Você poderia esclarecer a metodologia?" },
    { phrase: "I need to cite my sources properly", translation: "Preciso citar minhas fontes corretamente" },
    { phrase: "What's the theoretical framework for this study?", translation: "Qual é o framework teórico para este estudo?" },
    { phrase: "I'm working on my thesis", translation: "Estou trabalhando na minha tese" },
    { phrase: "The professor assigned a challenging reading", translation: "O professor designou uma leitura desafiadora" },
    { phrase: "I need to analyze the data", translation: "Preciso analisar os dados" },
    { phrase: "Can we form a study group?", translation: "Podemos formar um grupo de estudos?" },
    { phrase: "I'm applying for a scholarship", translation: "Estou me candidatando a uma bolsa" },
    { phrase: "The seminar was very informative", translation: "O seminário foi muito informativo" },
    { phrase: "I need to review the literature", translation: "Preciso revisar a literatura" },
    { phrase: "What are the prerequisites for this course?", translation: "Quais são os pré-requisitos para este curso?" },
    { phrase: "I'm attending a conference next month", translation: "Vou participar de uma conferência mês que vem" },
    { phrase: "Could you recommend some relevant articles?", translation: "Você poderia recomendar alguns artigos relevantes?" },
    { phrase: "I need to submit my paper by Friday", translation: "Preciso entregar meu trabalho até sexta" },
];

const academicAdvanced: PhraseData[] = [
    { phrase: "My research focuses on the intersection of technology and society", translation: "Minha pesquisa foca na interseção entre tecnologia e sociedade" },
    { phrase: "I'm examining the epistemological implications", translation: "Estou examinando as implicações epistemológicas" },
    { phrase: "The hypothesis requires further empirical validation", translation: "A hipótese requer validação empírica adicional" },
    { phrase: "I'm critiquing the prevailing paradigm", translation: "Estou criticando o paradigma predominante" },
    { phrase: "This study contributes to the existing body of knowledge", translation: "Este estudo contribui para o corpo de conhecimento existente" },
    { phrase: "I'm synthesizing multiple theoretical perspectives", translation: "Estou sintetizando múltiplas perspectivas teóricas" },
    { phrase: "The methodology employs a mixed-methods approach", translation: "A metodologia emprega uma abordagem de métodos mistos" },
    { phrase: "I need to address the limitations of this study", translation: "Preciso abordar as limitações deste estudo" },
    { phrase: "The findings have significant implications for policy", translation: "Os achados têm implicações significativas para políticas" },
    { phrase: "I'm defending my dissertation next semester", translation: "Vou defender minha dissertação no próximo semestre" },
];

// ============================================================================
// EXPORT FUNCTIONS
// ============================================================================

/**
 * Get all phrases for a specific category and level
 */
export function getPhrases(
    category: 'travel' | 'business' | 'casual' | 'academic',
    level: 'beginner' | 'intermediate' | 'advanced'
): PhraseData[] {
    const phraseMap: Record<string, Record<string, PhraseData[]>> = {
        travel: {
            beginner: travelBeginner,
            intermediate: travelIntermediate,
            advanced: travelAdvanced
        },
        business: {
            beginner: businessBeginner,
            intermediate: businessIntermediate,
            advanced: businessAdvanced
        },
        casual: {
            beginner: casualBeginner,
            intermediate: casualIntermediate,
            advanced: casualAdvanced
        },
        academic: {
            beginner: academicBeginner,
            intermediate: academicIntermediate,
            advanced: academicAdvanced
        }
    };

    return phraseMap[category]?.[level] || [];
}

/**
 * Convert phrase data to SRS cards
 */
export function initializeCards(
    category: 'travel' | 'business' | 'casual' | 'academic',
    level: 'beginner' | 'intermediate' | 'advanced'
): Card[] {
    const phrases = getPhrases(category, level);
    return phrases.map(p => createCard(p.phrase, p.translation, category, level));
}

/**
 * Get total number of phrases available
 */
export function getTotalPhraseCount(): number {
    let total = 0;
    const categories: Array<'travel' | 'business' | 'casual' | 'academic'> = ['travel', 'business', 'casual', 'academic'];
    const levels: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];

    categories.forEach(cat => {
        levels.forEach(lvl => {
            total += getPhrases(cat, lvl).length;
        });
    });

    return total;
}
