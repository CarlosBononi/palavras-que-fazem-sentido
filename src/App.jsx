import { useState, useEffect, useRef } from "react";

const frasesFilosoficas = [
  { texto: "A vida nem sempre te dará flores, mas há sempre um jardim onde pode colhê-las.", autor: "Carlos Bononi", tema: "vida" },
  { texto: "Ninguém vai te salvar: ou você levanta por você, ou ninguém levanta por você.", autor: "Carlos Bononi", tema: "força" },
  { texto: "A vida não quer saber do que você sofreu; ela responde ao que você faz com isso hoje.", autor: "Carlos Bononi", tema: "ação" },
  { texto: "Depressão não é frescura, mas também não é sentença: se você não se mexer, ela manda em você.", autor: "Carlos Bononi", tema: "saúde" },
  { texto: "Dor não some com frase bonita; some quando você age mesmo sangrando por dentro.", autor: "Carlos Bononi", tema: "força" },
  { texto: "O mundo não vai parar porque você quebrou; ele segue, e ou você vai junto, ou fica para trás.", autor: "Carlos Bononi", tema: "ação" },
  { texto: "Ninguém vê as suas batalhas internas, só os seus resultados; é injusto, mas é a regra do jogo.", autor: "Carlos Bononi", tema: "vida" },
  { texto: "Você não é culpado pelo que fizeram com você, mas é responsável pelo que faz com isso agora.", autor: "Carlos Bononi", tema: "responsabilidade" },
  { texto: "Esperar a vontade aparecer é se condenar; primeiro você age, depois a vontade vem, nunca o contrário.", autor: "Carlos Bononi", tema: "ação" },
  { texto: "A verdade é dura: se você não decidir por você, alguém vai decidir a sua vida no seu lugar.", autor: "Carlos Bononi", tema: "liberdade" },
  { texto: "O fundo do poço não é o fim, é o ponto em que ou você cava mais fundo ou começa a escalar.", autor: "Carlos Bononi", tema: "esperança" },
  { texto: "Amai uns aos outros como eu vos amei.", autor: "Jesus Cristo", tema: "amor" },
  { texto: "Pedi e será dado a vós; buscai e encontrareis; batei e será aberto para vós.", autor: "Jesus Cristo", tema: "fé" },
  { texto: "Conhecereis a verdade, e a verdade vos libertará.", autor: "Jesus Cristo", tema: "liberdade" },
  { texto: "Não deixeis que o vosso coração se turbe, nem se amedronte.", autor: "Jesus Cristo", tema: "paz" },
  { texto: "A mente é tudo. O que você pensa, você se torna.", autor: "Buda", tema: "mente" },
  { texto: "A paz vem de dentro. Não a procure lá fora.", autor: "Buda", tema: "paz" },
  { texto: "Jamais, em todo o mundo, o ódio acabou com o ódio. O que acaba com o ódio é o amor.", autor: "Buda", tema: "amor" },
  { texto: "A vida é um eco. O que envia, volta. O que semeia, colhe.", autor: "Buda", tema: "karma" },
  { texto: "Embora ninguém possa voltar atrás e fazer um novo começo, qualquer um pode começar agora e fazer um novo fim.", autor: "Chico Xavier", tema: "recomeço" },
  { texto: "Deus nos concede, a cada dia, uma página de vida nova no livro do tempo. Aquilo que colocarmos nela, corre por nossa conta.", autor: "Chico Xavier", tema: "vida" },
  { texto: "Agradeço todas as dificuldades que enfrentei; não fosse por elas, eu não teria saído do lugar.", autor: "Chico Xavier", tema: "gratidão" },
  { texto: "A oração é a luz na escuridão da alma.", autor: "Chico Xavier", tema: "fé" },
  { texto: "O bem que praticares, em algum lugar, é teu advogado em toda parte.", autor: "Chico Xavier", tema: "bondade" },
  { texto: "Cada boa ação que você pratica é uma luz que você acende em torno dos próprios passos.", autor: "Chico Xavier", tema: "bondade" },
  { texto: "A felicidade não é algo pronto. Ela vem das suas próprias ações.", autor: "Dalai Lama", tema: "felicidade" },
  { texto: "Seja gentil sempre que possível. E é sempre possível.", autor: "Dalai Lama", tema: "bondade" },
  { texto: "Não há caminho para a paz; a paz é o caminho.", autor: "Thich Nhat Hanh", tema: "paz" },
  { texto: "Quem olha para fora, sonha; quem olha para dentro, acorda.", autor: "Carl Jung", tema: "autoconhecimento" },
  { texto: "Tudo que nos irrita nos outros pode nos levar a entender a nós mesmos.", autor: "Carl Jung", tema: "autoconhecimento" },
  { texto: "O sofrimento deixa de ser sofrimento no momento em que encontra um significado.", autor: "Viktor Frankl", tema: "sentido" },
  { texto: "Entre o estímulo e a resposta, há um espaço. Nesse espaço está nosso poder de escolha.", autor: "Viktor Frankl", tema: "liberdade" },
  { texto: "O que não provoca minha morte faz com que eu fique mais forte.", autor: "Friedrich Nietzsche", tema: "força" },
  { texto: "Aquele que tem um porquê para viver pode enfrentar todos os comos.", autor: "Friedrich Nietzsche", tema: "propósito" },
  { texto: "Não podemos fazer grandes coisas; apenas pequenas coisas com muito amor.", autor: "Madre Teresa de Calcutá", tema: "amor" },
  { texto: "Ontem foi embora. Amanhã ainda não veio. Temos somente hoje; comecemos.", autor: "Madre Teresa de Calcutá", tema: "presença" },
  { texto: "As palavras gentis podem ser curtas e fáceis de dizer, mas os seus ecos podem ser infinitos.", autor: "Madre Teresa de Calcutá", tema: "bondade" },
  { texto: "O mais poderoso é aquele que tem a si mesmo em seu próprio poder.", autor: "Sêneca", tema: "autodomínio" },
  { texto: "Não é por falta de tempo que sofremos, mas por desperdiçar o que temos.", autor: "Sêneca", tema: "tempo" },
  { texto: "Você tem poder sobre sua mente, não sobre os eventos externos. Perceba isso, e você encontrará a força.", autor: "Marco Aurélio", tema: "mente" },
  { texto: "Somos o que repetidamente fazemos. A excelência, portanto, não é um ato, é um hábito.", autor: "Aristóteles", tema: "hábitos" },
  { texto: "Não importa quão devagar você vá, contanto que não pare.", autor: "Confúcio", tema: "perseverança" },
  { texto: "A jornada de mil milhas começa com um único passo.", autor: "Lao-Tsé", tema: "início" },
  { texto: "Ontem eu era inteligente e queria mudar o mundo. Hoje sou sábio e estou mudando a mim mesmo.", autor: "Rumi", tema: "transformação" },
  { texto: "O trabalho é amor tornado visível.", autor: "Khalil Gibran", tema: "propósito" },
  { texto: "A dor é a quebra da casca que envolve o entendimento.", autor: "Khalil Gibran", tema: "crescimento" },
  { texto: "Nosso coração está inquieto até que descanse em Ti.", autor: "Santo Agostinho", tema: "fé" },
  { texto: "Comece fazendo o que é necessário, depois faça o que é possível, e de repente estará fazendo o impossível.", autor: "São Francisco de Assis", tema: "ação" },
  { texto: "A imaginação é mais importante que o conhecimento.", autor: "Albert Einstein", tema: "criatividade" },
  { texto: "Há duas formas de viver sua vida: uma é acreditar que nada é milagre; a outra é acreditar que tudo é um milagre.", autor: "Albert Einstein", tema: "perspectiva" },
  { texto: "Coragem é ter medo e ir assim mesmo.", autor: "Clarice Lispector", tema: "coragem" },
  { texto: "Valeu a pena? Tudo vale a pena se a alma não é pequena.", autor: "Fernando Pessoa", tema: "vida" },
  { texto: "Feliz aquele que transfere o que sabe e aprende o que ensina.", autor: "Cora Coralina", tema: "sabedoria" },
  { texto: "Quando você quer algo, todo o universo conspira para que você realize seu desejo.", autor: "Paulo Coelho", tema: "fé" },
  { texto: "Você não precisa estar bem para começar, mas precisa começar para ficar bem.", autor: "Padre Fábio de Melo", tema: "ação" },
  { texto: "A esperança não é a certeza de que as coisas vão dar certo. É a certeza de que vale a pena tentar.", autor: "Rubem Alves", tema: "esperança" },
  { texto: "Sonho que se sonha só é só um sonho que se sonha só, mas sonho que se sonha junto é realidade.", autor: "Raul Seixas", tema: "sonhos" },
  { texto: "Não somos seres humanos tendo uma experiência espiritual; somos seres espirituais tendo uma experiência humana.", autor: "Pierre Teilhard de Chardin", tema: "espiritualidade" },
  { texto: "O amor é fogo que arde sem se ver.", autor: "Luís Vaz de Camões", tema: "amor" },
  { texto: "Fora da caridade não há salvação.", autor: "Allan Kardec", tema: "espiritualidade" },
  { texto: "A vida é o que acontece enquanto você está ocupado fazendo outros planos.", autor: "John Lennon", tema: "presença" },
  { texto: "A beleza salvará o mundo.", autor: "Fiódor Dostoiévski", tema: "beleza" },
  { texto: "Seja fiel a ti mesmo, e, assim como a noite sucede o dia, não poderás ser falso com ninguém.", autor: "William Shakespeare", tema: "autenticidade" },
  { texto: "Vá com confiança na direção dos seus sonhos. Viva a vida que imaginou.", autor: "Henry David Thoreau", tema: "sonhos" },
  { texto: "Antes de atingir a iluminação: carregar água, rachar lenha. Depois de atingir a iluminação: carregar água, rachar lenha.", autor: "Provérbio Zen", tema: "presença" },
];

