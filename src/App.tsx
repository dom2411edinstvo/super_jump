import { useState, useEffect, useRef, type ReactNode } from 'react';

/* ───────── Intersection Observer Hook ───────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  const { ref, visible } = useInView(0.08);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
}

/* ───────── Header ───────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { href: '#what', label: 'О методике' },
    { href: '#results', label: 'Результаты' },
    { href: '#who', label: 'Для кого' },
    { href: '#about', label: 'Обо мне' },
    { href: '#contact', label: 'Контакты' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg shadow-purple-900/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2 text-white font-bold text-lg md:text-xl">
          <span className="text-2xl">⚡</span>
          <span>SUPER JUMP</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white text-sm font-medium transition-colors">{l.label}</a>
          ))}
          <a href="#contact" className="ml-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-purple-700/30 hover:shadow-purple-600/40">
            Записаться
          </a>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2" aria-label="Меню">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#1a1a2e]/98 backdrop-blur-lg border-t border-white/10 px-4 py-4 space-y-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold py-3 rounded-full mt-3">
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-700/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="animate-fade-in-left space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm text-white/90 border border-white/10">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              ОНЛАЙН-ТРЕНИРОВКИ • ПО ВСЕМУ МИРУ
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-tight text-white">
              Онлайн-тренировки{' '}
              <span className="gradient-text">по всему миру</span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Комплекс интеллектуальных упражнений&nbsp;— решаем психологические проблемы, улучшаем здоровье, создаём состояние счастья в&nbsp;моменте, достигаем жизненные цели
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-base px-8 py-4 rounded-full transition-all shadow-xl shadow-purple-700/30 hover:shadow-purple-600/50 hover:-translate-y-0.5">
                ЗАПИСАТЬСЯ НА ЗАНЯТИЕ
              </a>
            </div>
          </div>

          {/* Right — photo + badges */}
          <div className="animate-fade-in-right flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 to-violet-700/20 rounded-3xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl w-[280px] sm:w-[320px] md:w-[350px]">
                <img src="/images/trainer.jpg" alt="Рафикова Рина Римовна — интеллект-тренер Super Jump" className="w-full h-auto object-cover" />
              </div>

              {/* Badge: Ambassador */}
              <div className="absolute -right-2 sm:-right-6 top-8 glass-dark rounded-2xl px-4 py-3 text-center animate-float shadow-xl">
                <p className="text-2xl mb-1">🏆</p>
                <p className="text-[11px] text-white/60 font-medium">Статус</p>
                <p className="text-sm font-bold gradient-text-gold">Амбассадор 6 ранга</p>
              </div>
            </div>

            <p className="mt-6 text-white text-xl font-bold tracking-wide">Рафикова Рина Римовна</p>
            <p className="text-white/50 text-sm mt-1">Интеллект-тренер Super Jump</p>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,60 C360,100 720,0 1440,60 L1440,100 L0,100Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ───────── What is Super Jump ───────── */
