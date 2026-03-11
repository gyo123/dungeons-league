/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Gamepad2, 
  Shield, 
  Zap, 
  ChevronRight, 
  Timer, 
  Sword, 
  Target, 
  Skull, 
  Gem,
  Star,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brawl-dark/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brawl-blue rounded-lg flex items-center justify-center shadow-lg shadow-brawl-blue/20">
            <Trophy className="text-white" size={24} />
          </div>
          <span className="font-display text-2xl tracking-wider text-white brawl-text-shadow">DUNGEON LEAGUES</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
          <a href="#inicio" className="hover:text-brawl-blue transition-colors">Início</a>
          <a href="#sobre" className="hover:text-brawl-blue transition-colors">Sobre</a>
          <a href="#formato" className="hover:text-brawl-blue transition-colors">Formato</a>
          <a href="#regras" className="hover:text-brawl-blue transition-colors">Regras</a>
          <a href="#times" className="hover:text-brawl-blue transition-colors">Times</a>
        </div>
        <button className="bg-brawl-purple px-6 py-2 rounded-full font-bold text-sm hover:bg-brawl-blue transition-all shadow-lg shadow-brawl-purple/20">
          INSCREVER-SE
        </button>
      </div>
    </nav>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });

  useEffect(() => {
    // Definindo a data para o dia 21 do mês atual (ou próximo se já passou)
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), now.getMonth(), 21);
    if (now.getDate() > 21) {
      targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 21);
    }

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = targetDate.getTime() - currentTime;

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center mt-12">
      {[
        { label: 'Dias', value: timeLeft.dias },
        { label: 'Horas', value: timeLeft.horas },
        { label: 'Minutos', value: timeLeft.minutos },
        { label: 'Segundos', value: timeLeft.segundos }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-brawl-purple/20 border-2 border-brawl-purple rounded-2xl flex items-center justify-center mb-2 backdrop-blur-sm shadow-lg shadow-brawl-purple/10">
            <span className="font-display text-2xl md:text-4xl text-brawl-blue">{item.value}</span>
          </div>
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-white/60">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-brawl-blue/20"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: ['-10%', '110%'],
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {i % 3 === 0 ? <Gem size={24} /> : i % 3 === 1 ? <Star size={24} /> : <Skull size={24} />}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    fetch('/teams.json')
      .then(res => res.json())
      .then(data => setTeamsData(data.tournament.teams))
      .catch(err => console.error('Erro ao carregar times:', err));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <ParticleBackground />
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <motion.div
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <span className="bg-brawl-purple/30 border border-brawl-purple text-brawl-blue px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.3em] backdrop-blur-sm">
              6ª Edição Especial 🐺
            </span>
          </motion.div>
          
          <h1 className="font-display text-6xl md:text-9xl mb-6 brawl-text-shadow leading-tight">
            DUNGEON <br />
            <span className="text-brawl-yellow">LEAGUES</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-bold text-white/80 mb-10 tracking-wide">
            "Prepare-se para o caos da arena."
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="brawl-button group">
              <span className="flex items-center gap-2">
                🔥 VER REGULAMENTO
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Gamepad2 className="text-brawl-blue" />
              </div>
              <div>
                <p className="text-xs uppercase font-black text-white/40">Jogo</p>
                <p className="font-bold">Brawl Stars</p>
              </div>
            </div>
          </div>

          <Countdown />
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 hidden lg:block opacity-30"
        >
          <img src="https://picsum.photos/seed/brawl1/200/200" alt="Brawler" className="w-48 h-48 rounded-3xl rotate-12" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-10 hidden lg:block opacity-30"
        >
          <img src="https://picsum.photos/seed/brawl2/200/200" alt="Brawler" className="w-48 h-48 rounded-3xl -rotate-12" referrerPolicy="no-referrer" />
        </motion.div>
      </section>

      {/* Sobre o Torneio */}
      <section id="sobre" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl mb-8 brawl-text-shadow">SOBRE O TORNEIO</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Dungeon Leagues é um campeonato competitivo de Brawl Stars onde 16 equipes disputam pela vitória. 
                O torneio acontece em duas fases principais: <span className="text-brawl-blue font-bold">Fase de Grupos</span> e <span className="text-brawl-purple font-bold">Mata-Mata</span>. 
                Somente os melhores avançam até restar um grande campeão.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card border-brawl-blue/30">
                  <Users className="text-brawl-blue mb-4" size={32} />
                  <h3 className="font-display text-xl mb-2">16 EQUIPES</h3>
                  <p className="text-sm text-white/50">Elite competitiva do Brawl Stars.</p>
                </div>
                <div className="glass-card border-brawl-purple/30">
                  <Trophy className="text-brawl-purple mb-4" size={32} />
                  <h3 className="font-display text-xl mb-2">PREMIAÇÃO</h3>
                  <p className="text-sm text-white/50">3 Brawl Pass Plus para os campeões.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl relative group">
                <img 
                  src="/img-equipe/arena.jpg" 
                  alt="Arena" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brawl-dark to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-brawl-yellow text-brawl-dark px-4 py-1 rounded-lg font-black text-xs uppercase">Arena Oficial</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brawl-blue rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brawl-purple rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fase de Grupos */}
      <section id="formato" className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-5xl mb-4 brawl-text-shadow uppercase">Fase de Grupos</h2>
            <p className="text-white/60 max-w-2xl mx-auto">16 equipes divididas em 4 grupos com 4 times cada. Apenas 2 equipes de cada grupo avançam.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "1ª Rodada", 
                desc: "Os confrontos serão definidos em sorteio realizado pela organização.",
                icon: <Zap className="text-brawl-yellow" />
              },
              { 
                title: "2ª Rodada", 
                desc: "Vencedores disputam classificação antecipada. Perdedores disputam sobrevivência.",
                icon: <Sword className="text-brawl-blue" />
              },
              { 
                title: "3ª Rodada", 
                desc: "Last Chance: Times com 1 vitória e 1 derrota disputam a última vaga.",
                icon: <Target className="text-brawl-purple" />
              }
            ].map((round, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card hover:bg-white/10 transition-colors border-t-4 border-t-brawl-blue"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {round.icon}
                </div>
                <h3 className="font-display text-2xl mb-4 text-brawl-blue">{round.title}</h3>
                <p className="text-white/60">{round.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Diagrama Visual */}
          <div className="mt-20 p-8 glass-card border-dashed border-2 border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-brawl-blue/20 border-2 border-brawl-blue flex items-center justify-center font-display text-2xl">16</div>
                <span className="text-xs font-bold uppercase tracking-widest">Equipes</span>
              </div>
              <ChevronRight className="hidden md:block text-white/20" size={48} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-brawl-purple/20 border-2 border-brawl-purple flex items-center justify-center font-display text-2xl">4</div>
                <span className="text-xs font-bold uppercase tracking-widest">Grupos</span>
              </div>
              <ChevronRight className="hidden md:block text-white/20" size={48} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-brawl-yellow/20 border-2 border-brawl-yellow flex items-center justify-center font-display text-2xl">8</div>
                <span className="text-xs font-bold uppercase tracking-widest">Classificados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mata-Mata */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl mb-4 brawl-text-shadow uppercase">💀 Mata-Mata</h2>
            <p className="text-white/60">Onde as lendas são feitas. Eliminação direta até o topo.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-brawl-blue text-center lg:text-left">Quartas de Final</h3>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="glass-card p-4 flex flex-col gap-2 border-l-4 border-l-brawl-blue">
                  <div className="flex justify-between items-center opacity-50"><span className="text-xs font-bold">TIME A</span><span className="text-xs">VS</span><span className="text-xs font-bold">TIME B</span></div>
                </div>
              ))}
            </div>
            
            <div className="space-y-12">
              <h3 className="font-display text-2xl text-brawl-purple text-center">Semifinal</h3>
              {[1, 2].map(i => (
                <div key={i} className="glass-card p-6 flex flex-col gap-2 border-l-4 border-l-brawl-purple">
                  <div className="flex justify-between items-center"><span className="text-sm font-bold">VENCEDOR Q{i*2-1}</span><span className="text-xs text-brawl-purple">VS</span><span className="text-sm font-bold">VENCEDOR Q{i*2}</span></div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-display text-3xl text-brawl-yellow mb-8">Grande Final</h3>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-card p-10 border-4 border-brawl-yellow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-brawl-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Trophy className="text-brawl-yellow mx-auto mb-6 animate-bounce" size={64} />
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-widest mb-2 text-white/40">Disputa pelo Título</p>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xl">FINALISTA 1</span>
                    <span className="text-brawl-yellow font-black">VS</span>
                    <span className="font-display text-xl">FINALISTA 2</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Regras */}
      <section id="regras" className="py-24 px-6 bg-brawl-blue/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="font-display text-5xl mb-6 brawl-text-shadow uppercase">Regras das Partidas</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brawl-blue"><CheckCircle2 size={20} /></div>
                  <p className="text-white/70">Todas as partidas serão <span className="text-white font-bold">MD5 (Melhor de 5)</span>.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brawl-blue"><CheckCircle2 size={20} /></div>
                  <p className="text-white/70">Seguem as mesmas regras do <span className="text-white font-bold">modo ranqueado</span>.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brawl-blue"><CheckCircle2 size={20} /></div>
                  <p className="text-white/70">Não existem brawlers banidos por padrão.</p>
                </div>
                <div className="bg-brawl-purple/20 p-4 rounded-2xl border border-brawl-purple/30 mt-8">
                  <p className="text-sm italic text-white/80">
                    <Info className="inline-block mr-2 text-brawl-purple" size={16} />
                    Caso não queira enfrentar algum personagem, ele pode ser banido durante o pick do time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Pique-Gema", icon: "💎", color: "text-purple-400" },
                { name: "Fut-Brawl", icon: "⚽", color: "text-blue-400" },
                { name: "Caça-Estrelas", icon: "⭐", color: "text-yellow-400" },
                { name: "Nocaute", icon: "💀", color: "text-red-400" },
                { name: "Zona Estratégica", icon: "🟪", color: "text-indigo-400" },
                { name: "Roubo", icon: "💰", color: "text-green-400" }
              ].map((mode, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-brawl-blue/50 transition-all"
                >
                  <span className="text-4xl">{mode.icon}</span>
                  <span className={`font-display text-lg ${mode.color}`}>{mode.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premiação */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brawl-purple/10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card border-4 border-brawl-yellow p-12 shadow-[0_0_50px_rgba(249,212,35,0.2)]"
          >
            <h2 className="font-display text-5xl mb-8 brawl-text-shadow text-brawl-yellow">PREMIAÇÃO</h2>
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-brawl-yellow to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Trophy size={64} className="text-brawl-dark" />
              </motion.div>
              <div>
                <h3 className="font-display text-3xl mb-2">EQUIPE CAMPEÃ RECEBE:</h3>
                <p className="text-5xl font-display text-brawl-blue brawl-text-shadow">🎁 3 BRAWL PASS PLUS</p>
              </div>
              <div className="flex gap-2 mt-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="text-brawl-yellow fill-brawl-yellow" size={24} />)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Times Participantes */}
      <section id="times" className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-display text-5xl mb-4 brawl-text-shadow uppercase">Times Participantes</h2>
              <p className="text-white/60">As melhores organizações já garantiram sua vaga.</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-48 h-4 bg-white/10 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '56.25%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brawl-blue"
                  ></motion.div>
                </div>
                <span className="font-display text-2xl text-brawl-blue">9 / 16</span>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/40">Vagas Preenchidas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamsData.map((team, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card overflow-hidden group cursor-default"
              >
                {/* Team Image */}
                <div className="relative h-40 overflow-hidden bg-white/5">
                  <img 
                    src={team.image} 
                    alt={team.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brawl-dark to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute top-3 right-3 bg-brawl-blue px-3 py-1 rounded-full font-black text-xs text-white">
                    #{team.position}
                  </div>
                </div>
                
                {/* Team Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-lg group-hover:text-brawl-blue transition-colors">{team.name}</h3>
                      <span className="text-xs font-black uppercase tracking-widest text-brawl-purple">{team.acronym}</span>
                    </div>
                  </div>
                  
                  {/* Players */}
                  <div className="space-y-2 mb-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Jogadores</p>
                    {team.players.map((player, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brawl-blue"></span>
                        <span className="text-xs text-white/80">{player}</span>
                      </div>
                    ))}
                  </div>

                  {/* Reserves */}
                  {team.reserves.length > 0 && (
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Reserva</p>
                      {team.reserves.map((reserve, idx) => (
                        <div key={idx} className="flex items-center gap-2 opacity-70">
                          <span className="w-1.5 h-1.5 rounded-full bg-brawl-purple"></span>
                          <span className="text-xs text-white/60">{reserve}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Status */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Confirmado</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Vagas restantes */}
            {[...Array(7)].map((_, i) => (
              <div key={i} className="glass-card border-dashed border-2 border-white/10 flex items-center justify-center p-6 opacity-40 grayscale">
                <div className="flex flex-col items-center gap-2">
                  <Users size={24} />
                  <span className="font-display text-sm">VAGA DISPONÍVEL</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Trophy className="text-brawl-blue" size={24} />
            <span className="font-display text-xl tracking-wider brawl-text-shadow">DUNGEON LEAGUES</span>
          </div>
          
          <p className="text-white/40 text-sm">
            © 2026 Dungeon Leagues. Este torneio não é afiliado ou patrocinado pela Supercell.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brawl-blue transition-colors"><Gamepad2 size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brawl-purple transition-colors"><Users size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brawl-yellow transition-colors"><Trophy size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button className="w-16 h-16 bg-brawl-yellow rounded-full shadow-2xl flex items-center justify-center text-brawl-dark border-b-4 border-orange-600 active:translate-y-1 active:border-b-0 transition-all">
          <Zap size={32} />
        </button>
      </div>
    </div>
  );
}
