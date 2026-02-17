import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle, Menu, X, ChevronDown, ChevronLeft, ArrowRight,
  Users, TrendingUp, Zap, BarChart3, Target,
  Clock, CheckCircle2, Phone, Settings, Sparkles,
  BookOpen, Palette, PenTool, LineChart, Mail, Send,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const HERO_CHATS = [
  { co: "BREAKING DOWN", cl: "#DC2626", m1: "次回イベントのご案内🔥", m2: "参加したい！", m3: "チケット優先枠をご用意しました🎫" },
  { co: "REAL VALUE", cl: "#2563EB", m1: "本日の対談配信のお知らせ📺", m2: "楽しみにしてます！", m3: "22時からスタートです✨" },
  { co: "Expert Partners", cl: "#059669", m1: "面談日程のご案内です📅", m2: "確認します！", m3: "下記よりご希望日をお選びください🗓" },
  { co: "T CLINIC", cl: "#DB2777", m1: "ご予約ありがとうございます✨", m2: "変更できますか？", m3: "はい、こちらから変更可能です💊" },
  { co: "HERO'ZZ", cl: "#D97706", m1: "本日のレッスン情報📚", m2: "参加します！", m3: "ご予約確定しました🎉" },
  { co: "BUZZ SHIP", cl: "#7C3AED", m1: "新キャンペーンのお知らせ🎯", m2: "詳しく知りたい！", m3: "こちらの特別ページをご覧ください✨" },
  { co: "V CLINIC", cl: "#EA580C", m1: "カウンセリングのご案内💝", m2: "予約したいです", m3: "ご希望日をお選びください📋" },
  { co: "New me", cl: "#0891B2", m1: "新メニューのお知らせ🌸", m2: "興味あります！", m3: "詳細はこちらからご確認ください✨" },
  { co: "VOYAGE", cl: "#00BFA5", m1: "無料相談のご予約完了です✅", m2: "ありがとうございます！", m3: "当日はZoomでお待ちしております🙌" },
  { co: "ポスティングHD", cl: "#4F46E5", m1: "資料請求ありがとうございます📄", m2: "確認しました！", m3: "担当よりご連絡いたします📞" },
];

const CLIENTS = [
  { name: "BUZZ SHIP", cat: "デジタルマーケティング", desc: "既存リストの最適化により広告費を抑制しながら月商を大幅増", accent: "#1a1a1a", logo: "/client-buzzship.png", scale: 0.75 },
  { name: "BREAKING DOWN", cat: "格闘エンタメ", desc: "大規模イベント集客とファンエンゲージメントをLINE基盤で構築", accent: "#1D3557", logo: "/client-breakingdown.png", scale: 1.15, screenImage: "/screen-BREAKINGDOWN.png", isMockupImage: true },


  { name: "HERO'ZZ", cat: "スクール", desc: "プッシュ配信施策により短期間で5,000万円超の売上を創出", accent: "#E76F51", logo: "/client-herozz-banner.png", scale: 1.08, screenImage: "/screen-HEROZZ.png", isMockupImage: true },


  { name: "V CLINIC", cat: "美容クリニック", desc: "予約管理の自動化と顧客体験の向上をLINEで実現", accent: "#C5A882", logo: "/client-vclinic.png", scale: 1.08, screenImage: "/screen-VCLINIC.jpg", isMockupImage: true },


  { name: "AI+", cat: "テクノロジー", desc: "AI活用サービスのユーザー獲得とリテンションをLINEで最適化", accent: "#111", logo: "/client-aiplus.png", fill: true, screenImage: "/screen-AIplus.png", isMockupImage: true },
  { name: "REAL VALUE ACADEMIA", cat: "教育", desc: "オンラインスクールの集客・受講生管理をLINEで一元化", accent: "#1a1a1a", logo: "/client-realvalue-academia.png", scale: 1.5 },
  { name: "WEIN CAREER", cat: "人材", desc: "中卒・高卒採用に特化した人材紹介をLINEで効率化", accent: "#E53935", logo: "/client-weincareer.png" },
  { name: "Expert Partners", cat: "人材", desc: "オウンドメディア×LINEで面談予約率を4%→25%に改善", accent: "#2A3E6C", logo: "/client-expertpartners.png" },
  { name: "REAL VALUE", cat: "ビジネス番組", desc: "LINE完結で視聴者エンゲージメントとイベント集客を最大化", accent: "#E63946", logo: "/client-realvalue.png", scale: 1.15, screenImage: "/screen-realvalue.png", isMockupImage: true },

];

const PAINS = [
  { icon: Users, img: "/pain-recruit-cost.png", tag: "採用", audience: "経営者", keyword: "採用の歩留まりが悪く面接までつながらない", text: "求人媒体やエージェントに毎年多額の費用を払っているが、母集団の質が低く面接辞退も多い。", statNum: "50万円〜", statLabel: "1人あたり採用コスト" },
  { icon: Phone, img: "/pain-dropout.png", tag: "採用", audience: "人事", keyword: "面談前に離脱されてしまう", text: "せっかく応募があっても、メールや電話が繋がらず、面談前に候補者がいなくなる。", statNum: "4%", statLabel: "面談到達率" },
  { icon: TrendingUp, img: "/pain-no-repeat.png", tag: "集客", audience: "マーケティング担当", keyword: "リピート・成約に繋がらない", text: "SNS広告やWeb広告で新規獲得はできているが、一度きりで終わり再来店・再購入に至らない。", statNum: "80%", statLabel: "が初回で離脱" },
  { icon: Settings, img: "/pain-what-to-send.png", tag: "集客", audience: "広報・営業担当", keyword: "何を配信すればいいかわからない", text: "LINE公式アカウントを作ったものの、何を送れば効果的なのか分からず放置してしまう。", statNum: "60%", statLabel: "が運用を停止" },
];

const LINE_STATS = [
  { num: "9,700", unit: "万人", label: "日本人口の8割に届く", sub: "YouTube・Xを超える国内最大のプラットフォーム。あなたの顧客は、すでにLINEの中にいます。", img: "/market-users-v2.png" },
  { num: "80", unit: "%", label: "LINEの開封率", sub: "配信当日に80%が開封。メールの4倍以上の到達力で確実に届く。", img: "/market-openrate-v2.png" },
  { num: "99.2", unit: "%", label: "学生のLINE利用率", sub: "電話に出ない若者もLINEなら即レス。採用の最強タッチポイント。", img: "/line-students.png" },
  { num: "∞", unit: "", label: "資産としての価値", sub: "集めた友だちは自社資産として残り続け、コストを下げ続ける。", img: "/line-asset.png" },
];

const CASES = [
  { num: "01", name: "Expert Partners様", cat: "人材マッチング事業", challenge: "リード獲得後の歩留まり低下", metric: "面談予約率", before: "4%", after: "25%", desc: "オウンドメディアとLINEの連携により機会損失を軽減。", img: "/case-ep.png" },
  { num: "02", name: "HERO'ZZ様", cat: "スクール事業", challenge: "受講生への効率的なアプローチ", metric: "売上", before: "—", after: "5,000万円超", desc: "プッシュ配信施策による成果。", img: "/case-herozz.png" },
  { num: "03", name: "マーケ博士様", cat: "SNSマーケティング事業", challenge: "フォロワー獲得後のマネタイズ導線が弱い", metric: "LINE経由売上", before: "—", after: "月商1,000万円超", desc: "LINE診断とセグメント配信で見込み客を育成。", img: "/case-marke.png" },
];

const VOICES = [
  { avatar: "/avatar-voice-1.png", color: "#2A9D8F", role: "人材マッチング企業 / 代表", quote: "単なるシステム提供ではなく、『候補者がなぜ離脱するのか』という心理に基づいた設計を提案してくれた。", result: "応募から面談予約まで完全自動化。面談予約率は従来比30%改善。採用単価も大幅改善。" },
  { avatar: "/avatar-voice-2.png", color: "#E76F51", role: "EC事業 / マーケティング責任者", quote: "広告で集客はできているが、LINEの登録から購入への動線が弱く、リピーターに繋がっていなかった。", result: "LTV重視のシナリオ設計により配信のたびに売上が積み上がる構造に。ブロック率も激減。" },
];

