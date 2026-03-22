
"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowRight, Users, TrendingUp, Lock, Smartphone,
  PlusCircle, ChevronRight, Award, Shield, Gift, Menu, X,
  MessageCircle, CheckCircle, Target, Eye, Lightbulb, Globe2,
  Zap, Store, BookOpen, Repeat2, BadgeCheck, Truck,
  CreditCard, ShoppingBag, MapPin, Clock, Star, Phone,
  Twitter, Facebook, Instagram, Linkedin, Youtube, ChevronDown,
} from "lucide-react"

// ─── LINKS ───────────────────────────────────────────────────────────────────
const LISTING_URL   = "https://unimart-listing.vercel.app"
const VOLUNTEER_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfSNoYY8mU_d5UCzAAaMlawoRCyaRyYEipr10O-EVzSJEipig/viewform?usp=publisheditor"
const WHATSAPP_URL  = "https://chat.whatsapp.com/K8uMXmGYJJGJvwP9QVEYn0"

// ─── IMAGE CONSTANTS ──────────────────────────────────────────────────────────
const IMG = {
  logo:          "/logo.png",
  heroMain:      "/uni.webp",
  heroSecond:    "/image3.jpg",
  heroThird:     "/africa.webp",
  heroFourth:    "/image1.jpg",
  aboutTop:      "/home1.jpg",
  aboutBottom:   "/unisd.webp",
  featureImg:    "/image2.jpg",
  bannerImg:     "/image3.jpg",
  collegeScreen: "/ad3.jpeg",
  appScreens:    ["/ad1.jpeg", "/ad2.jpeg", "/ad3.jpeg", "/ad4.jpeg", "/ad5.jpeg"],
  unis: [
    { name: "Catholic University", src: "/catholic.webp" },
    { name: "STU",                 src: "/stu.webp"      },
    { name: "UDS",                 src: "/uds.webp"      },
    { name: "UENR",                src: "/uenr.webp"     },
    { name: "KNUST",               src: "/knust.webp"    },
    { name: "Ashesi",              src: "/ashesi.webp"   },
  ],
  reviews: [
    { src: "/uenr.webp",     name: "Zara, UENR",               text: "Selling my old textbooks was so easy. UniMart made it simple and safe!",     stars: 5 },
    { src: "/knust.webp",    name: "Macclean, KNUST",           text: "I swapped my headphones for a calculator. The process was smooth and fast.", stars: 5 },
    { src: "/catholic.webp", name: "Nana, Catholic University", text: "I got a fridge for my dorm at half the price. Highly recommend UniMart!",   stars: 5 },
    { src: "/stu.webp",      name: "Ohemma, STU",               text: "Great platform for students. I sold my old laptop in a day!",               stars: 5 },
    { src: "/ashesi.webp",   name: "Akosua, Ashesi",            text: "Easy to use and very safe. I recommend UniMart to all my friends.",         stars: 5 },
    { src: "/uds.webp",      name: "Mohammed, UDS",             text: "I found a great deal on a mini fridge. The process was smooth!",            stars: 5 },
  ],
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useReveal() {
  const [on, setOn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, on }
}

// ─── TINY HELPERS ─────────────────────────────────────────────────────────────
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, on } = useReveal()
  return <div ref={ref} className={`rv ${on ? "rv-on" : ""} ${className}`}>{children}</div>
}

function Blob({ cls }: { cls: string }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${cls}`} />
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
    </div>
  )
}

function WaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function BotFace({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="14" cy="18" r="3.5" fill="white" />
      <circle cx="26" cy="18" r="3.5" fill="white" />
      <circle cx="15" cy="17" r="1.5" fill="#EA580C" />
      <circle cx="27" cy="17" r="1.5" fill="#EA580C" />
      <path d="M13 26 Q20 31 27 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="20" y1="7" x2="20" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="5.5" r="2.5" fill="#FCD34D" />
    </svg>
  )
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function Countdown({ target }: { target: string }) {
  const calc = useCallback(() => {
    const d = Math.max(new Date(target).getTime() - Date.now(), 0)
    return { days: Math.floor(d / 86400000), hours: Math.floor((d % 86400000) / 3600000), mins: Math.floor((d % 3600000) / 60000), secs: Math.floor((d % 60000) / 1000) }
  }, [target])
  const [t, setT] = useState(calc)
  const [rdy, setRdy] = useState(false)
  useEffect(() => { setRdy(true); const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [calc])
  const boxes = [{ v: t.days, l: "Days" }, { v: t.hours, l: "Hours" }, { v: t.mins, l: "Mins" }, { v: t.secs, l: "Secs" }]
  return (
    <div className="cdwrap flex flex-col items-center w-full py-10 px-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
        <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Launching</span>
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
      </div>
      <p className="text-orange-500 text-2xl sm:text-3xl font-black mb-6">25 March 2026</p>
      {rdy && (
        <div className="flex gap-3 sm:gap-5">
          {boxes.map(({ v, l }) => (
            <div key={l} className="cdbox flex flex-col items-center px-4 py-4 sm:px-7 sm:py-5 rounded-2xl min-w-[62px] sm:min-w-[100px]">
              <span className="text-3xl sm:text-5xl font-black text-orange-600 tabular-nums leading-none">{String(v).padStart(2, "0")}</span>
              <span className="text-[10px] sm:text-xs font-black text-orange-800/60 uppercase tracking-widest mt-1.5">{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── APP SLIDER ───────────────────────────────────────────────────────────────
function AppSlider() {
  const [i, setI] = useState(0)
  const screens = IMG.appScreens
  useEffect(() => { const t = setInterval(() => setI(p => (p + 1) % screens.length), 3500); return () => clearInterval(t) }, [screens.length])
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center">
        <button onClick={() => setI(p => (p - 1 + screens.length) % screens.length)} className="absolute left-0 z-10 hidden sm:flex w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center hover:border-orange-300 transition-colors"><ChevronRight className="w-5 h-5 text-orange-500 rotate-180" /></button>
        <div className="w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] md:w-[300px] md:h-[580px] bg-gray-950 rounded-[40px] p-3 shadow-2xl border border-orange-500/20 overflow-hidden">
          <img key={i} src={screens[i]} alt={`UniMart screen ${i + 1}`} className="w-full h-full object-cover rounded-[32px] ani-fade" />
        </div>
        <button onClick={() => setI(p => (p + 1) % screens.length)} className="absolute right-0 z-10 hidden sm:flex w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center hover:border-orange-300 transition-colors"><ChevronRight className="w-5 h-5 text-orange-500" /></button>
      </div>
      <div className="flex gap-2 mt-5 justify-center">
        {screens.map((_, idx) => <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-7 bg-orange-500" : "w-2 bg-gray-300"}`} />)}
      </div>
    </div>
  )
}