function WhatSection() {
  const features = [
    { icon: '🧠', title: 'Интеллектуальные упражнения', desc: 'Авторская система практик, направленных на глубинную работу с подсознательными установками' },
    { icon: '💡', title: 'Психологическая перезагрузка', desc: 'Устранение внутренних конфликтов, обретение ясности и эмоциональной устойчивости' },
    { icon: '⚡', title: 'Ощутимый эффект с первых занятий', desc: 'Проверенные техники, которые запускают позитивные изменения уже после нескольких тренировок' },
  ];

  return (
    <Section id="what" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <div className="space-y-6">
            <p className="text-purple-600 font-semibold text-sm tracking-widest uppercase">Методика Super Jump</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] leading-tight">
              Фундамент для <span className="gradient-text">перепрограммирования сознания</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Каждый из нас сталкивается с трудностями: стрессы, проблемы со здоровьем, нехватка энергии, финансовые барьеры. Корень большинства из них — деструктивные программы, усвоенные в детстве и закреплённые годами.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Методика Super Jump позволяет безопасно перезаписать эти программы, открыв путь к новой, осознанной жизни. Тренировки проходят онлайн — присоединяйтесь из любой точки мира под руководством сертифицированного наставника.
            </p>

            <div className="space-y-5 pt-4">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e]">{f.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-3 bg-gradient-to-br from-purple-400/30 to-violet-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 text-center shadow-2xl border border-purple-500/20">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-5xl mb-6 shadow-lg shadow-purple-600/40">
                  ✨
                </div>
                <h4 className="text-white text-xl font-bold mb-2">Новый уровень жизни</h4>
                <p className="text-white/50 text-sm mb-6">Раскройте свой потенциал изнутри</p>
                <div className="grid grid-cols-3 gap-3">
                  {['🧠 Разум', '❤️ Тело', '⚡ Энергия'].map((item, i) => (
                    <div key={i} className="bg-white/5 rounded-xl py-3 text-white/80 text-xs font-medium border border-white/5">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────── Results ───────── */
function ResultsSection() {
  const results = [
    { icon: '🔥', title: 'Прилив энергии и активности', desc: 'Ощутите мощный заряд бодрости и желание действовать каждый день' },
    { icon: '😊', title: 'Улучшение настроения и снятие стресса', desc: 'Освободитесь от тревожности, раздражительности и хронического напряжения' },
    { icon: '🌅', title: 'Выход из депрессии', desc: 'Верните вкус к жизни, почувствуйте радость и осмысленность каждого дня' },
    { icon: '🤝', title: 'Гармония в отношениях', desc: 'Наладьте общение с близкими, коллегами и руководством на новом уровне' },
    { icon: '💪', title: 'Укрепление здоровья', desc: 'Запустите естественные механизмы восстановления организма через работу с сознанием' },
    { icon: '📈', title: 'Рост результатов в работе и бизнесе', desc: 'Повысьте продуктивность, находите нестандартные решения и достигайте целей быстрее' },
    { icon: '🧠', title: 'Повышение интеллекта', desc: 'Развивайте когнитивные способности, улучшайте память и скорость мышления' },
    { icon: '⭐', title: 'Рост самооценки', desc: 'Обретите уверенность в себе и в своих силах, перестаньте сомневаться' },
    { icon: '🛡️', title: 'Уверенность в завтрашнем дне', desc: 'Сформируйте внутреннюю опору и ощущение стабильности независимо от обстоятельств' },
    { icon: '☯️', title: 'Обретение гармонии', desc: 'Достигните баланса между внутренним миром и внешней реальностью' },
    { icon: '🎤', title: 'Ораторское мастерство', desc: 'Раскройте способность ярко и уверенно выражать свои мысли на публике' },
    { icon: '📹', title: 'Смелость выхода в эфир', desc: 'Преодолейте страх камеры и начните транслировать себя миру с лёгкостью' },
    { icon: '🌍', title: 'Позитивное сообщество', desc: 'Окружение единомышленников ускоряет ваш личностный рост в разы' },
    { icon: '🚀', title: 'Лучшая версия себя', desc: '«Сегодня лучше, чем вчера. Завтра — лучше, чем сегодня»' },
  ];

  return (
    <Section id="results" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-purple-600 font-semibold text-sm tracking-widest uppercase mb-3">Результаты участников</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] leading-tight">
            Что меняется <span className="gradient-text">после тренировок</span>
          </h2>
          <p className="text-gray-500 mt-4">Реальные изменения, которые отмечают клиенты уже в первые недели занятий</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((r, i) => (
            <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="text-3xl mb-3">{r.icon}</div>
              <h4 className="font-bold text-[#1a1a2e] mb-2 text-[15px] group-hover:text-purple-700 transition-colors">{r.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────── Who is it for ───────── */
function WhoSection() {
  const cards = [
    {
      icon: '💫',
      title: 'Тем, кто стремится к переменам',
      desc: 'Если вы ощущаете, что топчетесь на месте, жаждете обновления, но не понимаете, с чего начать — интеллект-тренировки укажут вектор к лучшей версии вашей жизни',
      tags: ['Перемены', 'Развитие', 'Новый путь'],
    },
    {
      icon: '💆',
      title: 'Ищущим душевное равновесие',
      desc: 'Для тех, кому необходим психологический комфорт, освобождение от тревоги, обретение внутренней тишины и устойчивости',
      tags: ['Антистресс', 'Баланс', 'Спокойствие'],
    },
    {
      icon: '🏆',
      title: 'Амбициозным и целеустремлённым',
      desc: 'Super Jump раскрывает скрытый потенциал, усиливает мотивацию и помогает достигать результатов, которые раньше казались невозможными',
      tags: ['Карьера', 'Цели', 'Успех'],
    },
  ];

  return (
    <Section id="who" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-purple-600 font-semibold text-sm tracking-widest uppercase mb-3">Для кого</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] leading-tight">
            Кому подходят <span className="gradient-text">интеллект-тренировки</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 text-white overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="relative">
                <span className="text-4xl block mb-4">{c.icon}</span>
                <h4 className="text-lg font-bold mb-3">{c.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map(t => (
                    <span key={t} className="bg-white/10 border border-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────── About Trainer ───────── */
function AboutSection() {
  return (
    <Section id="about" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-400/30 to-violet-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200/40 shadow-2xl max-w-[400px]">
                <img src="/images/trainer-about.jpg" alt="Рафикова Рина Римовна — Амбассадор 6 ранга Super Jump" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="text-purple-600 font-semibold text-sm tracking-widest uppercase">Обо мне</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e]">Рафикова Рина Римовна</h3>
            <p className="text-purple-500 font-medium">Интеллект-тренер Super Jump • Амбассадор 6&nbsp;ранга • Онлайн по всему миру</p>
            <p className="text-gray-600 leading-relaxed">
              Мой путь в Super Jump начался с личной трансформации. Я прошла через серьёзные жизненные испытания, и именно комплекс интеллектуальных упражнений помог мне выйти на совершенно другой уровень — уровень гармонии, энергии и уверенности. Сегодня я помогаю людям по всему миру раскрыть внутренний потенциал и начать жить осознанно.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Каждый человек способен изменить свою реальность. Моя миссия — поддержать вас на этом пути, убрать ограничивающие убеждения и направить к целям, о которых вы мечтали.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl md:text-3xl font-extrabold gradient-text">6</p>
                <p className="text-gray-500 text-xs mt-1">Ранг Амбассадора</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl md:text-3xl font-extrabold gradient-text">🌍</p>
                <p className="text-gray-500 text-xs mt-1">Онлайн по миру</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl md:text-3xl font-extrabold gradient-text">∞</p>
                <p className="text-gray-500 text-xs mt-1">Учеников</p>
              </div>
            </div>
          </div>
        </div>

        {/* Intellect trainer info */}
        <div className="mt-16 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <span className="text-5xl block mb-4">🎓</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Что значит «Интеллект-тренер»?</h3>
            <p className="text-white/60 max-w-3xl mx-auto leading-relaxed">
              Интеллект-тренер — это наставник, обучающий комплексу интеллектуальных упражнений и контролирующий точность их выполнения. В отличие от классического коуча, интеллект-тренер работает одновременно с телом и сознанием, помогая запустить глубинные трансформационные процессы. Рина Римовна — сертифицированный специалист с рангом Амбассадор 6, проводящий тренировки онлайн для участников из любой страны.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────── Contact ───────── */
function ContactSection() {
  return (
    <Section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-purple-600 font-semibold text-sm tracking-widest uppercase mb-3">Свяжитесь со мной</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] leading-tight">
            Начните свой путь <span className="gradient-text">к трансформации</span>
          </h2>
          <p className="text-gray-500 mt-4">Напишите или позвоните — я расскажу подробнее о занятиях и помогу сделать первый шаг</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Phone */}
          <a href="tel:+79615777055" className="group bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-purple-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-3xl text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
              📞
            </div>
            <h4 className="font-bold text-[#1a1a2e] mb-2">Телефон</h4>
            <p className="text-purple-600 font-semibold">+7 (961) 577-70-55</p>
            <p className="text-gray-400 text-sm mt-2">Звоните или пишите в мессенджеры</p>
          </a>

          {/* VK */}
          <a href="https://vk.ru/rina_raf" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-blue-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.188 1.368 1.259 2.182 1.815.616.42 1.084.328 1.084.328l2.175-.03s1.138-.07.598-.964c-.044-.073-.314-.661-1.618-1.869-1.365-1.264-1.182-1.06.462-3.246.999-1.33 1.398-2.142 1.273-2.49-.12-.331-.856-.244-.856-.244l-2.45.015s-.182-.025-.316.056c-.132.079-.216.262-.216.262s-.387 1.028-.903 1.903c-1.088 1.848-1.524 1.946-1.702 1.832-.414-.265-.31-1.066-.31-1.634 0-1.776.269-2.518-.524-2.71-.264-.064-.457-.106-1.13-.113-.863-.008-1.593.003-2.007.205-.276.135-.489.434-.359.451.16.021.522.098.714.358.248.336.24 1.09.24 1.09s.142 2.093-.332 2.352c-.326.178-.773-.185-1.731-1.844-.49-.849-.86-1.787-.86-1.787s-.072-.175-.199-.27c-.154-.112-.37-.148-.37-.148l-2.328.015s-.35.01-.478.162c-.114.135-.01.414-.01.414s1.82 4.258 3.882 6.403c1.889 1.967 4.033 1.838 4.033 1.838h.972z"/>
              </svg>
            </div>
            <h4 className="font-bold text-[#1a1a2e] mb-2">ВКонтакте</h4>
            <p className="text-blue-600 font-semibold">@rina_raf</p>
            <p className="text-gray-400 text-sm mt-2">Подписывайтесь и пишите в ЛС</p>
          </a>

          {/* Email */}
          <a href="mailto:rinarafikovna174196@gmail.com" className="group bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-amber-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-3xl text-white shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h4 className="font-bold text-[#1a1a2e] mb-2">Электронная почта</h4>
            <p className="text-amber-600 font-semibold text-sm">rinarafikovna174196@gmail.com</p>
            <p className="text-gray-400 text-sm mt-2">Для вопросов и записи на занятия</p>
          </a>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 md:p-10 max-w-2xl w-full relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl"></div>
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Готовы начать трансформацию?</h3>
              <p className="text-white/50 text-sm mb-6">Свяжитесь со мной любым удобным способом — вместе мы найдём путь к вашей лучшей жизни</p>
              <a href="tel:+79615777055" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-purple-700/30 hover:shadow-purple-600/50 hover:-translate-y-0.5">
                📞 Позвонить сейчас
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────── Footer ───────── */
function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white/50 py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="text-xl">⚡</span> SUPER JUMP
          </div>
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Рафикова Рина Римовна • Интеллект-тренер Super Jump • Онлайн по всему миру
          </p>
          <div className="flex items-center gap-4">
            <a href="https://vk.ru/rina_raf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.188 1.368 1.259 2.182 1.815.616.42 1.084.328 1.084.328l2.175-.03s1.138-.07.598-.964c-.044-.073-.314-.661-1.618-1.869-1.365-1.264-1.182-1.06.462-3.246.999-1.33 1.398-2.142 1.273-2.49-.12-.331-.856-.244-.856-.244l-2.45.015s-.182-.025-.316.056c-.132.079-.216.262-.216.262s-.387 1.028-.903 1.903c-1.088 1.848-1.524 1.946-1.702 1.832-.414-.265-.31-1.066-.31-1.634 0-1.776.269-2.518-.524-2.71-.264-.064-.457-.106-1.13-.113-.863-.008-1.593.003-2.007.205-.276.135-.489.434-.359.451.16.021.522.098.714.358.248.336.24 1.09.24 1.09s.142 2.093-.332 2.352c-.326.178-.773-.185-1.731-1.844-.49-.849-.86-1.787-.86-1.787s-.072-.175-.199-.27c-.154-.112-.37-.148-.37-.148l-2.328.015s-.35.01-.478.162c-.114.135-.01.414-.01.414s1.82 4.258 3.882 6.403c1.889 1.967 4.033 1.838 4.033 1.838h.972z"/>
              </svg>
            </a>
            <a href="mailto:rinarafikovna174196@gmail.com" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a href="tel:+79615777055" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────── Motto / Quote Banner ───────── */
function QuoteBanner() {
  return (
    <Section className="py-16 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
          «Сегодня лучше, чем вчера.<br />Завтра — лучше, чем сегодня»
        </blockquote>
        <p className="text-white/60 mt-4 text-lg">Стать лучшей версией себя — это ежедневный выбор</p>
      </div>
    </Section>
  );
}

/* ───────── App ───────── */
export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <WhatSection />
      <ResultsSection />
      <WhoSection />
      <QuoteBanner />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