/* Person silhouette avatar */
const PersonAvatar = ({ color, gender, size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" className="shrink-0">
    <circle cx="28" cy="28" r="28" fill={color} opacity=".12" />
    <circle cx="28" cy="21" r={gender === "f" ? 8.5 : 8} fill={color} opacity=".6" />
    {gender === "f" ? (
      <>
        <path d="M28 12c-5.5 0-9 3.5-9 8.5 0 0 .5-4 9-4s9 4 9 4c0-5-3.5-8.5-9-8.5z" fill={color} opacity=".4" />
        <ellipse cx="28" cy="42" rx="14" ry="10" fill={color} opacity=".5" />
      </>
    ) : (
      <>
        <rect x="19" y="13" width="18" height="5" rx="2.5" fill={color} opacity=".3" />
        <ellipse cx="28" cy="42" rx="13" ry="10" fill={color} opacity=".5" />
      </>
    )}
  </svg>
);

const STRENGTHS = [
  { num: "01", img: "/strength-illust-01.png", ja: "圧倒的結果にコミット", sub: "伴走型支援で、KPI改善に責任を持ちます", desc: "ただの\u201C代行業者\u201Dではなく、圧倒的当事者意識で数字に向き合います。売上・予約数・CVなど、目標達成から逆算したLINE戦略を立案。改善のたびに報告・提案を行い、共に成果を追いかけ続けます。" },
  { num: "02", img: "/strength-illust-02.png", ja: "オーダーメイドの自動化シナリオ設計", sub: "業種・サービスに最適な導線設計で成果を最大化", desc: "LINE登録、予約、教育、販売、リマインド、アフター対応まで。ユーザーの行動や属性に応じて分岐するLINEシナリオを設計し、人の手を介さずに\u201C売れる導線\u201Dを自動化します。" },
  { num: "03", img: "/strength-illust-03.png", ja: "効果測定シートの作成・運用", sub: "LINE内全ての導線を数値化", desc: "すべての施策を数値で検証。LINE内の導線を可視化した効果測定シートを作成し、データに基づいたPDCAを高速回転させます。" },
  { num: "04", img: "/strength-illust-04.png", ja: "数多くの実績・経験に基づいたデータ", sub: "VOYAGEには圧倒的なノウハウがあります", desc: "200社超の運用データから導き出した『成功の型』を、貴社に合わせてカスタマイズ。業界・業種ごとの豊富な実績と経験に基づき、成果に繋げる圧倒的なノウハウを提供します。" },
];

const FLOW_STEPS = [
  { ja: "ヒアリング・戦略設計", sub: "第一歩はここから！", desc: "採用・集客のお悩みをヒアリングし、目的に応じたLINEシナリオの全体設計を行います。" },
  { ja: "アカウント構築", sub: "プロの手でゼロから構築！", desc: "リッチメニュー・自動応答・セグメント配信などを約1〜2ヶ月で構築します。" },
  { ja: "テスト運用", sub: "本番前の最終確認！", desc: "実環境でシナリオの動作と反応率を検証。ユーザー体験を最適化し、万全の状態に仕上げます。" },
  { ja: "本番運用開始", sub: "いよいよスタート！", desc: "専任チームが成果指標をモニタリング。定例会で改善提案を継続的に行います。" },
];

const FAQ_ITEMS = [
  { q: "アカウントの立ち上げから依頼できますか？", a: "はい、初期設定から認証申請、戦略設計まで一貫して対応可能です。" },
  { q: "既存の運用を引き継ぐことは可能ですか？", a: "可能です。現状のデータを分析し、ボトルネックを解消するリニューアルプランをご提案します。" },
  { q: "対応可能な業種は？", a: "業種を問わず対応可能です。美容、教育、採用、EC/D2Cなど多岐にわたる実績があります。" },
  { q: "LINEのセキュリティ・プライバシーが不安です。", a: "LINE公式アカウントはLINE社が提供するビジネス向け正規サービスです。個人情報保護法に準拠した運用体制で万全を期しています。" },
];

const LACADEMIA_POINTS = [
  { num: "01", title: "200社以上のノウハウを徹底解説したカリキュラム", sub: "圧倒的な網羅性", desc: "累計200社以上のLINE構築・運用支援実績から導き出された「成功の法則」を体系化。基礎から応用まで、成果を出すために必要な知識を余すことなく網羅しており、未経験からでもプロレベルのスキルが身につきます。" },
  { num: "02", title: "実践型で現場の即戦力をやしなう", sub: "即実践・即成果", desc: "座学だけでは終わりません。実際のアカウント構築を通じて学ぶ実践型カリキュラムで、現場で即通用するスキルを習得。成果実証済みのテンプレートも活用しながら、手を動かして確実に力をつけていきます。" },
  { num: "03", title: "コンサルの伴走支援", sub: "挫折させない環境", desc: "現役のプロ講師があなたの学習を徹底サポート。わからないことはチャットで質問し放題なだけでなく、オンラインによる個別コンサルティングや制作物の添削まで実施。独学ではつまずきやすいポイントも、二人三脚で確実に乗り越えられます。" },
];

/* ═══════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════ */
const useInView = (th = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: th });
    obs.observe(el); return () => obs.disconnect();
  }, [th]);
  return [ref, v];
};

const useCountUp = (end, dur = 2000) => {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView(0.3);
  const ran = useRef(false);
  useEffect(() => {
    if (!vis || ran.current) return; ran.current = true;
    const t0 = performance.now();
    const tick = (now) => { const p = Math.min((now - t0) / dur, 1); setVal(Math.round(end * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [vis, end, dur]);
  return [ref, val];
};

/* ── Scroll-driven progress (0→1) for an element ── */
const useScrollProgress = (ref, opts = {}) => {
  const { start = 0.8, end = 0.2 } = opts;
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref?.current; if (!el) return;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const wh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (wh * start - r.top) / (wh * (start - end)))));
    };
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, [ref, start, end]);
  return p;
};

/* ── Parallax offset ── */
const useParallax = (ref, speed = 0.3) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const el = ref?.current; if (!el) return;
    const tick = () => setOffset(el.getBoundingClientRect().top * speed);
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, [ref, speed]);
  return offset;
};

/* ── Scroll progress bar (right edge) ── */
const ScrollProgressBar = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const tick = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setP(h > 0 ? window.scrollY / h : 0); };
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);
  return <div className="fixed top-0 right-0 w-[3px] h-full z-[100] pointer-events-none"><div className="w-full bg-[#00BFA5] rounded-full transition-[height] duration-100" style={{ height: `${p * 100}%` }} /></div>;
};

/* ── Mouse position tracker for magnetic effects ── */
const useMouse = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return pos;
};

/* ── Magnetic button wrapper ── */
const MagneticWrap = ({ children, className = "", strength = 0.3 }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };
  const handleLeave = () => setOffset({ x: 0, y: 0 });
  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 0.3s cubic-bezier(.23,1,.32,1)", willChange: "transform" }}>
      {children}
    </div>
  );
};

/* ── Scroll-triggered horizontal line ── */
const ScrollLine = ({ color = "#00BFA5", delay = 0 }) => {
  const [ref, vis] = useInView(0.3);
  return (
    <div ref={ref} className="w-full h-[2px] overflow-hidden my-6">
      <div className="h-full origin-left transition-transform duration-1000 ease-out" style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transform: vis ? "scaleX(1)" : "scaleX(0)",
        transitionDelay: `${delay}ms`,
      }} />
    </div>
  );
};

/* ── Floating particles background ── */
const FloatingParticles = ({ count = 6, color = "rgba(0,191,165,", className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="absolute rounded-full" style={{
        width: 3 + (i % 3) * 2,
        height: 3 + (i % 3) * 2,
        background: `${color}${0.08 + (i % 4) * 0.04})`,
        left: `${10 + (i * 17) % 80}%`,
        top: `${5 + (i * 23) % 85}%`,
        animation: `${i % 2 === 0 ? "float-a" : "float-b"} ${4 + i * 1.5}s ease-in-out infinite`,
        animationDelay: `${i * 0.7}s`,
      }} />
    ))}
  </div>
);

/* ── Scroll-driven number with dramatic scale ── */
const BigNumber = ({ end, suffix, label, prefix = "", compact }) => {
  const [ref, val] = useCountUp(end, 1800);
  const elRef = useRef(null);
  const [vis2, setVis2] = useState(false);
  useEffect(() => {
    const el = elRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis2(true); }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={(node) => { ref.current = node; elRef.current = node; }} className="text-center">
      <div className="overflow-hidden">
        <div className="transition-all duration-700 ease-out" style={{
          transform: vis2 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.8)",
          opacity: vis2 ? 1 : 0,
          filter: vis2 ? "blur(0)" : "blur(4px)",
        }}>
          <span className={`font-en font-black text-[#00BFA5] leading-none tabular-nums ${compact ? "text-[32px] md:text-[40px]" : "text-[46px] md:text-[64px]"}`}>
            {prefix}{val}
          </span>
          <span className={`font-bold text-black/90 ml-1 ${compact ? "text-[14px] md:text-[16px]" : "text-[16px] md:text-[20px]"}`}>{suffix}</span>
        </div>
      </div>
      <p className={`text-black/80 font-semibold mt-2 ${compact ? "text-[10px]" : "text-[11px]"}`}>{label}</p>
    </div>
  );
};

/* ── Horizontal scroll reveal (cards slide in from sides) ── */
const HorizontalReveal = ({ children, direction = "left", delay = 0 }) => {
  const [ref, vis] = useInView(0.1);
  const dx = direction === "left" ? -60 : 60;
  return (
    <div ref={ref} className="transition-all duration-900 ease-out" style={{
      transform: vis ? "translateX(0) rotate(0)" : `translateX(${dx}px) rotate(${direction === "left" ? -2 : 2}deg)`,
      opacity: vis ? 1 : 0,
      transitionDelay: `${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ── Pop-in animation (scale bounce) ── */
const PopIn = ({ children, delay = 0, className = "" }) => {
  const [ref, vis] = useInView(0.15);
  return (
    <div ref={ref} className={`transition-all duration-500 ${className}`} style={{
      transform: vis ? "scale(1)" : "scale(0)",
      opacity: 1, // 不透明度は常に100%（スケール変化のみでポップインを表現）
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)",
    }}>
      {children}
    </div>
  );
};

/* ── Tilt card reveal (perspective) ── */
const TiltReveal = ({ children, delay = 0, direction = "left" }) => {
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref} className="transition-all duration-800 ease-out" style={{
      transform: vis
        ? "perspective(800px) rotateY(0) translateX(0)"
        : `perspective(800px) rotateY(${direction === "left" ? 8 : -8}deg) translateX(${direction === "left" ? -30 : 30}px)`,
      opacity: vis ? 1 : 0,
      transitionDelay: `${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ── Scroll-triggered underline grow ── */
const GrowUnderline = ({ children, color = "#00BFA5", className = "" }) => {
  const [ref, vis] = useInView(0.3);
  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-[2px] w-full h-[4px] md:h-[6px] rounded-sm -z-0 origin-left transition-transform duration-700 ease-out"
        style={{ background: `${color}33`, transform: vis ? "scaleX(1)" : "scaleX(0)" }} />
    </span>
  );
};

/* ── Stagger-in wrapper (for grids) ── */
const StaggerGrid = ({ children, className = "" }) => {
  const [ref, vis] = useInView(0.05);
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          style: {
            ...child.props.style,
            transition: "all 0.6s cubic-bezier(.23,1,.32,1)",
            transitionDelay: `${i * 100}ms`,
            transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            opacity: vis ? 1 : 0,
          },
        })
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════ */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [ref, vis] = useInView(0.06);
  const transforms = {
    up: `translateY(${vis ? 0 : 28}px)`,
    down: `translateY(${vis ? 0 : -28}px)`,
    left: `translateX(${vis ? 0 : -40}px)`,
    right: `translateX(${vis ? 0 : 40}px)`,
    scale: `scale(${vis ? 1 : 0.9})`,
    none: "none",
  };
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transform: transforms[direction] || transforms.up }}>
      {children}
    </div>
  );
};

/* ── Character-by-character text reveal ── */
const TextRevealChar = ({ text, className = "", delay = 0 }) => {
  const [ref, vis] = useInView(0.2);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block transition-all duration-500" style={{
          transitionDelay: `${delay + i * 40}ms`,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0) rotate(0)" : "translateY(16px) rotate(4deg)",
          filter: vis ? "blur(0)" : "blur(3px)",
        }}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </span>
  );
};