// ─── UNIVERSITIES MARQUEE ─────────────────────────────────────────────────────
function UnisMarquee() {
  return (
    <section id="universities" className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <p className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Trusted by students across Ghanaian universities</p>
      <div className="overflow-hidden relative">
        <div className="flex gap-14 marquee">
          {[...IMG.unis, ...IMG.unis].map((u, i) => (
            <div key={i} className="flex flex-col items-center min-w-[130px] opacity-70 hover:opacity-100 transition-opacity">
              <img src={u.src} alt={u.name} className="h-12 sm:h-14 object-contain mb-2" />
              <span className="text-xs text-gray-500 text-center font-semibold">{u.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
function Reviews() {
  const [cur, setCur] = useState(0)
  useEffect(() => { const t = setInterval(() => setCur(p => (p + 1) % IMG.reviews.length), 5000); return () => clearInterval(t) }, [])
  return (
    <div>
      <div className="hidden sm:grid sm:grid-cols-3 gap-6">
        {IMG.reviews.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hl">
            <div className="relative mb-4">
              <img src={r.src} alt={r.name} className="w-16 h-16 rounded-full object-cover border-4 border-orange-100" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <span className="text-sm font-black text-orange-500 mb-2">{r.name}</span>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">"{r.text}"</p>
            <Stars n={r.stars} />
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        <div key={cur} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center mx-2 ani-fade">
          <img src={IMG.reviews[cur].src} alt={IMG.reviews[cur].name} className="w-16 h-16 rounded-full object-cover border-4 border-orange-100 mb-3" />
          <span className="text-sm font-black text-orange-500 mb-1">{IMG.reviews[cur].name}</span>
          <p className="text-sm text-gray-400 mb-3">"{IMG.reviews[cur].text}"</p>
          <Stars n={IMG.reviews[cur].stars} />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {IMG.reviews.map((_, i) => <button key={i} onClick={() => setCur(i)} className={`h-2 rounded-full transition-all ${i === cur ? "w-5 bg-orange-500" : "w-2 bg-gray-300"}`} />)}
        </div>
      </div>
    </div>
  )
}

// ─── VOLUNTEER (button only — no form) ───────────────────────────────────────
function Volunteer() {
  const perks = [
    { Icon: Zap,        text: "Early access to new UniMart features",          grad: "from-orange-100 to-orange-200" },
    { Icon: Award,      text: "Certificates & recommendation letters",         grad: "from-blue-100 to-blue-200"    },
    { Icon: TrendingUp, text: "Hands-on experience in tech, marketing & ops",  grad: "from-green-100 to-green-200"  },
    { Icon: Users,      text: "Network with founders, sellers & partners",     grad: "from-purple-100 to-purple-200"},
    { Icon: Gift,       text: "Volunteer rewards, badges & UniMart credits",   grad: "from-yellow-100 to-yellow-200"},
    { Icon: Shield,     text: "Priority access to future paid roles",          grad: "from-pink-100 to-pink-200"    },
  ]
  return (
    <section id="volunteer" className="py-20 bg-gray-50 relative overflow-hidden">
      <Blob cls="top-0 left-0 w-80 h-80 bg-orange-100/40" />
      <Blob cls="bottom-0 right-0 w-96 h-96 bg-blue-100/25" />
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* Left — perks */}
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full uppercase tracking-widest mb-5">
            <Zap className="w-3 h-3" /> Community Program
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">Become a UniMart Volunteer</h2>
          <p className="text-gray-400 text-base mb-8 leading-relaxed">Help grow UniMart across campuses. Learn real skills, build your network, and earn rewards while making a real impact.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {perks.map(({ Icon, text, grad }, i) => (
              <div key={i} className="flex gap-3 items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm hl">
                <span className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${grad}`}>
                  <Icon className="w-4 h-4 text-gray-700" />
                </span>
                <span className="text-sm text-gray-600 leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — CTA card */}
        <Reveal>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

            {/* Card hero band */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 px-8 pt-10 pb-8 text-white text-center relative overflow-hidden">
              <Blob cls="top-0 right-0 w-40 h-40 bg-white/10" />
              <Blob cls="bottom-0 left-0 w-32 h-32 bg-white/10" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-2">Join Our Volunteer Team</h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">
                  Be part of the team building Africa's largest student marketplace. Apply in under 2 minutes.
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              {[
                { v: "500+", l: "Volunteers" },
                { v: "15+",  l: "Campuses"  },
                { v: "Free", l: "To Join"   },
              ].map(({ v, l }) => (
                <div key={l} className="py-4 text-center">
                  <p className="text-lg font-black text-orange-500">{v}</p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{l}</p>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div className="px-8 py-8 flex flex-col items-center gap-4">
              <a
                href={VOLUNTEER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-lg shadow-orange-200/60 transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5" />
                Sign Up as a Volunteer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                Takes less than 2 minutes · No fees
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const pillars = [
    { Icon: Target,    title: "Mission",    text: "Empower every African student with AI-powered commerce — so listing a product is as easy as taking a photo, and buying is always cheaper than anywhere else.",                      c: "bg-orange-500", bg: "bg-orange-50"  },
    { Icon: Eye,       title: "Vision",     text: "Africa's first and largest AI e-commerce network — 500+ campuses, 1M+ students, 20+ countries by 2030. Built from a dorm room in Ghana.",                                          c: "bg-blue-500",   bg: "bg-blue-50"    },
    { Icon: Lightbulb, title: "AI-First",   text: "RIRI.ai auto-generates listings from photos, detects fake products, suggests competitive prices, and matches buyers — all in under 2 minutes. No human can do that.",               c: "bg-purple-500", bg: "bg-purple-50"  },
    { Icon: Globe2,    title: "Impact",     text: "From Sunyani to Accra, Kumasi to Tamale, Lagos to Nairobi — UniMart keeps money circulating within African student communities at the lowest possible prices.",                       c: "bg-green-500",  bg: "bg-green-50"   },
  ]
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <Blob cls="top-0 right-0 w-96 h-96 bg-orange-50/60" />
      <Blob cls="bottom-0 left-0 w-72 h-72 bg-blue-50/40" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-5 py-2 rounded-full uppercase tracking-widest mb-6">
            <BadgeCheck className="w-3.5 h-3.5" /> About UniMart
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-5">
            Built for Students,<br /><span className="text-orange-500">Powered by AI.</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            UniMart is not just a campus marketplace — it is <strong className="text-gray-700">Africa's first fully AI-driven e-commerce platform</strong>, replacing the chaos of WhatsApp group buying and social media scams with a verified, intelligent, and affordable commerce layer built for every African student.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <Reveal>
            <div className="relative h-[420px]">
              <img src={IMG.aboutTop}    alt="Students collaborating" className="absolute top-0 left-0 w-[70%] h-[260px] object-cover rounded-3xl shadow-2xl border-4 border-white" />
              <img src={IMG.aboutBottom} alt="Campus marketplace"     className="absolute bottom-0 right-0 w-[58%] h-[210px] object-cover rounded-3xl shadow-xl border-4 border-white" />
              <div className="absolute bottom-[88px] left-3 z-10 bg-white rounded-2xl shadow-xl px-4 py-3 border border-orange-100 flex items-center gap-3 hl">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-500"><BadgeCheck className="w-5 h-5 text-white" /></span>
                <div><p className="text-xs font-black text-gray-800 leading-none">Verified Campus</p><p className="text-[11px] text-gray-400">Students only</p></div>
              </div>
              <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white rounded-2xl shadow-xl px-4 py-3 text-center hl">
                <p className="text-2xl font-black leading-none">50K+</p><p className="text-[11px] font-semibold opacity-90">Students Waiting</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 block">Who We Are</span>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">A team of African students building the continent's first AI commerce platform</h3>
            <p className="text-gray-400 mb-5 leading-relaxed">UniMart was born out of frustration. Every day, students across Ghana were losing money buying fake items, getting scammed on social media, and struggling to sell unused goods at graduation. We refused to accept that Africa had no answer.</p>
            <p className="text-gray-400 mb-5 leading-relaxed">From a dorm room at UENR, we built <strong className="text-gray-700">RIRI.ai</strong> — an artificial intelligence that can look at a product photo and instantly generate a listing, detect counterfeits, suggest a competitive price, and connect the seller with the right buyer. No African platform had done this before. <strong className="text-gray-700">We did it first.</strong></p>
            <p className="text-gray-400 mb-8 leading-relaxed">Our goal is bold: become the commerce infrastructure for every African campus by 2030. We start cheap, we start fast, and we start with AI.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Store,      v: "15+",   l: "Universities" },
                { Icon: BadgeCheck, v: "Edu✓",  l: "Verified Only"},
                { Icon: Clock,      v: "2 min", l: "To List"      },
                { Icon: Users,      v: "50K+",  l: "Students"     },
              ].map(({ Icon, v, l }, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-3 hl">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-100 flex-shrink-0"><Icon className="w-4 h-4 text-orange-500" /></span>
                  <div><p className="text-lg font-black text-orange-500 leading-none">{v}</p><p className="text-xs text-gray-400 font-medium">{l}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-10">What We Stand For</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ Icon, title, text, c, bg }, i) => (
              <div key={i} className={`${bg} rounded-2xl p-6 border border-white shadow-sm hl group`}>
                <span className={`flex items-center justify-center w-11 h-11 rounded-2xl ${c} text-white mb-4 shadow-md group-hover:scale-105 transition-transform`}><Icon className="w-5 h-5" /></span>
                <h4 className="text-base font-black text-gray-900 mb-2">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is UniMart?",
    a: "UniMart is Ghana's first verified campus marketplace — a platform built exclusively for students to buy, sell, and swap items safely within their university community. From textbooks to electronics, dorm furniture to food, UniMart connects students across 15+ campuses."
  },
  {
    q: "Who can use UniMart?",
    a: "UniMart is open to all students in Ghanaian universities. Sellers must verify their identity using a university email address (.edu.gh or institutional email) to ensure every listing is from a real student. Buyers can browse freely without verification."
  },
  {
    q: "Is it free to list my products?",
    a: "Yes — completely free for the first 500 vendors, with zero commission on sales. We believe every student deserves a fair chance to earn, so we charge nothing to get started. Future premium features will always remain optional."
  },
  {
    q: "How do I list a product?",
    a: "Visit unimart-listing.vercel.app, upload a photo of your item, and our AI (RIRI.ai) will automatically fill in the title, description, price, and tags for you. The whole process takes under 2 minutes. Your listing goes live after a quick admin review."
  },
  {
    q: "How does UniMart keep me safe from scams?",
    a: "Every seller is verified with a university email. Our AI system (RIRI.ai) scans every listing image to detect counterfeit or fake products before they go live. Listings are also reviewed by our admin team. Payments are handled securely through MoMo and card — funds are only released once the buyer confirms receipt."
  },
  {
    q: "Can UniMart detect fake products like fake Nike or Gucci?",
    a: "Yes. Our RIRI.ai system is trained to detect counterfeits of major brands including Nike, Adidas, Gucci, Rolex, Apple, Samsung, Supreme, and many more. It inspects logos, stitching, proportions, fonts, and build quality — and flags suspicious items before they go live on the marketplace."
  },
  {
    q: "Which universities does UniMart support?",
    a: "Currently UENR, KNUST, UDS, Catholic University, STU, and Ashesi University. We are actively expanding to all Ghanaian universities and beyond. If your campus isn't listed yet, join the waitlist and you'll be notified the moment we launch at your institution."
  },
  {
    q: "What payment methods are supported?",
    a: "UniMart supports MTN Mobile Money (MoMo), Telecel Cash, and card payments. We're working to integrate Vodafone Cash and direct bank transfers. All transactions are secured and encrypted."
  },
  {
    q: "When does UniMart officially launch?",
    a: "UniMart officially launches on 25 March 2026. Join the waitlist with your university email to get early access, exclusive deals, and be among the first 500 free vendors on the platform."
  },
  {
    q: "How do I become a volunteer?",
    a: "Click the 'Sign Up as a Volunteer' button in the Volunteer section of this page. You'll be taken to a short Google Form that takes under 2 minutes to fill. Volunteers get early access, certificates, hands-on experience, and priority consideration for future paid roles."
  },
  {
    q: "Does UniMart offer delivery?",
    a: "Yes. Sellers can choose Self Delivery (they arrange it personally) or UniMart Riders — our campus delivery network. Rider fees are based on distance and are shown transparently at checkout. Campus-to-campus delivery is coming soon."
  },
  {
    q: "Can I sell food or services on UniMart?",
    a: "Absolutely. UniMart has dedicated categories for Campus Food (daily meals, snacks, beverages), Services (tutoring, printing, photography, repairs), and Events. Any student-run business or offering is welcome on the platform."
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <Blob cls="top-0 left-0 w-80 h-80 bg-orange-50/60" />
      <Blob cls="bottom-0 right-0 w-72 h-72 bg-amber-50/40" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-5 py-2 rounded-full uppercase tracking-widest mb-5">
            <MessageCircle className="w-3.5 h-3.5" /> FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Everything You<br /><span className="text-orange-500">Need to Know</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Common questions about UniMart — answered clearly and honestly.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open === i
                    ? "border-orange-200 bg-orange-50 shadow-md"
                    : "border-gray-100 bg-white hover:border-orange-100"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`text-sm sm:text-base font-black leading-snug transition-colors ${open === i ? "text-orange-600" : "text-gray-800"}`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    open === i ? "bg-orange-500 text-white rotate-180" : "bg-gray-100 text-gray-400"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-6 ani-fade">
                    <div className="h-px bg-orange-200 mb-4" />
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal className="mt-12 text-center">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl border border-orange-100 p-8">
            <p className="text-gray-700 font-bold mb-2">Still have questions?</p>
            <p className="text-gray-400 text-sm mb-5">Chat with us directly on WhatsApp — we reply within minutes.</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-black px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              <WaIcon className="w-4 h-4 fill-white" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── COMMUNITY ────────────────────────────────────────────────────────────────
function Community() {
  return (
    <section id="community" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
      <Blob cls="top-0 right-0 w-72 h-72 bg-green-200/30" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-green-700 bg-green-100 border border-green-200 px-5 py-2 rounded-full uppercase tracking-widest mb-6">
            <MessageCircle className="w-3.5 h-3.5" /> Join the Community
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">Be Part of Something Big</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">Join 5,000+ students in our WhatsApp community. Get early access, exclusive deals, campus updates, and be first when UniMart launches!</p>
          <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 sm:p-10 relative overflow-hidden">
            <Blob cls="top-0 left-0 w-40 h-40 bg-green-100/40" />
            <Blob cls="bottom-0 right-0 w-32 h-32 bg-emerald-100/40" />
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl text-white">
                <WaIcon className="w-10 h-10 fill-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">UniMart Student Community</h3>
                <p className="text-sm text-gray-400 mb-3">5,000+ members · Ghana's biggest student marketplace group</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Deals", "Textbooks", "Earn Cash", "Launch News"].map(tag => (
                    <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-bold">{tag}</span>
                  ))}
                </div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-black text-base rounded-2xl shadow-lg transition-colors"
              >
                <WaIcon className="w-5 h-5 fill-white flex-shrink-0" />
                Join WhatsApp Group
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-xs text-gray-400">Free to join · No spam · Leave anytime</p>
            </div>
          </div>
          <div className="hidden sm:flex justify-center gap-3 mt-8 flex-wrap">
            {[
              { href: "https://facebook.com/unimartgh",         Icon: Facebook,  label: "Facebook",  bg: "bg-[#1877F2]" },
              { href: "https://twitter.com/unimartgh",          Icon: Twitter,   label: "Twitter",   bg: "bg-[#1DA1F2]" },
              { href: "https://instagram.com/unimartgh",        Icon: Instagram, label: "Instagram", bg: "bg-gradient-to-r from-[#F58529] to-[#8134AF]" },
              { href: "https://linkedin.com/company/unimartgh", Icon: Linkedin,  label: "LinkedIn",  bg: "bg-[#0A66C2]" },
              { href: "https://youtube.com/@unimartgh",         Icon: Youtube,   label: "YouTube",   bg: "bg-[#FF0000]" },
            ].map(({ href, Icon, label, bg }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`${bg} text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CHATBOT — single welcome card, no input ─────────────────────────────────
function UniBot() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!shown) {
      const t = setTimeout(() => { setOpen(true); setShown(true) }, 2800)
      return () => clearTimeout(t)
    }
  }, [shown])

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[340px] ani-fade">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="bg-orange-500 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <BotFace size={26} />
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-sm leading-none">UniBot</p>
                <p className="text-white/70 text-[11px] mt-0.5">Your campus helper · Online</p>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Welcome message body */}
            <div className="p-5 space-y-4">

              {/* Greeting bubble */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BotFace size={18} />
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
                  <p className="text-sm font-black text-gray-900 mb-1">Welcome to Uni-Mart! 🌍</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    <strong className="text-orange-500">Africa's first AI-powered e-commerce platform</strong> — built by students, for students, starting in Ghana.
                  </p>
                </div>
              </div>

              {/* Info cards */}
              <div className="space-y-2 pl-11">
                {[
                  { Icon: Globe2,     color: "bg-orange-100 text-orange-600", text: "Africa's first fully AI-powered e-commerce platform — listing, pricing, and fake detection all automated by RIRI.ai." },
                  { Icon: TrendingUp, color: "bg-amber-100 text-amber-600",   text: "Cheapest campus prices anywhere — our AI sets competitive prices automatically. 0% commission, always." },
                  { Icon: BadgeCheck, color: "bg-green-100 text-green-600",   text: "Every seller is verified with a university email. AI scans every listing for fake products before it goes live." },
                  { Icon: Zap,        color: "bg-blue-100 text-blue-600",     text: "List any product in under 2 minutes. Take a photo — RIRI.ai writes the title, description, tags, and price for you." },
                ].map(({ Icon, color, text }, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-lg ${color} flex items-center justify-center mt-0.5`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pl-11 flex flex-col gap-2 pt-1">
                <a
                  href={LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Store className="w-3.5 h-3.5" /> List a Product
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <WaIcon className="w-3.5 h-3.5 fill-white" /> Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-4 sm:right-8 z-50 w-16 h-16 rounded-full bg-orange-500 shadow-2xl shadow-orange-400/40 flex flex-col items-center justify-center transition-transform hover:scale-110 border-4 border-white focus:outline-none"
        aria-label="Open UniBot"
      >
        {open ? <X className="w-6 h-6 text-white" /> : (
          <>
            <BotFace size={30} />
            <span className="text-[8px] text-white font-black leading-none mt-0.5 tracking-wide">CHAT</span>
          </>
        )}
        {!open && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[8px] text-white font-black">1</span>
          </span>
        )}
      </button>
    </>
  )
}

// ─── HERO MOSAIC ─────────────────────────────────────────────────────────────
function HeroMosaic() {
  const pics = [
    { src: IMG.heroMain,   alt: "Students shopping on campus", span: "col-span-2", h: "h-48" },
    { src: IMG.heroSecond, alt: "Campus vendor",               span: "col-span-1", h: "h-48" },
    { src: IMG.heroThird,  alt: "Mobile checkout",             span: "col-span-1", h: "h-40" },
    { src: IMG.heroFourth, alt: "Student marketplace",         span: "col-span-2", h: "h-40" },
  ]
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-orange-100/40 to-amber-100/20 rounded-3xl blur-2xl -z-10" />
      <div className="grid grid-cols-3 gap-3">
        {pics.map((p, i) => (
          <div key={i} className={`${p.span} ${p.h} rounded-2xl overflow-hidden shadow-lg relative group`}>
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-white text-xs font-bold">{p.alt}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-4 -left-4 z-10 bg-white rounded-2xl shadow-xl px-4 py-2.5 border border-orange-100 flex items-center gap-2.5 hl">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-500 flex-shrink-0"><Zap className="w-4 h-4 text-white" /></span>
        <div className="leading-tight"><p className="text-[11px] font-black text-gray-900">AI-Powered</p><p className="text-[10px] text-gray-400">Africa's First</p></div>
      </div>
      <div className="absolute -top-3 -right-3 z-10 bg-orange-500 text-white rounded-2xl shadow-xl px-3 py-2.5 text-center hl">
        <p className="text-xl font-black leading-none">50K+</p><p className="text-[10px] font-semibold opacity-90">Students</p>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [email,   setEmail]   = useState("")
  const [subDone, setSubDone] = useState(false)
  const [subLoad, setSubLoad] = useState(false)
  const [popup,   setPopup]   = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const zapierUrl = "https://hooks.zapier.com/hooks/catch/26254748/ue6uprk/"

  const links = [
    { l: "About",        id: "about"          },
    { l: "Features",     id: "features"       },
    { l: "How It Works", id: "how-it-works"   },
    { l: "Universities", id: "universities"   },
    { l: "Reviews",      id: "reviews"        },
    { l: "Volunteer",    id: "volunteer"      },
    { l: "Community",    id: "community"      },
    { l: "FAQ",          id: "faq"            },
  ]

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setNavOpen(false)
  }

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade    { from{opacity:0} to{opacity:1} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        .ani-fade { animation: fade 0.4s ease both }
        .rv       { opacity:0; transform:translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease }
        .rv.rv-on { opacity:1; transform:translateY(0) }
        .marquee  { animation: marquee 28s linear infinite }
        .bot-dot  { animation: bounce 0.9s ease-in-out infinite }

        .hl { transition: transform 0.25s ease, box-shadow 0.25s ease }
        .hl:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -8px rgba(0,0,0,0.1) }

        .cdwrap {
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(16px) saturate(180%);
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: 1.75rem;
          max-width: 98vw;
          margin: 0 auto;
        }
        .cdbox {
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
        }

        ::-webkit-scrollbar { width: 5px }
        ::-webkit-scrollbar-thumb { background: #F97316; border-radius: 5px }
        html { scroll-behavior: smooth; scroll-padding-top: 76px }
      `}</style>

      <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            <button onClick={() => go("hero")} className="flex items-center gap-2.5 flex-shrink-0">
              <img src={IMG.logo} alt="Uni-Mart logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
              <div>
                <span className="block text-[17px] font-black text-orange-500 leading-none">Uni-Mart</span>
                <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-0.5">by ZeroOne Labs</span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {links.map(({ l, id }) => (
                <button key={id} onClick={() => go(id)} className="text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors relative group">
                  {l}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-black px-5 py-2.5 rounded-xl shadow-md shadow-orange-200/50 transition-colors"
              >
                <Store className="w-4 h-4" /> Become a Vendor
              </a>
              <button onClick={() => setNavOpen(v => !v)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
                {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {navOpen && (
            <div className="lg:hidden bg-white border-b border-gray-100 px-5 py-4 grid grid-cols-2 gap-1 shadow-lg ani-fade">
              {links.map(({ l, id }) => (
                <button key={id} onClick={() => go(id)} className="text-sm font-semibold text-gray-600 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 rounded-xl text-left transition-colors">{l}</button>
              ))}
              <a
                href={LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 mt-2 bg-orange-500 text-white font-black text-sm py-3 rounded-xl hover:bg-orange-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Store className="w-4 h-4" /> Become a Vendor
              </a>
            </div>
          )}
        </header>

        {/* ── HERO ── */}
        <section id="hero" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <Blob cls="top-10 left-0 w-96 h-96 bg-orange-100/50" />
          <Blob cls="bottom-0 right-0 w-80 h-80 bg-amber-100/30" />
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
            <div className="space-y-7 ani-fade">
              {/* Historic badge */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center overflow-hidden rounded-full shadow-md border border-orange-200 bg-white">
                  <span className="bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-[0.18em] flex-shrink-0 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" /> Historic
                  </span>
                  <span className="px-4 py-1.5 text-[10px] font-black text-gray-700 uppercase tracking-[0.1em] flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                    Africa's First AI E-Commerce Platform
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-[1.06] text-gray-900">
                Africa's{" "}
                <span className="relative inline-block">
                  <span className="text-orange-500">smartest</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                    <path d="M4 7 Q50 2 100 7 Q150 12 196 5" stroke="#F97316" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>{" "}
                campus marketplace
              </h1>

              {/* Bold mission statement */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 sm:p-5">
                <p className="text-white font-black text-sm sm:text-base leading-relaxed">
                  🌍 We are building <span className="underline underline-offset-2 decoration-white/60">Africa's first fully AI-powered e-commerce platform</span> — where any student can list, price, and sell a product in under 2 minutes, at prices cheaper than anywhere else on campus.
                </p>
              </div>

              <p className="text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed">
                Powered by <strong className="text-gray-800">RIRI.ai</strong> — our homegrown artificial intelligence that auto-lists your products, detects fake items, suggests the best price, and connects you with buyers across 15+ Ghanaian universities instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => go("join-marketplace")}
                  className="group inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-orange-200/60 transition-colors">
                  Join UniMart Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => go("about")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-500 font-black px-8 py-4 rounded-2xl transition-colors">
                  Our Story
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { Icon: Zap,        t: "AI-Powered Listings" },
                  { Icon: BadgeCheck, t: ".edu Verified"        },
                  { Icon: Shield,     t: "Fake Detection"       },
                  { Icon: TrendingUp, t: "Cheapest Prices"      },
                  { Icon: CreditCard, t: "MoMo Supported"       },
                ].map(({ Icon, t }) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-orange-500" />{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative ani-fade" style={{ animationDelay: "0.2s" }}>
              <HeroMosaic />
            </div>
          </div>
          <div className="block md:hidden mt-12"><UnisMarquee /></div>
        </section>

        <div className="hidden md:block"><UnisMarquee /></div>

        {/* ── AFRICA'S FIRST — MANIFESTO SECTION ── */}
        <section id="africa-first" className="relative overflow-hidden" style={{background:'#111008'}}>

          {/* ── Hand-drawn Adinkra-inspired background geometry ── */}
          {/* Subtle diamond grid — drawn by hand, not a pattern tile */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
            {/* Large faint diamonds — structural, not decorative noise */}
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.12"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.06" transform="translate(200,0)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.06" transform="translate(400,0)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.08" transform="translate(600,0)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.05" transform="translate(800,0)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.06" transform="translate(1000,0)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.04" transform="translate(1200,0)"/>

            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C9920A" strokeWidth="0.5" opacity="0.07" transform="translate(100,160)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C9920A" strokeWidth="0.5" opacity="0.07" transform="translate(300,160)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C9920A" strokeWidth="0.5" opacity="0.07" transform="translate(500,160)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C9920A" strokeWidth="0.5" opacity="0.07" transform="translate(700,160)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C9920A" strokeWidth="0.5" opacity="0.05" transform="translate(900,160)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C9920A" strokeWidth="0.5" opacity="0.04" transform="translate(1100,160)"/>

            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.06" transform="translate(0,320)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.08" transform="translate(200,320)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.05" transform="translate(400,320)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.06" transform="translate(600,320)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.04" transform="translate(800,320)"/>
            <polygon points="120,60 180,120 120,180 60,120"  fill="none" stroke="#C2714F" strokeWidth="0.6" opacity="0.06" transform="translate(1000,320)"/>

            {/* Thin long horizontal rules */}
            <line x1="0" y1="240" x2="100%" y2="240" stroke="#C2714F" strokeWidth="0.4" opacity="0.08"/>
            <line x1="0" y1="480" x2="100%" y2="480" stroke="#C9920A" strokeWidth="0.4" opacity="0.06"/>
          </svg>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">

            {/* ── Section header ── */}
            <Reveal className="mb-20">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

                {/* Left: eyebrow + headline */}
                <div className="max-w-2xl">
                  {/* Eyebrow with hand-drawn diamond accent */}
                  <div className="flex items-center gap-3 mb-6">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <polygon points="9,0 18,9 9,18 0,9" fill="#C2714F" opacity="0.9"/>
                      <polygon points="9,3 15,9 9,15 3,9" fill="none" stroke="#C2714F" strokeWidth="1"/>
                    </svg>
                    <span style={{color:'#C2714F'}} className="text-[10px] font-black uppercase tracking-[0.22em]">A Historic Moment for Africa</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <polygon points="9,0 18,9 9,18 0,9" fill="#C2714F" opacity="0.9"/>
                      <polygon points="9,3 15,9 9,15 3,9" fill="none" stroke="#C2714F" strokeWidth="1"/>
                    </svg>
                  </div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] mb-6">
                    We are building<br />
                    <span style={{color:'#C9920A'}}>Africa's first</span><br />
                    AI e-commerce platform.
                  </h2>

                  {/* Hand-drawn horizontal rule with center diamond */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px" style={{background:'linear-gradient(to right, transparent, #C2714F44)'}}/>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <polygon points="5,0 10,5 5,10 0,5" fill="#C9920A"/>
                    </svg>
                    <div className="flex-1 h-px" style={{background:'linear-gradient(to left, transparent, #C2714F44)'}}/>
                  </div>

                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                    Not just a marketplace. A complete, intelligent commerce infrastructure — built in Africa, for Africa, by Africans. Starting from the campus. Scaling to the continent.
                  </p>
                </div>

                {/* Right: four declaration tags */}
                <div className="flex flex-col gap-3 lg:min-w-[280px]">
                  {[
                    {
                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                      text: "Ghana's First Fully AI-Verified Marketplace",
                      col: "#C2714F",
                    },
                    {
                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
                      text: "Sellers Verified by AI — Not Just Emails",
                      col: "#C9920A",
                    },
                    {
                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                      text: "Students & Brands Both Welcome as Sellers",
                      col: "#2D6A4F",
                    },
                    {
                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
                      text: "Built on Student Entrepreneurial Infrastructure",
                      col: "#C2714F",
                    },
                  ].map(({ icon, text, col }) => (
                    <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{borderColor:`${col}30`, background:`${col}10`}}>
                      <span style={{color:col}}>{icon}</span>
                      <span className="text-xs font-bold text-gray-300 leading-snug">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Three core pillars ── */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {[
                {
                  num: "01",
                  accent: "#C2714F",
                  Icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
                  title: "Fully AI-Powered",
                  body: "RIRI.ai — our in-house intelligence — writes your listing, sets the right price, detects counterfeits, and connects you with buyers. No other African platform does this.",
                  tags: ["Auto-listing", "Price AI", "Fake Detection", "Smart Matching"],
                },
                {
                  num: "02",
                  accent: "#C9920A",
                  Icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
                  title: "Cheapest Prices on Campus",
                  body: "AI pricing intelligence ensures every listing is competitively priced. Buyers get the best value. Sellers earn fairly. Zero commission — always.",
                  tags: ["0% Commission", "AI Pricing", "Market Rates", "No Hidden Fees"],
                },
                {
                  num: "03",
                  accent: "#2D6A4F",
                  Icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                  title: "Built to Scale Africa",
                  body: "From UENR to 15+ universities. By 2030 — the commerce layer for 500+ African campuses, 10M+ students, across 20+ countries.",
                  tags: ["15+ Universities", "Pan-African", "500+ by 2030", "10M Students"],
                },
              ].map(({ num, accent, Icon, title, body, tags }) => (
                <Reveal key={num}>
                  <div className="h-full rounded-2xl border flex flex-col overflow-hidden hl" style={{borderColor:`${accent}25`, background:'#181510'}}>
                    {/* Accent left rail */}
                    <div className="flex">
                      <div className="w-1 flex-shrink-0 rounded-l-2xl" style={{background:accent, minHeight:'100%'}}/>
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black" style={{color:`${accent}50`}}>{num}</span>
                          <span style={{color:accent}}>{Icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                          {tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-lg text-gray-300" style={{background:`${accent}18`, border:`1px solid ${accent}30`}}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* ── Two deeper cards ── */}
            <div className="grid md:grid-cols-2 gap-4 mb-14">

              {/* AI Verification */}
              <Reveal>
                <div className="h-full rounded-2xl border flex flex-col overflow-hidden hl" style={{borderColor:'#C2714F25', background:'#181510'}}>
                  <div className="flex flex-1">
                    <div className="w-1 flex-shrink-0" style={{background:'#C2714F'}}/>
                    <div className="p-6 flex flex-col gap-5 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-lg border text-xs font-bold" style={{borderColor:'#C2714F30', background:'#C2714F15', color:'#C2714F'}}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Ghana's First
                          </div>
                          <h3 className="text-lg font-black text-white mb-2">AI-Verified Sellers — Not Just Email Checks</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Every seller on UniMart is verified by <strong className="text-gray-200">RIRI.ai</strong> — our AI cross-checks identity, product authenticity, and listing accuracy before anything goes live. Students use their <strong className="text-gray-200">.edu email</strong>. Brands are verified through <strong className="text-gray-200">AI-assisted document and product authentication</strong>. Ghana has never seen this level of commerce trust.
                          </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'#C2714F20', border:'1px solid #C2714F30'}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2714F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                        </div>
                      </div>

                      {/* Who can sell */}
                      <div className="rounded-xl p-4 border" style={{background:'#0F0D08', borderColor:'#C2714F18'}}>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Who Can Sell on UniMart</p>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { Icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10-5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, title: "University Students",  desc: "Verified by .edu email",    col:"#C9920A" },
                            { Icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,  title: "Campus Vendors",      desc: "Local business owners",   col:"#C2714F" },
                            { Icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg>, title: "Product Brands",      desc: "AI-verified businesses",  col:"#2D6A4F" },
                            { Icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Campus Entrepreneurs", desc: "Food, services & more",   col:"#C9920A" },
                          ].map(({ Icon, title, desc, col }) => (
                            <div key={title} className="flex items-center gap-2.5 rounded-xl p-2.5" style={{background:'#1A1710', border:`1px solid ${col}20`}}>
                              <span style={{color:col}}>{Icon}</span>
                              <div>
                                <p className="text-[11px] font-black text-white leading-none">{title}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Student Entrepreneurship */}
              <Reveal>
                <div className="h-full rounded-2xl border flex flex-col overflow-hidden hl" style={{borderColor:'#C9920A25', background:'#181510'}}>
                  <div className="flex flex-1">
                    <div className="w-1 flex-shrink-0" style={{background:'#C9920A'}}/>
                    <div className="p-6 flex flex-col gap-5 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-lg border text-xs font-bold" style={{borderColor:'#C9920A30', background:'#C9920A15', color:'#C9920A'}}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                            Student Infrastructure
                          </div>
                          <h3 className="text-lg font-black text-white mb-2">Africa's Student Entrepreneurial Infrastructure</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            UniMart is the <strong className="text-gray-200">economic backbone for the next generation of African entrepreneurs</strong>. Every student who lists is building a business. Every campus becomes a thriving economy. We provide the AI, payments, logistics, and community — so students can <strong className="text-gray-200">focus on building, not barriers.</strong>
                          </p>
                        </div>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'#C9920A20', border:'1px solid #C9920A30'}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9920A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {["Free to Start", "AI Business Tools", "MoMo Payments", "Campus Delivery Network", "Zero Commission", "Mentorship Network"].map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-lg text-gray-300" style={{background:'#C9920A18', border:'1px solid #C9920A30'}}>{tag}</span>
                        ))}
                      </div>

                      {/* Three metrics */}
                      <div className="grid grid-cols-3 gap-3 rounded-xl p-4 border mt-auto" style={{background:'#0F0D08', borderColor:'#C9920A18'}}>
                        {[
                          { v: "500+",  l: "Student Entrepreneurs" },
                          { v: "15+",   l: "Campuses"              },
                          { v: "2030",  l: "Pan-Africa Target"      },
                        ].map(({ v, l }) => (
                          <div key={l} className="text-center">
                            <p className="text-xl font-black leading-none" style={{color:'#C9920A'}}>{v}</p>
                            <p className="text-[9px] text-gray-500 font-semibold mt-1 leading-snug">{l}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Stat bar ── */}
            <Reveal>
              {/* Section divider with diamond */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px" style={{background:'linear-gradient(to right, transparent, #C2714F33)'}}/>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <polygon points="6,0 12,6 6,12 0,6" fill="#C2714F" opacity="0.7"/>
                  <polygon points="6,2 10,6 6,10 2,6" fill="none" stroke="#C9920A" strokeWidth="1"/>
                </svg>
                <div className="flex-1 h-px" style={{background:'linear-gradient(to left, transparent, #C2714F33)'}}/>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border" style={{borderColor:'#C2714F20'}}>
                {[
                  { v: "#1",    l: "AI E-Commerce Platform in Africa",  accent: "#C2714F" },
                  { v: "2 min", l: "To list any product with AI",        accent: "#C9920A" },
                  { v: "0%",    l: "Commission — always free to sell",   accent: "#2D6A4F" },
                  { v: "2030",  l: "Target: 500+ African campuses",      accent: "#C2714F" },
                ].map(({ v, l, accent }, idx) => (
                  <div key={l} className="px-6 py-8 text-center" style={{background: idx % 2 === 0 ? '#181510' : '#141208', borderRight:'1px solid #C2714F15'}}>
                    <p className="text-3xl sm:text-4xl font-black leading-none mb-2" style={{color:accent}}>{v}</p>
                    <p className="text-xs text-gray-500 font-semibold leading-snug">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ── CTA ── */}
            <Reveal className="mt-12 text-center">
              <p className="text-gray-500 text-sm mb-6">Be part of history. The first generation of African students to build and trade on an AI platform.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => document.getElementById("join-marketplace")?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-2.5 text-white font-black px-8 py-4 rounded-2xl transition-colors"
                  style={{background:'#C2714F'}}
                  onMouseEnter={e=>(e.currentTarget.style.background='#A85F3F')}
                  onMouseLeave={e=>(e.currentTarget.style.background='#C2714F')}
                >
                  Join the Movement
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-black px-8 py-4 rounded-2xl transition-colors"
                  style={{border:'1px solid #C2714F40', color:'#C9920A'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#C2714F80'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#C2714F40'}}
                >
                  <Store className="w-5 h-5" /> List a Product Now
                </a>
              </div>
            </Reveal>

          </div>
        </section>

        {/* Single app screen */}
        <section className="py-8 flex justify-center">
          <div className="w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] md:w-[300px] md:h-[580px] bg-gray-950 rounded-[40px] p-3 shadow-2xl border border-orange-500/20 overflow-hidden">
            <img src={IMG.appScreens[0]} alt="UniMart app" className="w-full h-full object-cover rounded-[32px]" />
          </div>
        </section>

        <About />

        {/* List Promo */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100">
            <Reveal className="order-2 md:order-1">
              <img src={IMG.featureImg} alt="List your product" className="w-full max-w-sm rounded-2xl shadow-lg object-cover mx-auto hl" />
            </Reveal>
            <Reveal className="order-1 md:order-2 space-y-5">
              <span className="inline-block text-[9px] font-black text-orange-500 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full uppercase tracking-widest">Free for First 500 · AI-Powered</span>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">List any product for free — in under 2 minutes</h3>
              <p className="text-gray-400 leading-relaxed">Take a photo. Our AI does the rest — title, description, price, tags, fake detection. All generated automatically. No other platform in Africa offers this. <strong className="text-gray-700">Zero commission. Always.</strong></p>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-2">
                {["RIRI.ai writes your listing from a single photo", "AI-suggested pricing keeps you competitive", "Reach buyers at 15+ universities instantly", "Cheaper listings than any other platform in Ghana"].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />{item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-black transition-colors shadow-md shadow-orange-100 inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> List for Free
                </a>
                <button onClick={() => go("about")} className="border-2 border-orange-200 hover:border-orange-400 text-orange-500 px-6 py-3 rounded-xl font-black transition-colors">Learn More</button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Vendor CTA */}
        <section id="onboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="inline-block text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">Limited Time</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">Ready to Start Selling?</h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join hundreds of student vendors already listing their products. Takes under 2 minutes — completely free.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a
                  href={LISTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-base rounded-2xl shadow-xl shadow-orange-200/60 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" /> List Your Product Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-sm text-gray-400 flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" />Free listing · 0% commission</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
                {[
                  { Icon: Clock,      v: "2 min", l: "to list"    },
                  { Icon: Users,      v: "10K+",  l: "buyers"     },
                  { Icon: TrendingUp, v: "0%",    l: "commission" },
                  { Icon: Shield,     v: "24/7",  l: "support"    },
                ].map(({ Icon, v, l }) => (
                  <div key={l} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hl text-center">
                    <Icon className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <p className="text-xl font-black text-orange-500">{v}</p>
                    <p className="text-xs text-gray-400">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Everything traditional e-commerce can't do — we do with AI</h2>
              <p className="text-gray-400 max-w-xl mx-auto">RIRI.ai is the backbone. Every feature is powered by artificial intelligence designed for African students.</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { Icon: Zap,        title: "AI Listing in 2 Minutes",    desc: "RIRI.ai reads your photo and generates the perfect listing — title, description, price, and tags — automatically. Africa's first."         },
                { Icon: Shield,     title: "Fake Product Detection",     desc: "Our AI inspects every image for counterfeit Nike, Gucci, Apple and more. Fakes are flagged before they ever go live."                     },
                { Icon: TrendingUp, title: "Cheapest Prices on Campus",  desc: "AI-powered pricing ensures your products are always competitively priced — cheaper than WhatsApp groups, social media, or any other app." },
                { Icon: Globe2,     title: "Pan-African Scale",          desc: "Built to expand from UENR to every African campus. 15+ universities today. 500+ by 2030. Your listing reaches them all."                  },
              ].map(({ Icon, title, desc }) => (
                <Reveal key={title}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hl flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="font-black text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <span className="inline-block text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">How It Works</span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-3">AI does the work.<br />You just show up.</h2>
              <p className="text-gray-400 max-w-xl mx-auto">No forms to fill. No pricing research. No writing descriptions. RIRI.ai handles it all — making UniMart the fastest way to sell anything on any African campus.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: "01", Icon: ShoppingBag, title: "Snap a Photo",       desc: "That's literally it. Take a picture of your item — RIRI.ai reads it, generates a title, description, price, and tags instantly."      },
                { n: "02", Icon: Zap,         title: "AI Lists It for You", desc: "Our AI fills your entire listing in seconds, checks for fakes, and suggests the most competitive price on campus. Africa's first."   },
                { n: "03", Icon: CreditCard,  title: "Get Paid Safely",     desc: "Receive MoMo or card payments. Funds are only released once the buyer confirms receipt. No scams. No waiting."                        },
              ].map(({ n, Icon, title, desc }) => (
                <Reveal key={n}>
                  <div className="relative bg-orange-50 rounded-3xl p-8 border border-orange-100 hl text-center">
                    <span className="absolute top-4 right-5 text-5xl font-black text-orange-200 select-none">{n}</span>
                    <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-200/60">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Trusted by Students</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Hear what your fellow students are saying</p>
            </Reveal>
            <Reviews />
          </div>
        </section>

        {/* College banner */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <Reveal className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-black text-orange-500 mb-4 leading-tight">The smartest way to buy and sell on campus — powered by AI</h2>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">UniMart is not just changing how students trade — it is rewriting what African commerce can be. AI-generated listings. Cheaper prices. Verified sellers. Built from a dorm room, scaling to a continent.</p>
              <ul className="space-y-3">
                {[
                  "AI writes your listing from a single photo",
                  "Cheapest campus prices — guaranteed by AI pricing",
                  "Swap items with verified students across universities",
                  "Fake product detection on every single listing",
                  "MoMo payments, campus delivery, zero commission",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-500 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="flex-1 flex justify-center">
              <img src={IMG.collegeScreen} alt="UniMart mobile" className="w-full max-w-xs rounded-2xl shadow-xl border border-orange-100 hl" />
            </Reveal>
          </div>
        </section>

        {/* Banner image */}
        <section className="relative h-52 sm:h-64 overflow-hidden group">
          <img src={IMG.bannerImg} alt="Shop Big, Pay Less" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
            <img src={IMG.logo} alt="Uni-Mart" className="h-14 w-14 rounded-2xl object-cover shadow-lg" />
            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">Shop Big, Pay Less</h2>
          </div>
        </section>

        {/* Free listing strip */}
        <section className="py-5 flex justify-center px-4">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg px-8 py-4 text-center">
            <p className="text-white font-black text-lg sm:text-xl">Free listing for first 500 vendors!</p>
          </div>
        </section>

        {/* Countdown */}
        <section className="py-14 flex justify-center px-4">
          <Countdown target="2026-03-25T00:00:00Z" />
        </section>

        {/* App screens slider */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">See UniMart in Action</h2>
              <p className="text-gray-400 text-sm">Built for students, running on campus</p>
            </Reveal>
            <AppSlider />
          </div>
        </section>


        {/* Waitlist */}
        <section id="join-marketplace" className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50 border-y border-orange-100">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="inline-block text-[9px] font-black text-orange-500 bg-white border border-orange-200 px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 shadow-sm">Get Early Access</span>
              <h2 className="text-4xl font-black text-gray-900 mb-3">Join the Waitlist</h2>
              <p className="text-gray-400 text-lg mb-8">Use your university email to get early access.</p>
            </Reveal>
            <form
              onSubmit={async e => {
                e.preventDefault()
                if (!email) return
                setSubLoad(true)
                try {
                  const fd = new FormData(); fd.append("email", email)
                  const res = await fetch(zapierUrl, { method: "POST", body: fd })
                  if (res.ok) { setSubDone(true); setEmail(""); setPopup(true) }
                  else alert("Failed to join. Please try again.")
                } catch { alert("Failed to join. Please try again.") }
                setSubLoad(false)
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input type="email" required placeholder="yourname@uenr.edu.gh" value={email}
                onChange={e => setEmail(e.target.value)} disabled={subLoad || subDone}
                className="flex-1 px-4 py-3 rounded-xl border border-orange-200 bg-white shadow-sm outline-none focus:border-orange-400 transition-colors text-sm" />
              <Button type="submit" disabled={subLoad || subDone}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 rounded-xl transition-colors">
                {subLoad ? "Joining…" : subDone ? "✓ Done!" : "Join Now"}
              </Button>
            </form>
            {subDone && <p className="mt-4 text-sm text-green-600 font-bold">✓ Check your email — you're all set!</p>}
            {popup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full flex flex-col items-center border border-orange-100 ani-fade">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-black text-orange-500 mb-2">Thank you!</h3>
                  <p className="text-gray-400 text-center mb-6">You've joined the UniMart waitlist.<br /><span className="font-bold text-orange-500">Check your email for updates.</span></p>
                  <Button onClick={() => setPopup(false)} className="bg-orange-500 hover:bg-orange-600 text-white font-black px-8 rounded-xl">OK</Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <Volunteer />
        <Community />
        <FAQ />

        {/* Footer */}
        <footer className="bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2.5">
              <img src={IMG.logo} alt="Uni-Mart" className="w-9 h-9 rounded-xl object-cover" />
              <span className="text-xl font-black text-orange-500">Uni-Mart</span>
            </div>
            <div className="w-10 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Powered by ZeroOne Labs</span>
            <p className="text-base font-black text-orange-500">Shop Big, Spend Less</p>
            <div className="flex flex-wrap justify-center gap-5 mt-2">
              {links.slice(0, 6).map(({ l, id }) => (
                <button key={id} onClick={() => go(id)} className="text-xs text-gray-500 hover:text-orange-400 font-semibold transition-colors">{l}</button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">© 2025 UniMart. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <UniBot />
    </>
  )
}