const cartasFuturo = [
  { texto: "O que você plantou com lágrimas, colherá com alegria. O ciclo se completa e a colheita está próxima.", autor: "Sabedoria Oriental" },
  { texto: "Uma porta que parecia fechada para sempre está prestes a se abrir. Prepare-se para o novo.", autor: "Tradição Espiritualista" },
  { texto: "O amor que você busca já existe dentro de você. Quando florescer internamente, irradiará para fora.", autor: "Ensinamento Sufi" },
  { texto: "Uma mudança que você temia se revelará como a maior bênção da sua vida. Confie no processo.", autor: "Sabedoria Ancestral" },
  { texto: "Alguém importante está pensando em você neste exato momento. Energias de afeto te cercam.", autor: "Tradição Espírita" },
  { texto: "O universo conspirou para que este pedido chegasse até aqui. A resposta já está a caminho.", autor: "Lei do Retorno" },
  { texto: "Uma fase de abundância se aproxima. O que foi perdido será restaurado e multiplicado.", autor: "Provérbio Cabalístico" },
  { texto: "Solte o que já cumpriu seu propósito. Há espaço sendo preparado para algo muito maior.", autor: "Ensinamento Taoísta" },
  { texto: "A cura que você pediu está acontecendo em camadas que seus olhos ainda não alcançam. Tenha fé.", autor: "Tradição Xamânica" },
  { texto: "Um encontro inesperado mudará a direção da sua jornada. Esteja aberto ao que o acaso oferece.", autor: "Sabedoria Cigana" },
  { texto: "O que parece silêncio é, na verdade, o universo organizando tudo com precisão a seu favor.", autor: "Ensinamento Zen" },
  { texto: "Sua intuição está correta. Confie no que seu coração sente antes mesmo de entender com a razão.", autor: "Tradição Espiritualista" },
  { texto: "Uma bênção disfarçada de obstáculo está na sua frente. Olhe além da aparência.", autor: "Sabedoria Islâmica" },
  { texto: "O período de espera está chegando ao fim. O que germinou no escuro logo verá a luz do sol.", autor: "Tradição Umbandista" },
  { texto: "Você não está sozinho nesta caminhada. Forças invisíveis te acompanham e iluminam o caminho.", autor: "Chico Xavier" },
  { texto: "Uma reconciliação ou reencontro se aproxima. O que o tempo afastou, o amor reunirá.", autor: "Tradição Kardecista" },
  { texto: "O sacrifício que você fez em silêncio será recompensado de uma forma que nunca imaginou.", autor: "Ensinamento Sufi" },
  { texto: "Novas oportunidades se manifestarão rapidamente. Sua mente aberta é o único requisito necessário.", autor: "Lei da Atração" },
  { texto: "Um sonho que você guardou no fundo do coração está prestes a receber o sopro da realização.", autor: "Sabedoria Ancestral" },
  { texto: "O que você precisa não virá da direção que você espera. Abra os olhos para o inesperado.", autor: "Tradição Gnóstica" },
  { texto: "Uma fase de paz interior está começando. Após a tempestade, o horizonte se revela mais claro.", autor: "Ensinamento Budista" },
  { texto: "Seu coração pede coragem. Dê o primeiro passo; o caminho se formará sob seus pés.", autor: "Sabedoria Celta" },
  { texto: "O que você enviou ao mundo em forma de amor retorna agora multiplicado e em boa hora.", autor: "Lei do Karma" },
  { texto: "Uma proteção invisível vela por você. Neste momento, você está mais seguro do que imagina.", autor: "Tradição Espírita" },
  { texto: "A resposta que tanto procura não está em outro lugar; está dentro de você esperando ser ouvida.", autor: "Oráculo Interior" },
  { texto: "Uma notícia boa e inesperada chegará quando você menos esperar. Mantenha o coração leve.", autor: "Tradição Umbandista" },
  { texto: "O ciclo que se encerra agora carregou suas lições. O próximo carregará suas recompensas.", autor: "Sabedoria Hermética" },
  { texto: "Tudo que foi tirado de você injustamente será devolvido pelo universo com juros de gratidão.", autor: "Lei do Retorno" },
  { texto: "Uma escolha importante se apresentará em breve. Deixe o coração falar antes da mente calcular.", autor: "Ensinamento Taoísta" },
  { texto: "Há uma luz no fim desta travessia. Você está mais perto do que seus olhos conseguem ver.", autor: "Tradição Espiritualista" },
  { texto: "O que você pede com fé genuína já foi concedido nos planos invisíveis. Aguarde a materialização.", autor: "Chico Xavier" },
  { texto: "Uma força renovada está chegando. O cansaço que sente é o sinal de que uma fase se encerra.", autor: "Sabedoria Xamânica" },
  { texto: "Aquilo que você ama de verdade não te abandonará. O que precisa ficar, ficará.", autor: "Ensinamento Sufi" },
  { texto: "Um milagre discreto está tecendo seus fios em silêncio. Você perceberá quando ele se revelar completo.", autor: "Tradição Católica" },
  { texto: "O perdão que você conceder a si mesmo abrirá espaço para que o universo aja em seu favor.", autor: "Tradição Kardecista" },
  { texto: "O que parece demora é, na verdade, preparação. O universo te prepara para o peso da bênção.", autor: "Ensinamento Budista" },
  { texto: "Suas mãos têm o poder de construir exatamente o que seu coração sonhou. Use-as com intenção.", autor: "Tradição Xamânica" },
  { texto: "Uma fase dourada está sendo construída tijolo a tijolo com cada escolha consciente que você faz.", autor: "Hermetismo" },
  { texto: "O amor verdadeiro não se perde. Ele se transforma, amadurece e sempre encontra o caminho de volta.", autor: "Tradição Espírita" },
  { texto: "Liberte-se do passado e você descobrirá que o presente está cheio de possibilidades ainda intocadas.", autor: "Ensinamento Zen" },
  { texto: "Uma conexão significativa está prestes a entrar na sua vida, trazendo propósito e alegria.", autor: "Sabedoria Cigana" },
  { texto: "O universo ouviu. O que você carregou com tanto peso logo será aliviado pela graça divina.", autor: "Tradição Umbandista" },
  { texto: "Você tem em si mesmo toda a força que precisa. Só falta acreditar naquilo que você já é.", autor: "Oráculo Interior" },
  { texto: "Uma surpresa agradável está a caminho. Prepare o coração para receber sem resistência.", autor: "Lei da Atração" },
  { texto: "O que você semeia com amor, mesmo em terra seca, floresce quando a chuva do tempo chega.", autor: "Sabedoria Ancestral" },
  { texto: "Sua jornada está sendo vista e honrada por forças maiores. Você não caminha sem testemunhas.", autor: "Tradição Espiritualista" },
  { texto: "Uma cura profunda está em curso. O que parecia permanente é apenas uma passagem.", autor: "Tradição Xamânica" },
  { texto: "A abundância que você merece já foi destinada a você. Abra as mãos e o coração para recebê-la.", autor: "Ensinamento Cabalístico" },
  { texto: "Confie na tua voz interior mais do que em qualquer oráculo. Ela conhece o teu caminho.", autor: "Sócrates" },
  { texto: "O que hoje parece impossível, amanhã será a história que você contará com orgulho.", autor: "Sabedoria Popular" },
  { texto: "Um recomeço genuíno está disponível para você agora. O passado não define o que ainda será escrito.", autor: "Tradição Espiritualista" },
];