/* ── Horizontal scrolling text band ── */
const MarqueeBand = ({ texts, logos, dark = false }) => (
  <div className={`overflow-hidden py-4 md:py-5 ${dark ? "bg-[#111]" : "bg-[#00BFA5]"} relative`}>
    <div className="flex items-center w-max animate-marquee-x">
      {[...(logos || []), ...(logos || []), ...(logos || []), ...(logos || []),
      ...(texts || []).map(t => ({ text: t })), ...(texts || []).map(t => ({ text: t })), ...(texts || []).map(t => ({ text: t })), ...(texts || []).map(t => ({ text: t }))
      ].map((item, i) => (
        item.src
          ? <img key={i} src={item.src} alt={item.alt || ""} className={`shrink-0 mx-8 md:mx-12 h-[24px] md:h-[32px] w-auto object-contain rounded ${dark ? "opacity-40 brightness-0 invert" : "opacity-60"}`} />
          : <span key={i} className={`shrink-0 mx-6 md:mx-10 text-[16px] md:text-[20px] font-black tracking-wider whitespace-nowrap ${dark ? "text-white/15" : "text-white/25"}`}>
            {item.text || item}
          </span>
      ))}
    </div>
  </div>
);

/* ── Number counter with clip animation ── */
const AnimatedNumber = ({ value, suffix, label }) => {
  const [ref, val] = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="overflow-hidden">
        <div className="font-en text-[36px] md:text-[50px] font-extrabold text-white leading-none tabular-nums" style={{ animation: "count-in .8s ease-out" }}>
          {val}<span className="text-[14px] text-[#00BFA5] ml-1 font-bold">{suffix}</span>
        </div>
      </div>
      <p className="text-[10px] text-white/40 font-semibold mt-2">{label}</p>
    </div>
  );
};

const LineBtn = ({ children, large }) => (
  <a href="#contact" className={`btn-ripple inline-flex items-center gap-2.5 bg-[#00BFA5] text-white font-bold rounded-full shadow-[0_4px_20px_rgba(0,191,165,.25)] hover:shadow-[0_8px_32px_rgba(0,191,165,.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ${large ? "px-10 py-4.5 text-[18px]" : "px-6 py-3 text-[13px]"}`}>
    <img src="/line-icon.png" alt="" className={`${large ? "w-6 h-6" : "w-5 h-5"} rounded-md`} />
    {children || "LINEで相談する"}
  </a>
);

const FloatingGeometricShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
    {/* Circle Outline */}
    <div className="absolute top-[10%] left-[5%] w-32 h-32 border-2 border-[#00BFA5] rounded-full animate-float-a" style={{ animationDuration: "25s" }} />
    {/* Triangle Outline */}
    <div className="absolute top-[60%] right-[10%] w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[60px] border-b-[#00BFA5] animate-float-b rotate-12 opacity-80" style={{ animationDuration: "30s" }} />
    {/* Square Outline */}
    <div className="absolute bottom-[20%] left-[15%] w-20 h-20 border-2 border-[#00BFA5] rotate-45 animate-drift-x opacity-60" style={{ animationDuration: "20s" }} />
    {/* Small Solid Circle */}
    <div className="absolute top-[40%] right-[20%] w-10 h-10 bg-[#00BFA5] rounded-full animate-drift-y opacity-40" style={{ animationDuration: "22s" }} />
    {/* Large Donut */}
    <div className="absolute top-[20%] left-[40%] w-24 h-24 border-[10px] border-[#00BFA5]/30 rounded-full animate-float-a" style={{ animationDuration: "35s" }} />
  </div>
);

/* ── 薄い英語背景テキスト ── */
const BgText = ({ children, light, dark }) => (
  <div className={`absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden ${dark ? "text-white/[0.06]" : light ? "text-black/[0.035]" : "text-black/[0.05]"
    }`}>
    <span className="font-en font-extrabold text-[100px] md:text-[180px] tracking-tighter whitespace-nowrap">{children}</span>
  </div>
);

/* ── Reusable wave SVG ── */
const WaveSvg = ({ fill = "#fff", flip = false }) => (
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`w-full block ${flip ? "rotate-180" : ""}`} style={{ height: "clamp(32px, 4vw, 60px)" }}>
    <path d="M0,40 C360,70 720,0 1080,30 C1260,45 1380,55 1440,40 L1440,60 L0,60 Z" fill={fill} />
  </svg>
);

/* ── Section heading with underline ── */
const SectionHead = ({ tag, children, sub, white }) => (
  <div className="text-center mb-8 md:mb-10">
    {tag && <span className={`section-tag mb-3 inline-block ${white ? "!bg-white/15 !text-white" : ""}`}>{tag}</span>}
    <h2 className={`font-display text-[24px] md:text-[34px] font-black leading-[1.45] heading-line tracking-tight ${white ? "text-white after:bg-white" : "text-black"}`}>{children}</h2>
    {sub && <p className={`text-[14px] leading-[1.9] mt-5 max-w-[500px] mx-auto ${white ? "text-white/60" : "text-black/40"}`}>{sub}</p>}
  </div>
);