const temasCores = {
  amor:"#e8a598",fé:"#a8b8d8",vida:"#9dc49a",força:"#d4956a",ação:"#c4a46a",
  saúde:"#a8c4b8",responsabilidade:"#b4a8c4",liberdade:"#8bbccc",esperança:"#f0c070",
  mente:"#8cc4b8",paz:"#a0c4a0",karma:"#c4b070",gratidão:"#d4c070",bondade:"#e0a8a0",
  generosidade:"#c8a0c0",felicidade:"#f0c880",paciência:"#a8c8b0",presença:"#90c0b8",
  autoconhecimento:"#b0a8d0",sentido:"#c0b080",propósito:"#8cb8a8",identidade:"#c8a8a0",
  autodomínio:"#9090b8",tempo:"#b0b080",equilíbrio:"#a8b8a0",hábitos:"#c0a870",
  sabedoria:"#d0b860",início:"#90c898",transformação:"#b0c0a0",coragem:"#e09878",
  crescimento:"#98b898",criatividade:"#c8a8d0",perspectiva:"#88c0d0",espiritualidade:"#b8a0c8",
  sonhos:"#a8b8d8",beleza:"#e0a8b8",autenticidade:"#a0b8c0",maravilha:"#c8c0a0",
  verdade:"#a0c4c0",recomeço:"#98c8a0",perseverança:"#c0b890",
};

const SK="pqs-v3", HK="pqs-hb-v3", HCK="pqs-hc-v3";