/* ── Tall iPhone Mockup ── */
const TallPhone = ({ name, color, msgs, scale = 1, className = "" }) => {
  const [m1, m2, m3] = msgs || ["お知らせです✨", "ありがとう！", "ご確認ください📋"];
  const w = 110 * scale;
  const h = w * 2.16;
  const r = w * 0.22;
  const bezel = w * 0.025;
  return (
    <div className={`shrink-0 ${className}`} style={{ width: w, height: h, filter: `drop-shadow(0 ${4 * scale}px ${16 * scale}px rgba(0,0,0,.12))` }}>
      <div className="w-full h-full relative" style={{ borderRadius: r, background: "#1a1a1a", padding: bezel }}>
        <div className="w-full h-full overflow-hidden flex flex-col" style={{ borderRadius: r - bezel, background: "#fff" }}>
          <div className="flex items-center justify-center shrink-0" style={{ height: w * 0.15, background: "#fff" }}>
            <div style={{ width: w * 0.24, height: w * 0.065, background: "#1a1a1a", borderRadius: 999 }} />
          </div>
          <div className="shrink-0 flex items-center gap-1 px-2" style={{ height: w * 0.14, background: color || "#00BFA5" }}>
            <div className="rounded-full bg-white/30 flex items-center justify-center shrink-0" style={{ width: w * 0.085, height: w * 0.085 }}>
              <span className="text-white font-bold" style={{ fontSize: w * 0.04 }}>{(name || "V").charAt(0)}</span>
            </div>
            <span className="text-white font-bold truncate" style={{ fontSize: w * 0.058 }}>{name}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 px-1.5" style={{ background: "#E8ECF0", padding: `${w * 0.04}px ${w * 0.035}px` }}>
            <div className="flex items-end gap-0.5">
              <div className="rounded-full shrink-0" style={{ width: w * 0.06, height: w * 0.06, background: `${color}30` }} />
              <div className="rounded-lg rounded-bl-sm px-1.5 py-1 bg-white shadow-[0_0.5px_1px_rgba(0,0,0,.05)]" style={{ maxWidth: "82%", borderRadius: `${w * 0.04}px ${w * 0.04}px ${w * 0.04}px ${w * 0.01}px` }}>
                <p style={{ fontSize: w * 0.05, lineHeight: 1.5, color: "#1a1a1a" }}>{m1}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-1.5 py-1" style={{ maxWidth: "75%", borderRadius: `${w * 0.04}px ${w * 0.04}px ${w * 0.01}px ${w * 0.04}px`, background: color || "#00BFA5" }}>
                <p style={{ fontSize: w * 0.05, lineHeight: 1.5, color: "#fff" }}>{m2}</p>
              </div>
            </div>
            <div className="flex items-end gap-0.5">
              <div className="rounded-full shrink-0" style={{ width: w * 0.06, height: w * 0.06, background: `${color}30` }} />
              <div className="bg-white shadow-[0_0.5px_1px_rgba(0,0,0,.05)]" style={{ maxWidth: "85%", borderRadius: `${w * 0.04}px ${w * 0.04}px ${w * 0.04}px ${w * 0.01}px`, padding: `${w * 0.01}px ${w * 0.035}px` }}>
                <p style={{ fontSize: w * 0.05, lineHeight: 1.5, color: "#1a1a1a" }}>{m3}</p>
              </div>
            </div>
          </div>
          <div className="shrink-0 bg-white border-t border-black/5 flex items-center px-1.5 gap-1" style={{ height: w * 0.1 }}>
            <div className="rounded-full bg-[#007AFF] flex items-center justify-center" style={{ width: w * 0.06, height: w * 0.06 }}>
              <span className="text-white" style={{ fontSize: w * 0.035 }}>+</span>
            </div>
            <div className="flex-1 bg-[#F2F2F7] rounded-full" style={{ height: w * 0.05 }} />
          </div>
          <div className="shrink-0 bg-white flex items-center justify-center" style={{ height: w * 0.06 }}>
            <div className="bg-black/15 rounded-full" style={{ width: w * 0.28, height: w * 0.025 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════ */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const links = [{ l: "導入実績", h: "#works" }, { l: "サービス", h: "#service" }, { l: "成果事例", h: "#results" }, { l: "会社概要", h: "#about" }, { l: "お問合せ", h: "#contact" }];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-md ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,.06)]" : ""}`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between overflow-visible">
          <a href="#" className="relative z-10 flex items-center">
            <img src="/logo.png" alt="VOYAGE" className="h-[30px] md:h-[34px] w-auto transition-all duration-500 object-contain" />
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(n => <a key={n.l} href={n.h} className="text-[12px] font-semibold tracking-wide transition-colors text-black/50 hover:text-black">{n.l}</a>)}
            <LineBtn>無料相談</LineBtn>
          </nav>
          <button onClick={() => setOpen(true)} className="lg:hidden"><Menu size={22} className="text-black" /></button>
        </div>
      </header>
      <div className={`fixed inset-0 bg-white z-[60] transition-all duration-500 flex flex-col ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex justify-end p-5"><button onClick={() => setOpen(false)}><X size={22} className="text-black" /></button></div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-7">
          {links.map(n => <a key={n.l} href={n.h} onClick={() => setOpen(false)} className="text-lg font-bold text-black/70">{n.l}</a>)}
          <div className="mt-4" onClick={() => setOpen(false)}><LineBtn large>LINEで相談する</LineBtn></div>
        </nav>
      </div>
    </>
  );
};

/* ── Seamless infinite scroll column (JS-driven, no CSS animation jump) ── */
const ScrollColumn = ({ imgs, speed, delay, direction }) => {
  const trackRef = useRef(null);
  const firstRef = useRef(null);
  const offsetRef = useRef(0);
  const startedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (firstRef.current && firstRef.current.offsetHeight > 0) {
        setReady(true);
      }
    };
    const imgEls = firstRef.current?.querySelectorAll("img") || [];
    let loaded = 0;
    const onLoad = () => { loaded++; if (loaded >= imgEls.length) measure(); };
    imgEls.forEach(img => { if (img.complete) onLoad(); else img.addEventListener("load", onLoad); });
    const t = setTimeout(measure, 2500);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    if (!ready || startedRef.current) return;
    startedRef.current = true;
    const pxPerSec = (firstRef.current?.offsetHeight || 600) / speed;
    const dir = direction === "up" ? -1 : 1;
    let last = 0;
    // Negative delay → start partway through
    offsetRef.current = dir * (delay < 0 ? Math.abs(delay) * pxPerSec : 0);

    const tick = (ts) => {
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      offsetRef.current += dir * pxPerSec * dt;
      const setH = firstRef.current?.offsetHeight || 600;
      // Wrap seamlessly
      if (direction === "up" && offsetRef.current <= -setH) offsetRef.current += setH;
      if (direction === "down" && offsetRef.current >= 0) offsetRef.current -= setH;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateY(${offsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    // Start with correct initial offset for "down" direction
    if (direction === "down") {
      offsetRef.current = -(firstRef.current?.offsetHeight || 600) + (delay < 0 ? Math.abs(delay) * pxPerSec : 0);
    }
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, speed, delay, direction]);

  return (
    <div className="shrink-0 overflow-hidden" style={{ width: "clamp(150px, 20vw, 240px)" }}>
      <div ref={trackRef} className="flex flex-col will-change-transform">
        {/* First set — measured */}
        <div ref={firstRef} className="flex flex-col shrink-0">
          {imgs.map((src, i) => (
            <div key={i} className="shrink-0 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] mb-3 md:mb-4">
              <img src={src} alt="" className="w-full h-auto block" />
            </div>
          ))}
        </div>
        {/* Duplicate for seamless wrap */}
        <div className="flex flex-col shrink-0">
          {imgs.map((src, i) => (
            <div key={`d${i}`} className="shrink-0 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] mb-3 md:mb-4">
              <img src={src} alt="" className="w-full h-auto block" />
            </div>
          ))}
        </div>
        {/* Third copy for extra coverage */}
        <div className="flex flex-col shrink-0">
          {imgs.map((src, i) => (
            <div key={`t${i}`} className="shrink-0 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.08)] mb-3 md:mb-4">
              <img src={src} alt="" className="w-full h-auto block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  const show = () => `transition-all duration-[1000ms] ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;
  const heroRef = useRef(null);
  const bgY = useParallax(heroRef, 0.2);

  /* Creative images — displayed as cards in alternating up/down scrolling columns */
  /* Creative images — 1 to 31, excluding removed ones */
  const cols = useMemo(() => {
    const exclude = [8, 9, 12, 15];
    const all = Array.from({ length: 31 }, (_, i) => i + 1)
      .filter(n => !exclude.includes(n))
      .map(n => `/creative-${n}.png`);

    // Fisher-Yates shuffle with multiple passes for better randomness
    for (let k = 0; k < 3; k++) {
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
    }

    // Distribute into 3 columns with distinct speeds to prevent sync
    const chunkOverride = Math.ceil(all.length / 3);
    return [
      { imgs: all.slice(0, chunkOverride), speed: 25, delay: 0 },
      { imgs: all.slice(chunkOverride, chunkOverride * 2), speed: 45, delay: -8 },
      { imgs: all.slice(chunkOverride * 2), speed: 35, delay: -15 },
    ];
  }, []);

  return (
    <section ref={heroRef} className="relative flex flex-col justify-center overflow-hidden bg-white">
      <div className="grain-overlay z-[1]" aria-hidden="true" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-[#00BFA5]/[.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[35%] aspect-square rounded-full bg-[#00BFA5]/[.03] blur-[100px] pointer-events-none" />

      {/* Alternating up/down scrolling creative columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-0 w-[58%] bottom-[-15%] flex gap-4 md:gap-5" style={{ transform: "rotate(-8deg)", transformOrigin: "top right" }}>
          {cols.map((col, ci) => {
            const direction = ci % 2 === 0 ? "up" : "down";
            return <ScrollColumn key={ci} imgs={col.imgs} speed={col.speed} delay={col.delay} direction={direction} />;
          })}
        </div>
      </div>
      {/* Fade overlays - 参考: ぼかし背景＋淡いグレーグラデーション */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5f6f5]/70 via-transparent to-transparent" style={{ height: "50%" }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-white/85 to-white/20" style={{ width: "55%" }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-white/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white" />


      <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-8 w-full pt-20 pb-8 md:pt-24 md:pb-10">
        <div>
          <div className="max-w-[660px]">
            {/* Main Copy */}
            <div className={show()} style={{ transitionDelay: "400ms" }}>
              <h1 className="leading-none font-display mt-4 md:mt-5">
                <span className="block font-black tracking-tight text-[#333]">
                  <span className="inline-block text-[56px] md:text-[90px] lg:text-[100px] text-[#00BFA5] text-shimmer -mb-2 md:-mb-4 tracking-tight">LINE</span>
                  <span className="inline-block text-[28px] md:text-[42px] lg:text-[48px] ml-1 md:ml-2">活用で、</span>
                  <br />
                  <span className="inline-block text-[42px] md:text-[72px] lg:text-[84px] bg-clip-text text-transparent bg-gradient-to-r from-[#00BFA5] to-[#2A9D8F] pb-2">事業成長</span>
                  <span className="inline-block text-[28px] md:text-[42px] lg:text-[48px] ml-1 md:ml-2">を</span>
                  <br className="hidden md:block" />
                  <span className="inline-block text-[42px] md:text-[72px] lg:text-[84px]">加速させる。</span>
                </span>
              </h1>
            </div>
            {/* Sub Copy */}
            <div className={show()} style={{ transitionDelay: "600ms" }}>
              <p className="text-black/75 text-[15px] md:text-[18px] leading-[1.8] md:leading-[1.9] mt-6 md:mt-8 max-w-[560px] font-medium">
                200アカウント以上のご支援から得た知見で、<br className="hidden md:block" />
                企業の「採用」と「売上」を最大化するLINEソリューション。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CLIENT SHOWCASE — white bg
   ═══════════════════════════════════════════════════════════ */
const ClientShowcase = () => {
  const PhoneMockup = ({ c }) => (
    <div className="relative w-[70px] md:w-[100px] shrink-0">
      <div className="relative bg-[#1a1a1a] rounded-[14px] md:rounded-[18px] p-[3px] md:p-[4px] shadow-[0_12px_40px_rgba(0,0,0,.25)]">
        {/* Notch */}
        <div className="absolute top-[3px] md:top-[4px] left-1/2 -translate-x-1/2 w-[24px] md:w-[32px] h-[8px] md:h-[10px] bg-[#1a1a1a] rounded-b-lg z-10" />
        {/* Screen */}
        <div className="relative bg-[#f5f5f5] rounded-[11px] md:rounded-[14px] overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
          {/* Status bar placeholder */}
          <div className="h-[14px] md:h-[18px] bg-white" />

          {c.screenImage ? (
            <div className={`absolute inset-0 top-[14px] md:top-[18px] bg-white px-1 flex items-center justify-center`}>
              <img src={c.screenImage} alt="Screen Preview" className={`w-full h-full ${c.imgFit === "contain" ? "object-contain" : "object-cover object-top"}`} />
            </div>
          ) : (
            <>
              {/* LINE-style header */}
              <div className="bg-[#00BFA5] px-2 py-1 md:py-1.5 flex items-center gap-1">
                <div className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bg-white/30" />
                <div className="w-[28px] md:w-[36px] h-[4px] md:h-[5px] bg-white/50 rounded-full" />
              </div>
              {/* Chat placeholder */}
              <div className="p-1.5 md:p-2 space-y-1.5 md:space-y-2">
                <div className="flex gap-1">
                  <div className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-full bg-gray-300 shrink-0 mt-0.5" />
                  <div className="bg-white rounded-lg rounded-tl-sm px-1.5 py-1 md:px-2 md:py-1.5 shadow-sm max-w-[80%]">
                    <div className="w-[24px] md:w-[32px] h-[3px] md:h-[4px] bg-gray-200 rounded-full" />
                    <div className="w-[16px] md:w-[22px] h-[3px] md:h-[4px] bg-gray-200 rounded-full mt-1" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#00BFA5]/15 rounded-lg rounded-tr-sm px-1.5 py-1 md:px-2 md:py-1.5 max-w-[75%]">
                    <div className="w-[20px] md:w-[28px] h-[3px] md:h-[4px] bg-[#00BFA5]/30 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-full bg-gray-300 shrink-0 mt-0.5" />
                  <div className="bg-white rounded-lg rounded-tl-sm px-1.5 py-1 md:px-2 md:py-1.5 shadow-sm max-w-[85%]">
                    <div className="w-[28px] md:w-[36px] h-[3px] md:h-[4px] bg-gray-200 rounded-full" />
                    <div className="w-[20px] md:w-[26px] h-[3px] md:h-[4px] bg-gray-200 rounded-full mt-1" />
                    <div className="w-[14px] md:w-[18px] h-[3px] md:h-[4px] bg-gray-200 rounded-full mt-1" />
                  </div>
                </div>
              </div>
              {/* Rich menu placeholder */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-1 md:p-1.5">
                <div className="grid grid-cols-2 gap-0.5 md:gap-1">
                  <div className="bg-gray-100 rounded h-[12px] md:h-[16px]" />
                  <div className="bg-gray-100 rounded h-[12px] md:h-[16px]" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const ClientCard = ({ c }) => (
    <div className="shrink-0 w-[280px] md:w-[480px] group relative mx-2 md:mx-4">
      {/* バナー背景 — フル幅 */}
      <div className="relative w-full h-[160px] md:h-[280px] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,.10)] transition-all duration-500">
        {c.logo ? (
          <div className="w-full h-full overflow-hidden bg-white flex items-center justify-center">
            <img src={c.logo} alt={c.name} className={`w-full h-full ${c.fill ? "object-cover" : "object-contain"} group-hover:scale-105 transition-transform duration-500`} style={c.scale ? { transform: `scale(${c.scale})` } : undefined} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}>
            <span className="text-white font-black font-en text-[18px] md:text-[28px] tracking-wide text-center px-6">{c.name}</span>
          </div>
        )}

      </div>
    </div>
  );

  return (
    <section id="works" className="py-14 md:py-20 overflow-hidden bg-white relative">
      <div className="absolute top-[5%] right-[-3%] w-[15%] aspect-square rounded-full bg-[#00BFA5]/[.03] pointer-events-none animate-drift-y" />
      <div className="absolute bottom-[10%] left-[-4%] w-[12%] aspect-square rounded-full bg-[#00BFA5]/[.04] pointer-events-none animate-drift-x" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mb-8">
        <Reveal>
          <SectionHead>LINE運用の実績多数</SectionHead>
        </Reveal>
      </div>
      <div className="overflow-hidden">
        <div className="flex w-max animate-card-left pause-on-hover py-4">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <ClientCard key={`a${i}`} c={c} chat={HERO_CHATS[i % HERO_CHATS.length]} />
          ))}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-5 text-center">
        <Reveal>
          <a href="#results" className="inline-flex items-center gap-2.5 text-[15px] md:text-[16px] font-bold text-[#00BFA5] hover:underline">
            実績を見る <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAIN POINTS — LINEトーク画面風
   ═══════════════════════════════════════════════════════════ */
const PainPoints = () => {
  const times = ["14:02", "14:05", "14:12", "14:18"];
  return (
    <section className="relative bg-[#e0f5f2] pt-8 pb-10 md:pt-10 md:pb-14 overflow-hidden">
      <div className="absolute inset-0 diagonal-pattern pointer-events-none" />
      <FloatingGeometricShapes />
      <WaveSvg fill="#e0f5f2" />
      <FloatingParticles count={8} />
      <div className="w-full max-w-[540px] mx-auto px-4 relative z-10">
        <Reveal>
          <SectionHead>こんなお悩みはありませんか？</SectionHead>
        </Reveal>

        {/* LINE風トーク画面 */}
        <Reveal delay={100}>
          <div className="mt-6 md:mt-8 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,.12)] border-[6px] md:border-[8px] border-[#1a1a1a] bg-[#1a1a1a]">
            {/* ノッチ */}
            <div className="flex justify-center pt-1 pb-0 bg-[#1a1a1a]">
              <div className="w-[80px] md:w-[100px] h-[18px] md:h-[22px] bg-[#1a1a1a] rounded-b-2xl" />
            </div>

            {/* LINEヘッダー */}
            <div className="bg-[#00BFA5] px-4 py-2.5 md:py-3 flex items-center gap-3">
              <ChevronLeft size={20} className="text-white/70" />
              <div className="flex-1 text-center">
                <p className="text-white font-bold text-[13px] md:text-[14px]">お悩み相談室</p>
              </div>
              <div className="w-5" />
            </div>

            {/* トーク本体 */}
            <div className="bg-[#7ECEC4] px-3 py-4 md:px-4 md:py-5 space-y-4 md:space-y-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='.02'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}>
              {PAINS.map((pain, i) => {
                const pyokoAnims = ["animate-pyoko-bounce", "animate-pyoko-tilt", "animate-pyoko-pulse", "animate-pyoko-swing"];
                const pyokoClass = pyokoAnims[i % pyokoAnims.length];

                return (
                  <div key={i} className="flex items-start gap-2.5 md:gap-3.5">
                    {/* アイコン - ぴょこぴょこ動く演出を追加 */}
                    <PopIn delay={i * 200}>
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md ${pyokoClass}`} style={{ animationDelay: `${i * 0.3}s` }}>
                        <img src={pain.img} alt="" className="w-full h-full object-cover" />
                      </div>
                    </PopIn>

                    <div className="flex-1 min-w-0">

                      {/* 名前 - 視認性を最大化（不透明度100%） */}
                      <PopIn delay={i * 200 + 100}>
                        <p className="text-[14px] md:text-[16px] text-[#333] font-black mb-1.5 ml-1 drop-shadow-sm">
                          {pain.audience}
                        </p>
                      </PopIn>

                      {/* 吹き出し（相手メッセージ） */}
                      <PopIn delay={i * 200 + 200} direction="scale">
                        <div className="flex items-end gap-2">
                          <div className="relative bg-white rounded-[20px] rounded-tl-md px-4 py-3 md:px-5 md:py-4 shadow-[0_4px_16px_rgba(0,0,0,.1)] max-w-[90%] border border-black/10 hover:scale-[1.02] transition-transform duration-300">
                            {/* 吹き出しの尾 */}
                            <div className="absolute -left-[7px] top-[12px] w-0 h-0" style={{ borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "8px solid white" }} />

                            {/* キーワード - 不透明度100% */}
                            <p className="text-[16px] md:text-[18px] font-black text-[#000] leading-[1.4] mb-1.5 tracking-tight group-hover:text-[#00BFA5] transition-colors">
                              {pain.keyword}
                            </p>

                            {/* 本文 - 不透明度100%で読みやすく */}
                            <p className="text-[13px] md:text-[16px] text-[#444] leading-[1.7] font-bold">
                              {pain.text}
                            </p>
                          </div>
                          <span className="text-[10px] md:text-[11px] text-black/50 shrink-0 pb-1 font-bold">{times[i]}</span>
                        </div>
                      </PopIn>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* 入力バー */}
            <div className="bg-[#efefef] px-3 py-2 md:py-2.5 flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#54B8AB] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[14px] md:text-[16px]">+</span>
              </div>
              <div className="flex-1 bg-white rounded-full px-3 py-1.5 md:py-2">
                <span className="text-[11px] md:text-[12px] text-black/25">メッセージを入力</span>
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#54B8AB] flex items-center justify-center shrink-0">
                <Send size={13} className="text-white" />
              </div>
            </div>

            {/* ホームバー */}
            <div className="flex justify-center py-1.5 bg-[#1a1a1a]">
              <div className="w-[100px] md:w-[120px] h-[4px] bg-white/30 rounded-full" />
            </div>
          </div>
        </Reveal>
      </div >
    </section >
  );
};

/* ═══════════════════════════════════════════════════════════
   GREEN BANNER
   ═══════════════════════════════════════════════════════════ */
const GreenBanner = ({ children }) => (
  <div className="bg-[#00BFA5] py-6 md:py-7 text-center relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-white rounded-full blur-[80px] translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[40%] h-full bg-white rounded-full blur-[60px] -translate-x-1/4 animate-drift-x" />
    </div>
    <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-15" />
    <div className="absolute top-[30%] left-[5%] w-1.5 h-1.5 rounded-full bg-white/25 pointer-events-none animate-float-a" />
    <div className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full bg-white/15 pointer-events-none animate-float-b" />
    <p className="text-white text-[17px] md:text-[22px] font-bold leading-[1.6] px-5 relative z-10">{children}</p>
  </div>
);

/* ── Chevron Section Divider (LP style) ── */
const ChevronDivider = ({ headline, sub, body }) => {
  const secRef = useRef(null);
  const progress = useScrollProgress(secRef, { start: 1.0, end: 0.2 });
  return (
    <div className="relative" ref={secRef}>
      {/* Top chevron pointing down */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginBottom: -1 }}>
        <path d="M0,0 L720,60 L1440,0 L1440,0 L0,0 Z" fill="#e0f5f2" />
        <path d="M0,0 L720,60 L1440,0 L1440,60 L720,60 L0,60 Z" fill="#00BFA5" />
      </svg>
      {/* Main body */}
      <div className="relative overflow-hidden bg-[#00BFA5]">
        {/* Decorative */}
        <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-10" />
        <div className="absolute top-[-20%] right-[-10%] w-[40%] aspect-square rounded-full bg-white/[.06] blur-[60px] pointer-events-none animate-drift-x" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[30%] aspect-square rounded-full bg-white/[.05] blur-[50px] pointer-events-none animate-drift-y" />
        <FloatingParticles count={5} color="rgba(255,255,255," />

        <div className="max-w-[640px] mx-auto px-4 md:px-8 py-8 md:py-14 text-center relative z-10">
          {sub && <p className="text-white/80 text-[16px] md:text-[26px] font-bold mb-3 md:mb-4 transition-all duration-500" style={{ transform: `translateY(${(1 - progress) * 20}px)`, opacity: Math.min(progress * 2, 1) }}>{sub}</p>}
          <h2 className="text-[24px] md:text-[44px] font-black text-white leading-[1.35] md:leading-[1.4] mb-4 md:mb-5 transition-all duration-500" style={{ transform: `translateY(${(1 - progress) * 30}px) scale(${0.9 + progress * 0.1})`, opacity: Math.min(progress * 1.5, 1) }}>
            {headline}
          </h2>
          {body && (
            <Reveal delay={100}>
              <p className="text-[12px] md:text-[15px] text-white/75 leading-[1.9] md:leading-[2] max-w-[500px] mx-auto mt-4 md:mt-5">{body}</p>
            </Reveal>
          )}
        </div>
      </div>
      {/* Bottom chevron pointing down */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginTop: -1 }}>
        <path d="M0,0 L1440,0 L720,60 Z" fill="#00BFA5" />
        <path d="M0,60 L720,60 L1440,60 L1440,0 L720,60 L0,0 Z" fill="#e0f5f2" />
      </svg>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MARKET DATA — CSS infographic cards
   ═══════════════════════════════════════════════════════════ */
const MARKET_ITEMS = [
  { num: "9,700", unit: "万人", pct: 80, tag: "USERS", title: "日本人口の8割に届く", desc: "YouTube・Xを超える国内最大のプラットフォーム。あなたの顧客は、すでにLINEの中にいます。", compare: [{ label: "LINE", value: 80 }, { label: "YouTube", value: 58 }, { label: "X", value: 37 }] },
  { num: "80", unit: "%", pct: 80, tag: "OPEN RATE", title: "配信当日の開封率", desc: "メルマガの平均開封率15〜20%と比べて圧倒的。メッセージは顧客のポケットに直接届きます。", compare: [{ label: "LINE", value: 80 }, { label: "メルマガ", value: 18 }] },
  { num: "99.2", unit: "%", pct: 99, tag: "STUDENTS", title: "学生のLINE利用率", desc: "電話に出ない若者もLINEなら即レス。新卒採用における最強のタッチポイント。", compare: [{ label: "LINE", value: 99 }, { label: "電話", value: 42 }, { label: "メール", value: 30 }] },
  { num: "∞", unit: "", pct: 100, tag: "ASSET", title: "友だち＝自社資産", desc: "Web広告と異なり、集めた友だちは「自社資産」として残り続け、採用・販促コストを中長期的に下げ続けます。", compare: null },
];

const BarChart = ({ items, compact }) => {
  const [ref, vis] = useInView(0.3);
  return (
    <div ref={ref} className={`w-full ${compact ? "space-y-2 mt-2" : "space-y-3 mt-4"}`}>
      {items.map((item, i) => (
        <div key={i} className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
          <span className={`font-bold text-black/50 shrink-0 text-right ${compact ? "text-[10px] w-[48px]" : "text-[12px] w-[60px]"}`}>{item.label}</span>
          <div className={`flex-1 bg-black/[.06] rounded-full overflow-hidden relative ${compact ? "h-[14px]" : "h-[22px]"}`}>
            <div
              className="h-full rounded-full transition-all ease-out relative overflow-hidden"
              style={{
                width: vis ? `${item.value}%` : "0%",
                background: i === 0 ? "linear-gradient(90deg, #00BFA5, #38d9a9)" : "#ccc",
                transitionDuration: "1.4s",
                transitionDelay: `${i * 250 + 200}ms`,
              }}
            >
              {/* shimmer sweep */}
              {i === 0 && vis && <div className="absolute inset-0" style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%)",
                animation: "shimmer-line 1.8s ease-out 1.2s both",
              }} />}
            </div>
            <span className={`absolute top-1/2 -translate-y-1/2 font-bold transition-opacity duration-500 ${compact ? "text-[9px] right-2" : "text-[11px] right-3"} ${i === 0 ? "text-white" : "text-black/40"}`} style={{ opacity: vis ? 1 : 0, transitionDelay: `${i * 250 + 800}ms` }}>{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const CircleRing = ({ pct }) => {
  const r = 54, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 128 128" className="w-[60px] md:w-[72px] shrink-0">
      <circle cx="64" cy="64" r={r} fill="none" stroke="#e0f5f2" strokeWidth="10" />
      <circle cx="64" cy="64" r={r} fill="none" stroke="#00BFA5" strokeWidth="10"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 64 64)" className="transition-all duration-1000" />
    </svg>
  );
};

const MARKET_STATS = [
  { num: "9,700", unit: "万人", tag: "REACH", label: "日本人口の8割に届く", desc: "YouTube・Xを超える国内最大のプラットフォーム", compare: [{ label: "LINE", value: 80 }, { label: "YouTube", value: 58 }, { label: "X", value: 37 }] },
  { num: "80", unit: "%", tag: "OPEN RATE", label: "配信当日の開封率", desc: "メールの約4倍。顧客のポケットに直接届く", compare: [{ label: "LINE", value: 80 }, { label: "メール", value: 18 }] },
  { num: "99.2", unit: "%", tag: "STUDENTS", label: "学生のLINE利用率", desc: "メールの返信がない若者もLINEなら即レス", compare: [{ label: "LINE", value: 99 }, { label: "電話", value: 42 }, { label: "メール", value: 30 }] },
];

const MarketData = () => (
  <section className="py-12 md:py-16 bg-[#e0f5f2] relative overflow-hidden">
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
      <Reveal>
        <h2 className="text-[20px] md:text-[26px] font-bold text-black/85 mb-12 md:mb-14">
          なぜ今、<span className="text-[#00BFA5]">LINE</span>なのか
        </h2>
      </Reveal>

      {/* 数字のみ大きく — グラフなし */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {MARKET_STATS.map((s, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="text-center md:text-left">
              <span className="text-[9px] font-medium text-black/35 tracking-[0.2em] font-en uppercase">{s.tag}</span>
              <div className="flex items-baseline gap-1 mt-1 justify-center md:justify-start">
                <span className="font-en text-[56px] md:text-[72px] font-bold text-[#00BFA5] leading-[0.95] tabular-nums">{s.num}</span>
                <span className="text-[20px] font-semibold text-black/35">{s.unit}</span>
              </div>
              <p className="text-[15px] font-semibold text-black/85 mt-2">{s.label}</p>
              <p className="text-[13px] text-black/45 leading-[1.7] mt-2">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 資産メッセージ — 中央揃え & 強調演出を追加 */}
      <div className="mt-16 md:mt-24 pt-10 md:pt-12 text-center relative">
        {/* 装飾用背景文字 - 透過 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] md:text-[140px] font-black text-[#00BFA5]/5 pointer-events-none whitespace-nowrap select-none italic">
          LINE ASSET
        </div>

        <div className="relative z-10 space-y-4 md:space-y-6">
          <PopIn delay={100} direction="up">
            <h3 className="text-[26px] md:text-[42px] font-black leading-[1.2] text-black/90">
              <span className="text-[#00BFA5] text-shimmer">LINE</span>は
              <span className="inline-block hover-lift cursor-default">ずっと残り続ける</span>
              <span className="text-[#00BFA5] relative inline-block mx-1">
                資産
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#00BFA5]/30 rounded-full animate-underline-grow" />
              </span>
              です。
            </h3>
          </PopIn>

          <PopIn delay={400} direction="up">
            <p className="text-[14px] md:text-[18px] text-black/50 font-medium max-w-[600px] mx-auto leading-[1.8]">
              広告やエージェントは止めれば流入がゼロに。<br className="hidden md:block" />
              だからこそ、<span className="text-black/80 font-bold border-b-2 border-[#00BFA5]/40 pb-0.5">LINEで蓄積する資産を。</span>
            </p>
          </PopIn>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   YOUTUBE — light green bg
   ═══════════════════════════════════════════════════════════ */
const YOUTUBE_VIDEOS = [
  { id: "qOIuvPrF2TY", title: "代表 千葉瑛太が語るLINEを活用した採用支援" },
  { id: "XvAlNS3MBp8", title: "VOYAGE サービス紹介" },
];

const YouTubeSection = () => (
  <section className="relative bg-[#e0f5f2] pt-6 pb-14 md:pt-8 md:pb-16 overflow-hidden">
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
      <Reveal>
        <div className="text-center mb-6">
          <span className="text-[20px] md:text-[28px] font-black text-[#00BFA5] tracking-wider font-en mb-3 inline-block">MEDIA</span>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {YOUTUBE_VIDEOS.map((v, i) => (
          <Reveal key={v.id} delay={i * 120}>
            <div>
              <p className="text-[14px] md:text-[16px] font-bold text-black mb-3 md:mb-4 text-center">{v.title}</p>
              <div className="rounded-2xl overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,.10)]">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   BACKSTAGE GROUP
   ═══════════════════════════════════════════════════════════ */
const BackstageGroup = () => {
  const wrapRef = useRef(null);
  const progress = useScrollProgress(wrapRef, { start: 1.0, end: 0.0 });
  const imgScale = 1 + progress * 0.05;

  return (
    <section id="about" className="bg-[#e0f5f2] relative overflow-hidden w-full">
      {/* 写真 → グラデーションで背景に馴染む → 中央に輝く実績オーバーレイ */}
      <div ref={wrapRef} className="relative w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden flex flex-col">
        {/* 画像エリア — 写真の縦横比に合わせて高さを決定 */}
        <div className="relative w-full aspect-[16/9] bg-[#e0f5f2] overflow-hidden">
          <img
            src="/backstage-v2.png" alt="BACKSTAGE Group"
            className="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-100"
            style={{ transform: `scale(${imgScale})`, objectPosition: "center 60%" }}
            loading="lazy"
          />
          {/* 上下にグラデーション — YouTubeSection/Leadershipの背景色に合わせる */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(232,245,233,1) 0%, rgba(232,245,233,.5) 10%, transparent 22%, transparent 68%, rgba(255,255,255,.6) 80%, rgba(255,255,255,1) 88%)" }}
          />

          {/* 実績オーバーレイ — 中央配置 */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Reveal>
              <div className="bg-white rounded-[32px] md:rounded-[48px] px-6 py-10 md:px-20 md:py-16 text-center shadow-[0_24px_80px_rgba(0,0,0,0.15)] border border-black/[.06] w-fit max-w-[95%] md:max-w-[1000px]">
                <h2 className="text-[20px] md:text-[40px] font-black text-black mb-6 md:mb-10 leading-[1.3] tracking-tight">
                  国内NO.1の影響力をもつ<br />
                  <span className="md:whitespace-nowrap"><span className="text-[#00BFA5]">BACKSTAGE Group</span>の採用・マーケを担当</span>
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
                  <div className="hover-lift transition-transform duration-300">
                    <BigNumber end={180} suffix="億円超" label="累計資金調達額" />
                  </div>
                  <div className="hidden md:block w-px h-12 bg-black/10" />
                  <div className="hover-lift transition-transform duration-300">
                    <BigNumber end={5} suffix="億回超" label="月間動画再生数" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   LEADERSHIP — 切り替え形式
   ═══════════════════════════════════════════════════════════ */
const LEADERS = [
  { img: "/ceo-chiba-v3.png", name: "千葉 瑛太", title: "代表取締役", desc: "累計200社以上の支援実績を持ち、年間数億円規模のマーケティング予算を統括。グループの事業成長を採用支援の側面から牽引。" },
  { img: "/ceo-mizoguchi-v3.png", name: "溝口 勇児", title: "監修 / 共同代表", desc: "BACKSTAGE Inc. 代表取締役。FiNC創業者。累計180億円超の資金調達を実現。", imgScale: 1.3 },
];

const Leadership = () => (
  <section className="relative bg-white py-14 md:py-20 overflow-hidden">
    <div className="absolute top-[10%] left-[-5%] w-[25%] aspect-square rounded-full bg-[#00BFA5]/[.03] pointer-events-none" />
    <div className="relative z-10 max-w-[900px] mx-auto px-4 md:px-8">
      <Reveal>
        <SectionHead>経営陣</SectionHead>
      </Reveal>
      <div className="space-y-10 md:space-y-14">
        {LEADERS.map((l, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-5 md:gap-10`}>
              <div className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] shrink-0 rounded-full overflow-hidden ring-4 ring-[#00BFA5]/10">
                <img src={l.img} alt={l.name} className="w-full h-full object-cover" style={{ objectPosition: "center 15%", transform: l.imgScale ? `scale(${l.imgScale})` : undefined }} loading="lazy" />
              </div>
              <div className={`flex-1 min-w-0 text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                <p className="text-[11px] md:text-[12px] text-[#00BFA5] font-bold tracking-widest uppercase mb-1">{l.title}</p>
                <h3 className="text-[22px] md:text-[28px] font-bold text-black/90 mb-3 tracking-tight">{l.name}</h3>
                <p className="text-[13px] md:text-[15px] text-black/50 leading-[1.85] md:leading-[1.9]">{l.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   SERVICE — バナーLP導線
   ═══════════════════════════════════════════════════════════ */
const SERVICE_BANNERS = [
  {
    logo: "/logo-riquel.png",
    logoAlt: "リクエル",
    logoH: "h-[44px] md:h-[64px]",
    tag: "",
    headline: <>LINE×採用で<br />歩留まりを劇的改善</>,
    desc: "エントリーから内定承諾までをLINEで自動化・最適化。\n面談予約率を最大6倍に改善した実績あり。",
    accent: "#00BFA5",
    bgFrom: "#00BFA5",
    bgTo: "#0CADA8",
    stripe: "#009E89",
    href: "#",
  },
  {
    logo: "/logo-lacademia.png",
    logoAlt: "L-ACADEMIA",
    logoH: "h-[44px] md:h-[64px]",
    tag: "",
    headline: <>200社超のノウハウを<br className="md:hidden" />習得</>,
    desc: "未経験からプロレベルのLINEマーケスキルを習得。",
    accent: "#0CADA8",
    bgFrom: "#0CADA8",
    bgTo: "#38BCD8",
    stripe: "#009DB5",
    href: "#",
  },
];

const Service = () => (
  <section id="service" className="py-14 md:py-20 bg-white relative overflow-hidden">
    <div className="absolute inset-0 circle-ring-pattern pointer-events-none" />
    <div className="absolute top-[10%] left-[-5%] w-[25%] aspect-square rounded-full bg-[#00BFA5]/[.03] pointer-events-none animate-drift-y" />
    <div className="absolute bottom-[5%] right-[-6%] w-[20%] aspect-square rounded-full bg-[#00BFA5]/[.04] pointer-events-none animate-drift-x" />
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative z-10">
      <Reveal>
        <SectionHead>サービス内容</SectionHead>
      </Reveal>

      <div className="space-y-5 md:space-y-6">
        {SERVICE_BANNERS.map((s, i) => (
          <Reveal key={i} delay={i * 120}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,.15)] hover:-translate-y-1 transition-all duration-400"
            >
              {/* Background */}
              <div className="relative px-6 py-7 md:px-10 md:py-10 h-[200px] md:h-[220px] flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${s.bgFrom}, ${s.bgTo})` }}>
                {/* Diagonal stripes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08]">
                  {[...Array(16)].map((_, j) => (
                    <div key={j} className="absolute h-[200%] w-[30px] md:w-[50px] bg-white -rotate-[25deg]" style={{ left: `${j * 80 - 40}px`, top: "-50%" }} />
                  ))}
                </div>

                {/* Content — horizontal layout */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                  {/* Left: Text */}
                  <div className="flex-1 min-w-0">
                    {s.tag && <span className="inline-block text-[10px] md:text-[11px] font-bold text-white/70 tracking-wider mb-2 md:mb-3">{s.tag}</span>}
                    <h3 className="text-[20px] md:text-[28px] font-black text-white leading-[1.4] md:leading-[1.45] mb-2 md:mb-3">
                      {s.headline}
                    </h3>
                    <p className="text-[12px] md:text-[14px] text-white/70 leading-[1.7] max-w-[480px] whitespace-pre-line">{s.desc}</p>
                  </div>

                  {/* Right: Logo + Arrow */}
                  <div className="flex items-center gap-4 md:gap-6 shrink-0">
                    <div className="bg-white rounded-xl px-5 py-3 md:px-6 md:py-4 shadow-[0_4px_16px_rgba(0,0,0,.1)]">
                      <img src={s.logo} alt={s.logoAlt} className={`${s.logoH} w-auto object-contain`} loading="lazy" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <ArrowRight size={20} className="text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════════════════════ */
const CTABanner = () => (
  <div className="relative">
    {/* Top chevron */}
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginBottom: -1 }}>
      <path d="M0,0 L720,60 L1440,0 L1440,0 L0,0 Z" fill="#fff" />
      <path d="M0,0 L720,60 L1440,0 L1440,60 L720,60 L0,60 Z" fill="#00BFA5" />
    </svg>
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #00BFA5 0%, #0CADA8 50%, #18B5C0 100%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 animate-drift-x" />
      </div>
      <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-15" />
      <div className="absolute top-[25%] left-[6%] w-2 h-2 rounded-full bg-white/20 pointer-events-none animate-float-a" />
      <div className="absolute bottom-[30%] right-[10%] w-2.5 h-2.5 rounded-full bg-white/15 pointer-events-none animate-float-b" />
      <div className="max-w-[700px] mx-auto px-4 md:px-8 py-12 md:py-20 text-center relative z-10">
        <Reveal>
          <p className="text-white text-[22px] md:text-[32px] font-black leading-[1.6] md:leading-[1.7] mb-6 md:mb-8 font-display tracking-tight">
            LINEマーケティングの<br />戦略設計からアカウント構築<br />運用・分析まで
          </p>
          <MagneticWrap className="inline-block" strength={0.2}>
            <a href="#contact" className="btn-ripple group inline-flex items-center gap-3 md:gap-4 bg-white text-[#00BFA5] font-black rounded-full shadow-[0_4px_24px_rgba(255,255,255,.25)] hover:shadow-[0_8px_40px_rgba(255,255,255,.35)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 px-8 py-4 md:px-14 md:py-5.5 text-[16px] md:text-[20px] border-2 border-white/80" style={{ animation: "glow-pulse 3s ease-in-out infinite" }}>
              <img src="/line-icon.png" alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-md" />
              ご相談・お問合せ（無料）
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </MagneticWrap>
        </Reveal>
      </div>
    </section>
    {/* Bottom chevron */}
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "clamp(28px, 4vw, 56px)", marginTop: -1 }}>
      <path d="M0,0 L1440,0 L720,60 Z" fill="#18B5C0" />
      <path d="M0,60 L720,60 L1440,60 L1440,0 L720,60 L0,0 Z" fill="#e0f5f2" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ACHIEVEMENTS — light green bg
   ═══════════════════════════════════════════════════════════ */
const Achievements = () => (
  <section id="results" className="relative bg-[#e0f5f2] pt-10 pb-12 md:pt-12 md:pb-16 overflow-hidden">
    <WaveSvg fill="#e0f5f2" />
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative z-10">
      <Reveal>
        <h2 className="text-[24px] md:text-[30px] font-bold text-black/70 tracking-[0.06em] text-center mb-8">
          成果事例
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8 md:items-stretch">
        {CASES.map((c, i) => (
          <Reveal key={i} delay={i * 60}>
            <article className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.06)] hover:shadow-[0_4px_20px_rgba(0,191,165,.12)] hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[16/10] shrink-0 overflow-hidden bg-white flex items-center justify-center">
                <img src={c.img} alt={c.name} className="w-full h-full object-contain p-2" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col p-4 md:p-6 min-h-0 bg-gradient-to-b from-[#f8fdf9] to-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-white bg-[#00BFA5] rounded px-1.5 py-0.5 tabular-nums">{c.num}</span>
                  <span className="text-[11px] text-black/50 font-medium">{c.cat}</span>
                </div>
                <h3 className="text-[15px] md:text-[16px] font-bold text-black/90 mb-3">{c.name}</h3>
                <div className="mb-3 bg-[#f0faf3] rounded-lg px-3 py-2.5">
                  <span className="text-[10px] text-black/40 block mb-1">{c.metric}</span>
                  <div className="flex items-baseline gap-1.5">
                    {c.before !== "—" && <span className="text-[13px] text-black/30 line-through tabular-nums">{c.before}</span>}
                    {c.before !== "—" && <ArrowRight size={12} className="text-[#00BFA5]/70 shrink-0" />}
                    <span className="font-en text-[22px] md:text-[24px] font-bold text-[#00BFA5] tabular-nums leading-none">{c.after}</span>
                  </div>
                </div>
                {c.challenge && <p className="text-[11px] text-black/50 leading-[1.6] mb-1">{c.challenge}</p>}
                <p className="text-[11px] text-black/45 leading-[1.7]">{c.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   STRENGTH — white bg
   ═══════════════════════════════════════════════════════════ */
const Strength = () => (
  <section className="py-14 md:py-20 bg-white relative overflow-hidden">
    <div className="absolute inset-0 crosshatch-pattern pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-8%] w-[30%] aspect-square rounded-full bg-[#00BFA5]/[.03] pointer-events-none animate-pulse-glow" />
    <div className="absolute top-[-5%] left-[-6%] w-[25%] aspect-square rounded-full bg-[#00BFA5]/[.04] pointer-events-none animate-drift-y" />
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 relative z-10">
      <Reveal>
        <SectionHead>VOYAGEが選ばれる理由</SectionHead>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {STRENGTHS.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="h-full p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[32px] md:text-[40px] font-black text-[#00BFA5]/20 font-en leading-none">{s.num}</span>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#00BFA5]/30 to-transparent" />
              </div>
              {s.img && (
                <div className="relative w-full h-[140px] md:h-[160px] flex items-center justify-center mb-4 -mt-1">
                  <img src={s.img} alt={s.ja} className="h-full w-auto object-contain" loading="lazy" />
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 30px 20px white" }} />
                </div>
              )}
              <h3 className="text-[17px] md:text-[20px] font-black text-black/90 mb-2 leading-snug">{s.ja}</h3>
              <p className="text-[12px] md:text-[13px] font-bold text-[#00BFA5] mb-4">{s.sub}</p>
              <p className="text-[13px] md:text-[14px] text-black/50 leading-[1.85]">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   FLOW — light green bg
   ═══════════════════════════════════════════════════════════ */
const Flow = () => (
  <section className="relative bg-[#e0f5f2] pt-8 pb-16 md:pt-10 md:pb-20 overflow-hidden">
    <div className="absolute inset-0 diagonal-pattern pointer-events-none" />
    <WaveSvg fill="#e0f5f2" />
    <div className="absolute top-[10%] right-[-4%] w-[120px] md:w-[200px] aspect-square rounded-full bg-[#00BFA5]/[.06] blur-[40px] pointer-events-none animate-drift-y" />
    <div className="absolute bottom-[15%] left-[-6%] w-[100px] md:w-[160px] aspect-square rounded-full bg-[#00BFA5]/[.05] blur-[30px] pointer-events-none animate-drift-x" />
    <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 relative z-10">
      <Reveal>
        <SectionHead>運用開始までの流れ</SectionHead>
      </Reveal>
      <FlowTimeline steps={FLOW_STEPS} />
    </div>
  </section>
);

/* ── Flow Timeline with scroll-driven line draw ── */
const FlowTimeline = ({ steps }) => {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef, { start: 0.9, end: 0.1 });
  return (
    <div ref={containerRef} className="space-y-0 relative">
      {/* Background line (faded) */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]">
        <div className="w-full h-full bg-[#00BFA5]/10" />
      </div>
      {/* Animated line that grows with scroll */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px] z-[1]">
        <div className="w-full bg-[#00BFA5] origin-top transition-[height] duration-200" style={{ height: `${Math.min(progress * 120, 100)}%` }} />
      </div>
      {steps.map((s, i) => (
        <HorizontalReveal key={i} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
          <div className={`flex items-start gap-4 md:gap-12 relative pb-8 md:pb-10 ${i % 2 === 0 ? "md:flex-row md:text-left" : "md:flex-row-reverse md:text-right"}`}>
            <PopIn delay={i * 150}>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00BFA5] text-white rounded-full flex items-center justify-center font-black text-[14px] md:text-[16px] shrink-0 relative z-20 shadow-[0_4px_16px_rgba(0,191,165,.3)] md:absolute md:left-1/2 md:-translate-x-1/2">
                {String(i + 1).padStart(2, "0")}
              </div>
            </PopIn>
            <div className={`flex-1 bg-white rounded-2xl p-4 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,.08)] relative hover:shadow-[0_4px_16px_rgba(0,0,0,.06)] transition-shadow duration-500 overflow-visible ${i % 2 === 0 ? "md:mr-[calc(50%+88px)] md:ml-0 rounded-tl-md" : "md:ml-[calc(50%+88px)] md:mr-0 rounded-tr-md"}`}>
              {/* 尾 — PainPointsと同じ形（番号方向に三角）左側の吹き出し */}
              {i % 2 === 0 && <div className="absolute left-0 top-4 md:top-5 w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-b-[8px] md:border-b-[10px] border-b-transparent border-r-[10px] md:border-r-[12px] border-r-white" style={{ transform: "translateX(-1px)" }} />}
              {/* 右側の吹き出し（デスクトップのみ右向き尾） */}
              {i % 2 === 1 && <><div className="absolute left-0 top-4 md:top-5 w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-b-[8px] md:border-b-[10px] border-b-transparent border-r-[10px] md:border-r-[12px] border-r-white md:hidden" style={{ transform: "translateX(-1px)" }} /><div className="absolute right-0 top-5 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-white hidden md:block" style={{ transform: "translateX(1px)" }} /></>}
              <p className="text-[10px] md:text-[11px] font-bold text-[#00BFA5] mb-1">{s.sub}</p>
              <h3 className="text-[15px] md:text-[17px] font-bold text-black mb-1.5 md:mb-2">{s.ja}</h3>
              <p className="text-[12px] md:text-[13px] text-black/50 leading-[1.75] md:leading-[1.85]">{s.desc}</p>
            </div>
          </div>
        </HorizontalReveal>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   FAQ — white bg
   ═══════════════════════════════════════════════════════════ */
const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 diagonal-pattern pointer-events-none opacity-60" />
      <div className="absolute top-[10%] right-[-5%] w-[20%] aspect-square rounded-full bg-[#00BFA5]/[.03] pointer-events-none animate-drift-y" />
      <div className="absolute bottom-[15%] left-[-4%] w-[15%] aspect-square rounded-full bg-[#00BFA5]/[.04] pointer-events-none animate-drift-x" />
      <div className="absolute inset-0 dot-pattern-white pointer-events-none" />
      <div className="max-w-[700px] mx-auto px-4 md:px-8 relative z-10">
        <Reveal>
          <SectionHead>よくあるご質問</SectionHead>
        </Reveal>
        <div className="space-y-2.5 md:space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <HorizontalReveal key={i} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`bg-[#f5faf9] rounded-xl overflow-hidden transition-all duration-300 ${openIdx === i ? "shadow-[0_4px_20px_rgba(0,191,165,.08)]" : ""}`}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between gap-3 md:gap-4 px-4 py-3.5 md:px-5 md:py-4 text-left group">
                  <span className="text-[13px] md:text-[14px] font-bold text-black group-hover:text-[#00BFA5] transition-colors">{item.q}</span>
                  <ChevronDown className={`text-black/20 shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180 !text-[#00BFA5]" : ""}`} size={16} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-out ${openIdx === i ? "max-h-40 pb-3 md:pb-4" : "max-h-0"}`}>
                  <p className="text-[12px] md:text-[13px] text-black/50 leading-[1.8] md:leading-[1.9] px-4 md:px-5">{item.a}</p>
                </div>
              </div>
            </HorizontalReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CONTACT — green bg（LINE + メールフォームページへのリンク）
   ═══════════════════════════════════════════════════════════ */
const Contact = () => (
  <section id="contact" className="relative bg-[#00BFA5] pt-14 pb-14 md:pt-16 md:pb-16 overflow-hidden">
    <div className="absolute inset-0 diagonal-pattern-dark pointer-events-none" />
    <WaveSvg fill="#00BFA5" />
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-white rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white rounded-full blur-[60px] -translate-y-1/4 translate-x-1/4 animate-drift-x" />
    </div>
    <div className="absolute inset-0 dot-pattern-dark pointer-events-none opacity-20" />
    <div className="absolute top-[20%] left-[8%] w-2 h-2 rounded-full bg-white/20 pointer-events-none animate-float-a" />
    <div className="absolute bottom-[25%] right-[12%] w-3 h-3 rounded-full bg-white/15 pointer-events-none animate-float-b" />
    <div className="absolute top-[50%] right-[5%] w-2 h-2 rounded-full bg-white/10 pointer-events-none animate-drift-y" />
    <div className="max-w-[720px] mx-auto px-4 md:px-8 relative z-10">
      <Reveal>
        <h2 className="text-[22px] md:text-[30px] font-black text-white mb-3 leading-[1.5] text-center">
          <TextRevealChar text="まずはお気軽に" className="inline" />
          <br className="md:hidden" />
          <TextRevealChar text="ご相談ください" className="inline" delay={400} />
        </h2>
        <p className="text-white/60 text-[13px] md:text-[14px] leading-[1.8] md:leading-[1.9] mb-6 md:mb-8 max-w-[440px] mx-auto text-center">
          お客様の現状をお聞きし、最適なご提案をさせていただきます。
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {/* LINEお問合せ */}
        <Reveal delay={100} className="h-full">
          <div className="h-full bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,.10)] flex flex-col items-center text-center justify-between min-h-0">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#00BFA5] rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <img src="/line-icon.png" alt="LINE" className="w-7 h-7 md:w-9 md:h-9 rounded-lg" />
            </div>
            <h3 className="text-[16px] md:text-[20px] font-black text-black mb-2">LINEでお問合せ</h3>
            <p className="text-black/40 text-[12px] md:text-[13px] leading-[1.7] md:leading-[1.8] mb-4 md:mb-6 max-w-[280px]">
              友だち追加後、無料相談のご予約が可能です。お気軽にご連絡ください。
            </p>
            <MagneticWrap className="inline-block" strength={0.25}>
              <a href="#" className="inline-flex items-center gap-2 bg-[#00BFA5] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[13px] md:text-[14px] font-bold shadow-[0_4px_20px_rgba(0,191,165,.25)] hover:shadow-[0_8px_32px_rgba(0,191,165,.35)] hover:-translate-y-0.5 transition-all" style={{ animation: "glow-pulse 3s ease-in-out infinite" }}>
                <MessageCircle size={16} /> お友だち追加する
              </a>
            </MagneticWrap>
          </div>
        </Reveal>
        {/* メールフォーム — 専用ページへ */}
        <Reveal delay={150} className="h-full">
          <Link to="/contact" className="block h-full group">
            <div className="h-full bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,.10)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,.14)] transition-all flex flex-col items-center justify-between text-center min-h-[240px] md:min-h-[280px]">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-black/10 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Mail size={24} className="text-black/60 md:hidden" /><Mail size={28} className="text-black/60 hidden md:block" />
              </div>
              <h3 className="text-[16px] md:text-[20px] font-black text-black mb-2">メールでお問合せ</h3>
              <p className="text-black/40 text-[12px] md:text-[13px] leading-[1.7] md:leading-[1.8] mb-4 md:mb-6 max-w-[260px]">フォームページでご入力いただけます。</p>
              <span className="inline-flex items-center gap-2 bg-[#00BFA5] text-white px-6 py-3 rounded-full text-[14px] font-bold shadow-[0_4px_20px_rgba(0,191,165,.25)] group-hover:shadow-[0_8px_32px_rgba(0,191,165,.35)] group-hover:-translate-y-0.5 transition-all">
                <Send size={16} /> フォームへ進む
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="bg-black text-white pt-10 pb-6">
    <div className="max-w-[1200px] mx-auto px-5 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
        <div>
          <img src="/logo-voyage-color.png" alt="VOYAGE" className="h-[36px] md:h-[44px] w-auto mb-4" />
          <p className="text-[11px] text-white/30 leading-[1.8]">株式会社VOYAGE<br />東京都港区芝二丁目2番12号 浜松町PREX</p>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-[11px] text-white/30 font-semibold">
          <a href="#about" className="hover:text-white/60 transition-colors">会社概要</a>
          <a href="#service" className="hover:text-white/60 transition-colors">サービス</a>
          <a href="#works" className="hover:text-white/60 transition-colors">導入実績</a>
          <a href="#results" className="hover:text-white/60 transition-colors">成果事例</a>
          <a href="#" className="hover:text-white/60 transition-colors">プライバシーポリシー</a>
        </div>
      </div>
      <div className="border-t border-white/[.06] pt-6">
        <p className="text-center text-[10px] text-white/20">&copy; {new Date().getFullYear()} VOYAGE INC. / BACKSTAGE Group</p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="antialiased overflow-x-hidden">
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <ClientShowcase />
        <PainPoints />
        <ChevronDivider
          sub="そのお悩み、VOYAGEが"
          headline={<><img src="/line-icon.png" alt="LINE" className="inline-block w-8 h-8 md:w-10 md:h-10 rounded-lg align-middle mr-1 -mt-1" /><span className="text-[#fff] bg-[#00BFA5] px-2 py-0.5 rounded-lg inline-block">LINE</span>を使って<br />すべて<span className="underline decoration-white/40 decoration-4 underline-offset-4">解決</span>します。</>}
          body="多くの企業がLINEを「連絡ツール」としてしか活用できていません。VOYAGEは200社超の運用データに基づき、採用・集客の両面からLINEの持つ本来の力を引き出し、貴社の事業成長を加速させます。"
        />
        <MarketData />
        <Strength />
        <CTABanner />
        <Achievements />
        <Flow />
        <Service />
        <YouTubeSection />
        <BackstageGroup />
        <Leadership />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