export default function App() {
  const [modulo, setModulo] = useState("entrada");
  // Baú
  const [telaB, setTelaB] = useState("home");
  const [listaB, setListaB] = useState(frasesFilosoficas);
  const [fraseSorteada, setFraseSorteada] = useState(null);
  const [idxB, setIdxB] = useState(null);
  const [aberto, setAberto] = useState(false);
  const [abrindo, setAbrindo] = useState(false);
  const [mostrarCarta, setMostrarCarta] = useState(false);
  const [histB, setHistB] = useState([]);
  const [editando, setEditando] = useState(null);
  const [textoEdit, setTextoEdit] = useState("");
  const [autorEdit, setAutorEdit] = useState("");
  const [novoTexto, setNovoTexto] = useState("");
  const [novoAutor, setNovoAutor] = useState("");
  const [particulasB, setParticulasB] = useState([]);
  // Cartas
  const [telaC, setTelaC] = useState("sorteio");
  const [cartaEstado, setCartaEstado] = useState("idle");
  const [cartaSorteada, setCartaSorteada] = useState(null);
  const [histC, setHistC] = useState([]);
  const [cartasAnim, setCartasAnim] = useState(Array.from({length:7},(_,i)=>({id:i,x:0,y:0,rot:(i-3)*4,scale:1,z:i})));
  const intervalRef = useRef(null);

  useEffect(() => {
    try {
      const l=localStorage.getItem(SK); if(l) setListaB(JSON.parse(l));
      const h=localStorage.getItem(HK); if(h) setHistB(JSON.parse(h));
      const hc=localStorage.getItem(HCK); if(hc) setHistC(JSON.parse(hc));
    } catch(e){}
  },[]);

  const salvarLB = n => { setListaB(n); try{localStorage.setItem(SK,JSON.stringify(n))}catch(e){} };
  const salvarHB = h => { setHistB(h); try{localStorage.setItem(HK,JSON.stringify(h))}catch(e){} };
  const salvarHC = h => { setHistC(h); try{localStorage.setItem(HCK,JSON.stringify(h))}catch(e){} };

  // Baú helpers
  const gerarPart = () => {
    const p=Array.from({length:20},(_,i)=>({id:i,x:30+Math.random()*40,delay:Math.random()*.6,size:Math.random()*10+5,dur:Math.random()+1.2,color:["#f5c842","#f0a050","#e8d080","#fff","#a8d8a0","#98c8d0","#e8a080"][Math.floor(Math.random()*7)]}));
    setParticulasB(p); setTimeout(()=>setParticulasB([]),2500);
  };
  const sortearBau = () => {
    if(abrindo) return;
    setAbrindo(true); setMostrarCarta(false); setAberto(false);
    setTimeout(()=>{
      setAberto(true); gerarPart();
      setTimeout(()=>{
        const idx=Math.floor(Math.random()*listaB.length);
        setIdxB(idx); setFraseSorteada(listaB[idx]);
        const nh=[{...listaB[idx],numero:idx+1,data:new Date().toLocaleDateString("pt-BR")},...histB].slice(0,40);
        salvarHB(nh); setMostrarCarta(true); setTelaB("carta"); setAbrindo(false);
      },800);
    },350);
  };
  const fecharBau = () => { setMostrarCarta(false); setTelaB("home"); setTimeout(()=>setAberto(false),400); };
  const salvarEd = () => {
    if(editando===null) return;
    const n=[...listaB]; n[editando]={...n[editando],texto:textoEdit.trim()||n[editando].texto,autor:autorEdit.trim()||n[editando].autor};
    salvarLB(n); setEditando(null);
  };
  const removerB = i => salvarLB(listaB.filter((_,idx)=>idx!==i));
  const adicionarB = () => {
    if(!novoTexto.trim()) return;
    salvarLB([...listaB,{texto:novoTexto.trim(),autor:novoAutor.trim()||"Desconhecido",tema:"vida"}]);
    setNovoTexto(""); setNovoAutor("");
  };

  // Cartas helpers
  const iniciarEmbaralho = () => {
    if(cartaEstado==="revelada"){setCartaEstado("idle");setCartaSorteada(null);return;}
    setCartaEstado("embaralhando"); setCartaSorteada(null);
    intervalRef.current = setInterval(()=>{
      setCartasAnim(Array.from({length:7},(_,i)=>({id:i,x:(Math.random()-.5)*70,y:(Math.random()-.5)*35,rot:(Math.random()-.5)*40,scale:.9+Math.random()*.15,z:Math.floor(Math.random()*7)})));
    },110);
  };
  const pararEmbaralho = () => {
    clearInterval(intervalRef.current);
    setCartaEstado("revelando");
    setCartasAnim(Array.from({length:7},(_,i)=>({id:i,x:0,y:0,rot:(i-3)*4,scale:1,z:i})));
    setTimeout(()=>{
      const idx=Math.floor(Math.random()*cartasFuturo.length);
      const c=cartasFuturo[idx];
      setCartaSorteada(c); setCartaEstado("revelada");
      const nh=[{...c,data:new Date().toLocaleDateString("pt-BR")},...histC].slice(0,40);
      salvarHC(nh);
    },700);
  };
  useEffect(()=>()=>clearInterval(intervalRef.current),[]);

  const tc = t => temasCores[t]||"#b0b8c0";
  const isBau = modulo==="bau";
  const isCartas = modulo==="cartas";

  const bgMain = isCartas
    ? "linear-gradient(160deg,#0d0818 0%,#1a0f2e 40%,#0f1a2e 70%,#0d1520 100%)"
    : "linear-gradient(160deg,#fef9f0 0%,#fdf0e0 30%,#fce8d0 60%,#f8f0e8 100%)";

  return (
    <div style={{minHeight:"100vh",fontFamily:"'Georgia','Palatino Linotype',serif",background:bgMain,position:"relative",overflow:"hidden",transition:"background 1s"}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes entrar{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
        @keyframes cardIn{from{opacity:0;transform:scale(.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes flutuar{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulsar{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes subirP{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-200px) scale(.1);opacity:0}}
        @keyframes brilhoBau{0%,100%{box-shadow:0 4px 30px rgba(240,160,60,.2)}50%{box-shadow:0 4px 60px rgba(240,160,60,.5)}}
        @keyframes estrela{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes revelarCarta{0%{opacity:0;transform:rotateY(-90deg) scale(.8)}70%{transform:rotateY(6deg) scale(1.02)}100%{opacity:1;transform:rotateY(0) scale(1)}}
        @keyframes brilhoMistico{0%,100%{box-shadow:0 0 30px rgba(160,100,255,.25),0 0 60px rgba(100,150,255,.12)}50%{box-shadow:0 0 60px rgba(160,100,255,.55),0 0 100px rgba(100,150,255,.25)}}
        @keyframes pulsarBtn{0%,100%{box-shadow:0 4px 20px rgba(160,100,255,.4)}50%{box-shadow:0 4px 40px rgba(160,100,255,.8)}}
        @keyframes pulsarBtnStop{0%,100%{box-shadow:0 4px 20px rgba(200,50,130,.5)}50%{box-shadow:0 4px 40px rgba(200,50,130,.9)}}
        .btn-g:hover{filter:brightness(1.1);transform:scale(1.04)} .btn-g:active{transform:scale(.97)}
        .btn-m:hover{filter:brightness(1.15);transform:scale(1.04)} .btn-m:active{transform:scale(.97)}
        .tab:hover{opacity:.8} .linha:hover{background:rgba(200,160,80,.07)!important}
        *{box-sizing:border-box}
      `}</style>

      {/* BG DECO */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {isCartas && Array.from({length:55},(_,i)=>(
          <div key={i} style={{position:"absolute",borderRadius:"50%",background:"#fff",width:Math.random()*2.5+.5,height:Math.random()*2.5+.5,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,opacity:Math.random()*.7+.1,animation:`estrela ${2+Math.random()*4}s ease-in-out infinite`,animationDelay:`${Math.random()*4}s`}}/>
        ))}
        {isCartas && <>
          <div style={{position:"absolute",top:"5%",left:"10%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(#6a30c0,transparent 70%)",opacity:.1,filter:"blur(50px)"}}/>
          <div style={{position:"absolute",bottom:"15%",right:"8%",width:250,height:250,borderRadius:"50%",background:"radial-gradient(#3050c0,transparent 70%)",opacity:.12,filter:"blur(50px)"}}/>
        </>}
        {!isCartas && [{t:"5%",l:"8%",s:200,op:.06,c:"#f0c060"},{t:"60%",l:"85%",s:280,op:.05,c:"#a8d090"},{t:"80%",l:"5%",s:180,op:.06,c:"#90c0d8"},{t:"20%",l:"75%",s:150,op:.07,c:"#e89878"}].map((c,i)=>(
          <div key={i} style={{position:"absolute",top:c.t,left:c.l,width:c.s,height:c.s,borderRadius:"50%",background:c.c,opacity:c.op,filter:"blur(40px)"}}/>
        ))}
      </div>

      {/* ══ TELA ENTRADA ══ */}
      {modulo==="entrada" && (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"30px 16px",zIndex:10,position:"relative",animation:"entrar .6s ease"}}>
          <div style={{fontSize:"10px",letterSpacing:"6px",color:"#b09060",textTransform:"uppercase",fontFamily:"'Lato',sans-serif",fontWeight:300,marginBottom:"10px",textAlign:"center"}}>✦ coleção de sabedoria ✦</div>
          <h1 style={{margin:"0 0 8px",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(26px,7vw,44px)",fontWeight:300,color:"#5a3a20",letterSpacing:"1px",textAlign:"center",textShadow:"0 2px 12px rgba(180,120,40,.2)"}}>
            Palavras que Fazem Sentido
          </h1>
          <p style={{color:"#b09060",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(14px,3vw,17px)",textAlign:"center",marginBottom:"50px",maxWidth:"380px"}}>
            Escolha sua experiência para este momento
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:"18px",width:"min(460px,92vw)"}}>
            <button onClick={()=>setModulo("bau")} className="btn-g" style={{background:"linear-gradient(135deg,#fffbf0,#fff3d0)",border:"2px solid rgba(200,150,60,.35)",borderRadius:"20px",padding:"26px 26px",cursor:"pointer",display:"flex",alignItems:"center",gap:"20px",boxShadow:"0 8px 30px rgba(180,120,40,.12)",transition:"all .3s",textAlign:"left"}}>
              <div style={{fontSize:"50px",flexShrink:0}}>🪙</div>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,4vw,24px)",color:"#5a3a18",marginBottom:"6px"}}>Baú Filosófico</div>
                <div style={{fontFamily:"'Lato',sans-serif",fontSize:"12px",color:"#a07840",lineHeight:"1.6",fontWeight:300}}>Filósofos, místicos, poetas e pensadores. Uma palavra de sabedoria para o seu dia.</div>
              </div>
            </button>
            <button onClick={()=>setModulo("cartas")} className="btn-m" style={{background:"linear-gradient(135deg,#1a0f2e,#2a1650)",border:"2px solid rgba(160,100,255,.28)",borderRadius:"20px",padding:"26px 26px",cursor:"pointer",display:"flex",alignItems:"center",gap:"20px",boxShadow:"0 8px 30px rgba(120,60,200,.22)",transition:"all .3s",textAlign:"left"}}>
              <div style={{fontSize:"50px",flexShrink:0}}>🔮</div>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,4vw,24px)",color:"#d0b0ff",marginBottom:"6px"}}>Cartas do Futuro</div>
                <div style={{fontFamily:"'Lato',sans-serif",fontSize:"12px",color:"#806090",lineHeight:"1.6",fontWeight:300}}>Pense no seu pedido, embaralhe as cartas e receba a resposta do universo.</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ══ MÓDULO BAÚ ══ */}
      {isBau && (
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",animation:"entrar .5s ease"}}>
          {particulasB.map(p=>(
            <div key={p.id} style={{position:"fixed",left:`${p.x}%`,bottom:"38%",width:p.size,height:p.size,background:p.color,borderRadius:"50%",pointerEvents:"none",zIndex:50,animation:`subirP ${p.dur}s ease-out ${p.delay}s forwards`,opacity:0}}/>
          ))}
          <header style={{width:"100%",zIndex:10,padding:"18px 20px 12px",textAlign:"center",background:"rgba(255,250,240,.92)",backdropFilter:"blur(10px)",borderBottom:"1px solid rgba(200,160,80,.2)",boxShadow:"0 2px 20px rgba(200,140,60,.08)",position:"relative"}}>
            <button onClick={()=>{setModulo("entrada");setTelaB("home");setAberto(false);setMostrarCarta(false);}} style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"1px solid rgba(200,150,60,.3)",color:"#a07840",borderRadius:"20px",padding:"5px 14px",cursor:"pointer",fontSize:"12px",fontFamily:"'Lato',sans-serif"}}>← Voltar</button>
            <div style={{fontSize:"9px",letterSpacing:"5px",color:"#b09060",textTransform:"uppercase",fontFamily:"'Lato',sans-serif",fontWeight:300,marginBottom:"3px"}}>✦ baú filosófico ✦</div>
            <h1 style={{margin:"0 0 3px",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,5vw,30px)",fontWeight:300,color:"#5a3a20",letterSpacing:"1px"}}>Palavras que Fazem Sentido</h1>
            <div style={{fontFamily:"'Lato',sans-serif",fontSize:"10px",color:"#b8966a"}}>{listaB.length} frases</div>
            <nav style={{display:"flex",justifyContent:"center",gap:"7px",marginTop:"11px",flexWrap:"wrap"}}>
              {[{id:"home",l:"🌸 Início"},{id:"editar",l:"✏️ Editar"},{id:"historico",l:"📜 Histórico"}].map(t=>(
                <button key={t.id} className="tab" onClick={()=>setTelaB(t.id)} style={{background:telaB===t.id?"rgba(200,150,70,.18)":"transparent",border:`1px solid ${telaB===t.id?"rgba(200,150,70,.6)":"rgba(200,150,70,.25)"}`,color:telaB===t.id?"#7a4a18":"#a07840",padding:"5px 16px",borderRadius:"30px",cursor:"pointer",fontSize:"11px",fontFamily:"'Lato',sans-serif",transition:"all .25s"}}>{t.l}</button>
              ))}
            </nav>
          </header>

          {(telaB==="home"||telaB==="carta") && (
            <main style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 16px 36px",zIndex:10}}>
              {telaB==="home" && <p style={{color:"#c09060",fontSize:"14px",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",marginBottom:"30px",textAlign:"center"}}>Abra o cofre e receba uma palavra para o seu dia</p>}
              <div onClick={telaB==="home"?sortearBau:undefined} style={{cursor:telaB==="home"?"pointer":"default",position:"relative",width:"200px",height:"170px",animation:telaB==="home"&&!abrindo?"flutuar 3.5s ease-in-out infinite":"none",marginBottom:telaB==="carta"?"22px":"0"}}>
                <div style={{position:"absolute",inset:"-20px",borderRadius:"50%",background:aberto?"radial-gradient(ellipse,rgba(255,210,80,.5) 0%,transparent 70%)":"radial-gradient(ellipse,rgba(255,210,80,.12) 0%,transparent 70%)",transition:"all .8s",pointerEvents:"none",zIndex:0}}/>
                <svg width="200" height="170" viewBox="0 0 200 170" style={{position:"relative",zIndex:1}}>
                  <g style={{transformOrigin:"100px 80px",transform:aberto?"rotateX(-50deg)":"rotateX(0deg)",transition:"transform .7s cubic-bezier(.34,1.56,.64,1)"}}>
                    <rect x="8" y="30" width="184" height="55" rx="14" fill="url(#tg)" stroke="#d4a030" strokeWidth="2"/>
                    <rect x="20" y="38" width="160" height="40" rx="8" fill="none" stroke="rgba(255,220,100,.5)" strokeWidth="1.5"/>
                    <path d="M8 44 Q100 24 192 44" stroke="rgba(255,220,100,.4)" strokeWidth="1.5" fill="none"/>
                    <circle cx="100" cy="55" r="10" fill="#7a4800" stroke="#d4a030" strokeWidth="2"/>
                    <circle cx="100" cy="55" r="5" fill="#f0c040"/>
                  </g>
                  <rect x="8" y="80" width="184" height="82" rx="10" fill="url(#bg2)" stroke="#d4a030" strokeWidth="2"/>
                  <rect x="20" y="90" width="160" height="62" rx="6" fill="none" stroke="rgba(255,220,100,.3)" strokeWidth="1"/>
                  <rect x="80" y="76" width="40" height="18" rx="6" fill="#c47820" stroke="#d4a030" strokeWidth="1.5"/>
                  <circle cx="100" cy="85" r="4.5" fill="#7a4800" stroke="#d4a030" strokeWidth="1.5"/>
                  <rect x="18" y="152" width="22" height="12" rx="4" fill="#9a6020" stroke="#d4a030" strokeWidth="1"/>
                  <rect x="160" y="152" width="22" height="12" rx="4" fill="#9a6020" stroke="#d4a030" strokeWidth="1"/>
                  <ellipse cx="26" cy="80" rx="6" ry="5" fill="#d4a030"/><ellipse cx="174" cy="80" rx="6" ry="5" fill="#d4a030"/>
                  {aberto&&<ellipse cx="100" cy="82" rx="50" ry="20" fill="url(#gg)" opacity=".7"/>}
                  <defs>
                    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="60"><stop offset="0%" stopColor="#e8b840"/><stop offset="50%" stopColor="#c47820"/><stop offset="100%" stopColor="#a06010"/></linearGradient>
                    <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="100"><stop offset="0%" stopColor="#d4a030"/><stop offset="50%" stopColor="#b07820"/><stop offset="100%" stopColor="#8a5810"/></linearGradient>
                    <radialGradient id="gg" cx="50%" cy="50%"><stop offset="0%" stopColor="#fff7c0" stopOpacity="1"/><stop offset="100%" stopColor="#fff7c0" stopOpacity="0"/></radialGradient>
                  </defs>
                </svg>
                {telaB==="home"&&<div style={{position:"absolute",bottom:"-32px",left:"50%",transform:"translateX(-50%)",color:"#c09860",fontSize:"10px",whiteSpace:"nowrap",fontFamily:"'Lato',sans-serif",letterSpacing:"2px",textTransform:"uppercase"}}>toque para abrir</div>}
              </div>
              {telaB==="carta"&&mostrarCarta&&fraseSorteada&&(
                <div style={{marginTop:"48px",width:"min(500px,94vw)",animation:"cardIn .5s cubic-bezier(.34,1.56,.64,1)"}}>
                  <div style={{background:"rgba(255,254,248,.97)",borderRadius:"20px",padding:"34px 30px 26px",boxShadow:"0 10px 50px rgba(180,120,40,.18)",border:"1px solid rgba(200,160,60,.3)",position:"relative",overflow:"hidden",animation:"brilhoBau 3s ease-in-out infinite"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:"4px",background:"linear-gradient(90deg,transparent,#d4a030,#f0c860,#d4a030,transparent)"}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
                      <span style={{background:tc(fraseSorteada.tema)+"33",border:`1px solid ${tc(fraseSorteada.tema)}66`,color:"#7a5030",padding:"3px 12px",borderRadius:"20px",fontSize:"10px",fontFamily:"'Lato',sans-serif",letterSpacing:"1px",textTransform:"uppercase"}}>{fraseSorteada.tema||"reflexão"}</span>
                      <span style={{color:"rgba(180,140,80,.5)",fontSize:"11px",fontFamily:"'Lato',sans-serif"}}>#{idxB+1}</span>
                    </div>
                    <div style={{fontSize:"56px",lineHeight:"0.6",color:"rgba(200,160,60,.2)",marginBottom:"10px",fontFamily:"Georgia,serif"}}>"</div>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,4vw,21px)",lineHeight:"1.75",color:"#3a2010",margin:"0 0 22px",fontStyle:"italic",fontWeight:300,textAlign:"center"}}>{fraseSorteada.texto}</p>
                    <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}><div style={{flex:1,height:"1px",background:"linear-gradient(90deg,transparent,rgba(200,160,60,.4))"}}/><span style={{color:"rgba(200,160,60,.6)",fontSize:"12px"}}>✦</span><div style={{flex:1,height:"1px",background:"linear-gradient(90deg,rgba(200,160,60,.4),transparent)"}}/></div>
                    <p style={{textAlign:"center",margin:0,fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",color:"#9a6840",letterSpacing:"1px"}}>— {fraseSorteada.autor}</p>
                    <div style={{position:"absolute",bottom:"8px",left:"12px",color:"rgba(200,160,60,.2)",fontSize:"16px"}}>❧</div>
                    <div style={{position:"absolute",bottom:"8px",right:"12px",color:"rgba(200,160,60,.2)",fontSize:"16px",transform:"scaleX(-1)"}}>❧</div>
                  </div>
                  <div style={{display:"flex",gap:"10px",marginTop:"16px",justifyContent:"center"}}>
                    <button onClick={fecharBau} className="btn-g" style={{background:"rgba(255,250,240,.9)",border:"1px solid rgba(200,150,60,.4)",color:"#9a6840",padding:"10px 20px",borderRadius:"30px",cursor:"pointer",fontSize:"13px",fontFamily:"'Lato',sans-serif",transition:"all .2s"}}>← Fechar</button>
                    <button onClick={sortearBau} className="btn-g" style={{background:"linear-gradient(135deg,#d4a030,#f0c050)",border:"none",color:"#4a2a00",padding:"10px 26px",borderRadius:"30px",cursor:"pointer",fontSize:"13px",fontWeight:"bold",fontFamily:"'Lato',sans-serif",boxShadow:"0 4px 15px rgba(200,140,30,.35)",transition:"all .2s"}}>✨ Nova palavra</button>
                  </div>
                </div>
              )}
              {telaB==="home"&&(
                <button onClick={sortearBau} className="btn-g" style={{marginTop:"62px",background:"linear-gradient(135deg,#d4a030 0%,#f0c050 50%,#d4a030 100%)",border:"none",color:"#4a2a00",padding:"14px 42px",borderRadius:"40px",cursor:abrindo?"not-allowed":"pointer",fontSize:"15px",fontFamily:"'Lato',sans-serif",letterSpacing:"1px",transition:"all .25s",boxShadow:"0 6px 25px rgba(200,140,30,.35)",animation:"pulsar 3s ease-in-out infinite",opacity:abrindo?.7:1}}>
                  {abrindo?"Abrindo...":"✨ Revelar uma palavra"}
                </button>
              )}
            </main>
          )}

          {telaB==="editar" && (
            <div style={{width:"min(680px,98vw)",padding:"22px 12px",zIndex:10,margin:"0 auto",animation:"fadeUp .4s ease"}}>
              <h2 style={{textAlign:"center",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,color:"#7a4a18",fontSize:"21px",marginBottom:"18px",letterSpacing:"2px"}}>Gerenciar Frases</h2>
              <div style={{background:"rgba(255,250,240,.9)",borderRadius:"14px",border:"1px solid rgba(200,150,60,.25)",padding:"16px",marginBottom:"18px",boxShadow:"0 2px 15px rgba(180,120,40,.08)"}}>
                <p style={{color:"#c09060",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",marginTop:0,marginBottom:"10px",fontFamily:"'Lato',sans-serif"}}>+ Adicionar nova frase</p>
                <textarea value={novoTexto} onChange={e=>setNovoTexto(e.target.value)} placeholder="Texto da frase..." style={{width:"100%",background:"rgba(250,245,235,.8)",border:"1px solid rgba(200,150,60,.3)",borderRadius:"8px",color:"#5a3a18",padding:"10px 14px",fontFamily:"'Cormorant Garamond',serif",fontSize:"15px",resize:"vertical",minHeight:"68px",outline:"none",fontStyle:"italic"}}/>
                <input value={novoAutor} onChange={e=>setNovoAutor(e.target.value)} placeholder="Autor..." style={{width:"100%",marginTop:"7px",background:"rgba(250,245,235,.8)",border:"1px solid rgba(200,150,60,.3)",borderRadius:"8px",color:"#9a6840",padding:"8px 14px",fontFamily:"'Lato',sans-serif",fontSize:"13px",outline:"none"}}/>
                <button onClick={adicionarB} style={{marginTop:"9px",background:"linear-gradient(135deg,#d4a030,#f0c050)",border:"none",color:"#4a2a00",padding:"7px 22px",borderRadius:"20px",cursor:"pointer",fontSize:"12px",fontFamily:"'Lato',sans-serif"}}>Adicionar</button>
              </div>
              <div style={{maxHeight:"50vh",overflowY:"auto",paddingRight:"4px"}}>
                {listaB.map((f,i)=>(
                  <div key={i} className="linha" style={{background:"rgba(255,250,242,.85)",borderRadius:"10px",border:"1px solid rgba(200,150,60,.18)",padding:"11px 13px",marginBottom:"7px",transition:"background .2s"}}>
                    {editando===i?(
                      <div>
                        <textarea value={textoEdit} onChange={e=>setTextoEdit(e.target.value)} style={{width:"100%",background:"#fffbf0",border:"1px solid #d4a030",borderRadius:"6px",color:"#5a3a18",padding:"8px",fontFamily:"'Cormorant Garamond',serif",fontSize:"14px",resize:"vertical",minHeight:"58px",outline:"none",fontStyle:"italic"}}/>
                        <input value={autorEdit} onChange={e=>setAutorEdit(e.target.value)} style={{width:"100%",marginTop:"6px",background:"#fffbf0",border:"1px solid #d4a030",borderRadius:"6px",color:"#9a6840",padding:"6px 10px",fontFamily:"'Lato',sans-serif",fontSize:"12px",outline:"none"}}/>
                        <div style={{display:"flex",gap:"7px",marginTop:"7px"}}>
                          <button onClick={salvarEd} style={{background:"linear-gradient(135deg,#d4a030,#f0c050)",border:"none",color:"#4a2a00",padding:"5px 15px",borderRadius:"14px",cursor:"pointer",fontSize:"11px",fontFamily:"'Lato',sans-serif"}}>✓ Salvar</button>
                          <button onClick={()=>setEditando(null)} style={{background:"transparent",border:"1px solid rgba(200,150,60,.4)",color:"#c09060",padding:"5px 13px",borderRadius:"14px",cursor:"pointer",fontSize:"11px"}}>✗ Cancelar</button>
                        </div>
                      </div>
                    ):(
                      <div style={{display:"flex",gap:"9px",alignItems:"flex-start"}}>
                        <span style={{color:"rgba(200,150,60,.45)",fontSize:"10px",minWidth:"24px",marginTop:"3px",fontFamily:"'Lato',sans-serif"}}>#{i+1}</span>
                        <div style={{flex:1}}>
                          <p style={{color:"#5a3a18",fontSize:"13px",margin:"0 0 3px",lineHeight:"1.55",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>{f.texto}</p>
                          <span style={{color:"#b08050",fontSize:"11px",fontFamily:"'Lato',sans-serif"}}>— {f.autor}</span>
                        </div>
                        <div style={{display:"flex",gap:"5px",flexShrink:0}}>
                          <button onClick={()=>{setEditando(i);setTextoEdit(f.texto);setAutorEdit(f.autor);}} style={{background:"transparent",border:"1px solid rgba(200,150,60,.35)",color:"#c09060",padding:"3px 9px",borderRadius:"10px",cursor:"pointer",fontSize:"11px"}}>✏️</button>
                          <button onClick={()=>removerB(i)} style={{background:"transparent",border:"1px solid rgba(200,100,80,.3)",color:"rgba(200,100,80,.7)",padding:"3px 9px",borderRadius:"10px",cursor:"pointer",fontSize:"11px"}}>🗑️</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {telaB==="historico" && (
            <div style={{width:"min(560px,98vw)",padding:"22px 12px",zIndex:10,margin:"0 auto",animation:"fadeUp .4s ease"}}>
              <h2 style={{textAlign:"center",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,color:"#7a4a18",fontSize:"21px",marginBottom:"18px",letterSpacing:"2px"}}>Palavras Recebidas</h2>
              {histB.length===0?(<div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:"38px",marginBottom:"10px"}}>🌸</div><p style={{color:"#c09060",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontSize:"15px"}}>Nenhuma palavra revelada ainda.</p></div>):(
                <div style={{maxHeight:"65vh",overflowY:"auto"}}>
                  {histB.map((h,i)=>(
                    <div key={i} style={{background:"rgba(255,250,242,.9)",borderRadius:"12px",border:"1px solid rgba(200,150,60,.2)",padding:"14px 16px",marginBottom:"9px",boxShadow:"0 2px 10px rgba(180,120,40,.06)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"7px"}}>
                        <span style={{color:"rgba(200,150,60,.6)",fontSize:"10px",fontFamily:"'Lato',sans-serif"}}>#{h.numero}</span>
                        <span style={{color:"rgba(180,130,60,.5)",fontSize:"10px",fontFamily:"'Lato',sans-serif"}}>{h.data}</span>
                      </div>
                      <p style={{color:"#5a3a18",fontSize:"13px",margin:"0 0 5px",lineHeight:"1.6",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>"{h.texto}"</p>
                      <span style={{color:"#b08050",fontSize:"11px",fontFamily:"'Lato',sans-serif"}}>— {h.autor}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══ MÓDULO CARTAS ══ */}
      {isCartas && (
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",animation:"entrar .5s ease"}}>
          <header style={{width:"100%",zIndex:10,padding:"18px 20px 12px",textAlign:"center",background:"rgba(15,8,28,.88)",backdropFilter:"blur(10px)",borderBottom:"1px solid rgba(160,100,255,.14)",boxShadow:"0 2px 30px rgba(100,50,200,.18)",position:"relative"}}>
            <button onClick={()=>{setModulo("entrada");setCartaEstado("idle");setCartaSorteada(null);clearInterval(intervalRef.current);}} style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"1px solid rgba(160,100,255,.3)",color:"#9070c0",borderRadius:"20px",padding:"5px 14px",cursor:"pointer",fontSize:"12px",fontFamily:"'Lato',sans-serif"}}>← Voltar</button>
            <div style={{fontSize:"9px",letterSpacing:"5px",color:"#6040a0",textTransform:"uppercase",fontFamily:"'Lato',sans-serif",fontWeight:300,marginBottom:"3px"}}>✦ cartas do futuro ✦</div>
            <h1 style={{margin:"0 0 3px",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,5vw,30px)",fontWeight:300,color:"#d0b0ff",letterSpacing:"1px"}}>Palavras que Fazem Sentido</h1>
            <div style={{fontFamily:"'Lato',sans-serif",fontSize:"10px",color:"#6050a0"}}>{cartasFuturo.length} mensagens</div>
            <nav style={{display:"flex",justifyContent:"center",gap:"7px",marginTop:"11px"}}>
              {[{id:"sorteio",l:"🔮 Consulta"},{id:"historico",l:"📜 Histórico"}].map(t=>(
                <button key={t.id} className="tab" onClick={()=>setTelaC(t.id)} style={{background:telaC===t.id?"rgba(160,100,255,.2)":"transparent",border:`1px solid ${telaC===t.id?"rgba(160,100,255,.55)":"rgba(160,100,255,.18)"}`,color:telaC===t.id?"#c090ff":"#706090",padding:"5px 16px",borderRadius:"30px",cursor:"pointer",fontSize:"11px",fontFamily:"'Lato',sans-serif",transition:"all .25s"}}>{t.l}</button>
              ))}
            </nav>
          </header>

          {telaC==="sorteio" && (
            <main style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 16px 36px",zIndex:10}}>

              {/* Instrução */}
              {cartaEstado==="idle" && (
                <div style={{textAlign:"center",marginBottom:"36px",animation:"fadeUp .5s ease"}}>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(15px,3.5vw,19px)",color:"rgba(200,170,255,.7)",fontStyle:"italic",margin:"0 0 8px",maxWidth:"380px",lineHeight:"1.7"}}>
                    Feche os olhos, respire fundo<br/>e pense no seu pedido
                  </p>
                  <p style={{fontFamily:"'Lato',sans-serif",fontSize:"11px",color:"rgba(140,110,200,.5)",letterSpacing:"1px"}}>Quando estiver pronto, embaralhe as cartas</p>
                </div>
              )}
              {cartaEstado==="embaralhando" && (
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(15px,3.5vw,19px)",color:"rgba(200,170,255,.9)",fontStyle:"italic",margin:"0 0 30px",animation:"pulsar 1s ease-in-out infinite",textAlign:"center"}}>
                  ✨ Concentre-se no seu pedido… ✨
                </p>
              )}
              {cartaEstado==="revelando" && (
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(15px,3.5vw,19px)",color:"rgba(200,170,255,.75)",fontStyle:"italic",margin:"0 0 30px",textAlign:"center"}}>
                  🌟 Revelando a sua mensagem…
                </p>
              )}

              {/* Monte de cartas */}
              {cartaEstado!=="revelada" && (
                <div style={{position:"relative",width:"160px",height:"220px",marginBottom:"38px"}}>
                  {cartasAnim.map((c)=>(
                    <div key={c.id} style={{
                      position:"absolute",width:"130px",height:"190px",borderRadius:"14px",
                      background:"linear-gradient(140deg,#2a1650 0%,#1a0f38 55%,#0f0a28 100%)",
                      border:"1.5px solid rgba(160,100,255,.38)",
                      boxShadow:"0 4px 20px rgba(100,50,200,.38)",
                      left:"15px",top:"15px",
                      transform:`translate(${c.x}px,${c.y}px) rotate(${c.rot}deg) scale(${c.scale})`,
                      zIndex:c.z,
                      transition: cartaEstado==="embaralhando"?"none":"transform .5s ease",
                    }}>
                      <div style={{position:"absolute",inset:"9px",borderRadius:"8px",border:"1px solid rgba(160,100,255,.18)",background:"radial-gradient(circle at 50% 30%,rgba(160,100,255,.07),transparent 70%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <svg width="55" height="55" viewBox="0 0 60 60" opacity="0.28">
                          <polygon points="30,4 35,22 54,22 39,33 45,52 30,40 15,52 21,33 6,22 25,22" fill="none" stroke="#a060ff" strokeWidth="1.5"/>
                          <circle cx="30" cy="30" r="8" fill="none" stroke="#a060ff" strokeWidth="1"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Carta revelada */}
              {cartaEstado==="revelada" && cartaSorteada && (
                <div style={{width:"min(460px,92vw)",animation:"revelarCarta .8s cubic-bezier(.34,1.56,.64,1)",marginBottom:"28px"}}>
                  <div style={{background:"linear-gradient(160deg,#1e0f3a 0%,#2a1550 55%,#1a0f35 100%)",borderRadius:"20px",padding:"34px 26px 26px",border:"1.5px solid rgba(160,100,255,.38)",position:"relative",overflow:"hidden",animation:"brilhoMistico 3s ease-in-out infinite"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:"linear-gradient(90deg,transparent,#a060ff,#d0a0ff,#a060ff,transparent)"}}/>
                    <div style={{textAlign:"center",marginBottom:"16px"}}><span style={{fontSize:"26px",animation:"estrela 2s ease-in-out infinite",display:"inline-block"}}>⭐</span></div>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,4vw,21px)",lineHeight:"1.8",color:"rgba(220,190,255,.95)",margin:"0 0 22px",fontStyle:"italic",fontWeight:300,textAlign:"center"}}>
                      "{cartaSorteada.texto}"
                    </p>
                    <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}><div style={{flex:1,height:"1px",background:"linear-gradient(90deg,transparent,rgba(160,100,255,.4))"}}/><span style={{color:"rgba(160,100,255,.6)",fontSize:"12px"}}>✦</span><div style={{flex:1,height:"1px",background:"linear-gradient(90deg,rgba(160,100,255,.4),transparent)"}}/></div>
                    <p style={{textAlign:"center",margin:0,fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",color:"rgba(180,140,255,.65)",letterSpacing:"1px",fontStyle:"italic"}}>— {cartaSorteada.autor}</p>
                    <div style={{position:"absolute",bottom:"9px",left:"12px",fontSize:"15px",opacity:.22,color:"#c090ff"}}>✧</div>
                    <div style={{position:"absolute",bottom:"9px",right:"12px",fontSize:"15px",opacity:.22,color:"#c090ff"}}>✧</div>
                    <div style={{position:"absolute",top:"18%",left:"6%",width:"70px",height:"70px",borderRadius:"50%",background:"radial-gradient(#a060ff,transparent 70%)",opacity:.07,pointerEvents:"none"}}/>
                    <div style={{position:"absolute",bottom:"18%",right:"6%",width:"55px",height:"55px",borderRadius:"50%",background:"radial-gradient(#6080ff,transparent 70%)",opacity:.09,pointerEvents:"none"}}/>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
                {cartaEstado==="idle" && (
                  <button onClick={iniciarEmbaralho} className="btn-m" style={{background:"linear-gradient(135deg,#7030c0,#a060f0)",border:"none",color:"#fff",padding:"14px 42px",borderRadius:"40px",cursor:"pointer",fontSize:"15px",fontFamily:"'Lato',sans-serif",letterSpacing:"1px",animation:"pulsarBtn 2.5s ease-in-out infinite",boxShadow:"0 6px 25px rgba(120,50,200,.5)",transition:"all .3s"}}>
                    🃏 Embaralhar as cartas
                  </button>
                )}
                {cartaEstado==="embaralhando" && (
                  <button onClick={pararEmbaralho} className="btn-m" style={{background:"linear-gradient(135deg,#c03080,#e050a0)",border:"none",color:"#fff",padding:"14px 42px",borderRadius:"40px",cursor:"pointer",fontSize:"15px",fontFamily:"'Lato',sans-serif",letterSpacing:"1px",animation:"pulsarBtnStop 1s ease-in-out infinite",boxShadow:"0 6px 25px rgba(200,50,130,.55)",transition:"all .3s"}}>
                    ✋ Parar agora
                  </button>
                )}
                {cartaEstado==="revelada" && (
                  <div style={{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
                    <button onClick={()=>{setCartaEstado("idle");setCartaSorteada(null);}} className="btn-m" style={{background:"transparent",border:"1px solid rgba(160,100,255,.4)",color:"#9070c0",padding:"10px 20px",borderRadius:"30px",cursor:"pointer",fontSize:"13px",fontFamily:"'Lato',sans-serif",transition:"all .2s"}}>← Nova consulta</button>
                    <button onClick={iniciarEmbaralho} className="btn-m" style={{background:"linear-gradient(135deg,#7030c0,#a060f0)",border:"none",color:"#fff",padding:"10px 26px",borderRadius:"30px",cursor:"pointer",fontSize:"13px",fontFamily:"'Lato',sans-serif",boxShadow:"0 4px 15px rgba(120,50,200,.4)",transition:"all .2s"}}>🃏 Embaralhar novamente</button>
                  </div>
                )}
              </div>
            </main>
          )}

          {telaC==="historico" && (
            <div style={{width:"min(560px,98vw)",padding:"22px 12px",zIndex:10,margin:"0 auto",animation:"fadeUp .4s ease"}}>
              <h2 style={{textAlign:"center",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,color:"#c090ff",fontSize:"21px",marginBottom:"18px",letterSpacing:"2px"}}>Mensagens Recebidas</h2>
              {histC.length===0?(<div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:"38px",marginBottom:"10px"}}>🔮</div><p style={{color:"#8060b0",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontSize:"15px"}}>Nenhuma consulta realizada ainda.<br/>Embaralhe as cartas! ✨</p></div>):(
                <div style={{maxHeight:"65vh",overflowY:"auto"}}>
                  {histC.map((h,i)=>(
                    <div key={i} style={{background:"rgba(28,14,56,.7)",borderRadius:"12px",border:"1px solid rgba(160,100,255,.18)",padding:"14px 16px",marginBottom:"9px",boxShadow:"0 2px 15px rgba(100,50,200,.13)"}}>
                      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"7px"}}><span style={{color:"rgba(160,120,255,.4)",fontSize:"10px",fontFamily:"'Lato',sans-serif"}}>{h.data}</span></div>
                      <p style={{color:"rgba(210,180,255,.85)",fontSize:"13px",margin:"0 0 5px",lineHeight:"1.6",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>"{h.texto}"</p>
                      <span style={{color:"rgba(160,120,255,.6)",fontSize:"11px",fontFamily:"'Lato',sans-serif"}}>— {h.autor}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
