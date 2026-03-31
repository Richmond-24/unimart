
"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, Users, TrendingUp, Award, Shield, Gift, Menu, X,
  MessageCircle, CheckCircle, Target, Eye, Lightbulb, Globe2,
  Zap, Store, Repeat2, BadgeCheck, Truck, CreditCard,
  ShoppingBag, Clock, Star, PlusCircle,
  Twitter, Facebook, Instagram, Linkedin, Youtube, ChevronDown, ChevronRight,
} from "lucide-react"

// ─── LINKS ───────────────────────────────────────────────────────────────────
const LISTING_URL   = "https://unimart-listing.vercel.app"
const VOLUNTEER_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfSNoYY8mU_d5UCzAAaMlawoRCyaRyYEipr10O-EVzSJEipig/viewform?usp=publisheditor"
const WHATSAPP_URL  = "https://chat.whatsapp.com/K8uMXmGYJJGJvwP9QVEYn0"

// ─── IMAGES ──────────────────────────────────────────────────────────────────
const IMG = {
  logo:          "/logo2.png",
  heroMain:      "/uni.webp",
  heroSecond:    "/image3.jpg",
  heroThird:     "/africa.webp",
  heroFourth:    "/image1.jpg",
  aboutTop:      "/home1.jpg",
  aboutBottom:   "/unisd.webp",
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, on }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, on } = useReveal()
  return <div ref={ref} className={`rv ${on ? "rv-on" : ""} ${className}`}>{children}</div>
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
      ))}
    </div>
  )
}

function WaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function Countdown({ target }: { target: string }) {
  const calc = useCallback(() => {
    const d = Math.max(new Date(target).getTime() - Date.now(), 0)
    return {
      days:  Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      mins:  Math.floor((d % 3600000) / 60000),
      secs:  Math.floor((d % 60000) / 1000),
    }
  }, [target])
  const [t, setT] = useState(calc)
  const [rdy, setRdy] = useState(false)
  useEffect(() => {
    setRdy(true)
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])
  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
        <span className="text-teal-500 text-[10px] font-black uppercase tracking-[0.22em]">Launching</span>
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
      </div>
      <p className="text-teal-500 text-2xl sm:text-3xl font-black mb-8">25 March 2026</p>
      {rdy && (
        <div className="flex gap-3 sm:gap-5">
          {[{ v: t.days, l: "Days" }, { v: t.hours, l: "Hours" }, { v: t.mins, l: "Mins" }, { v: t.secs, l: "Secs" }].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center bg-white border-2 border-teal-100 rounded-2xl px-4 py-4 sm:px-8 sm:py-6 min-w-[64px] sm:min-w-[100px] shadow-sm">
              <span className="text-3xl sm:text-5xl font-black text-teal-500 tabular-nums leading-none">{String(v).padStart(2, "0")}</span>
              <span className="text-[10px] sm:text-xs font-black text-teal-300 uppercase tracking-widest mt-2">{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── APP SLIDER ──────────────────────────────────────────────────────────────
function AppSlider() {
  const [i, setI] = useState(0)
  const screens = IMG.appScreens
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % screens.length), 3500)
    return () => clearInterval(t)
  }, [screens.length])
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center gap-4">
        <button
          onClick={() => setI(p => (p - 1 + screens.length) % screens.length)}
          className="hidden sm:flex w-10 h-10 rounded-full bg-white border-2 border-teal-100 items-center justify-center hover:border-teal-400 transition-colors shadow-sm"
        >
          <ChevronRight className="w-5 h-5 text-teal-500 rotate-180" />
        </button>
        <div className="w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] bg-gray-950 rounded-[36px] p-2.5 shadow-2xl border-4 border-white ring-1 ring-teal-100 overflow-hidden">
          <img key={i} src={screens[i]} alt={`UniMart screen ${i + 1}`} className="w-full h-full object-cover rounded-[28px] ani-fade" />
        </div>
        <button
          onClick={() => setI(p => (p + 1) % screens.length)}
          className="hidden sm:flex w-10 h-10 rounded-full bg-white border-2 border-teal-100 items-center justify-center hover:border-teal-400 transition-colors shadow-sm"
        >
          <ChevronRight className="w-5 h-5 text-teal-500" />
        </button>
      </div>
      <div className="flex gap-2 mt-5 justify-center">
        {screens.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-7 bg-teal-500" : "w-2 bg-teal-200"}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── UNIVERSITIES MARQUEE ────────────────────────────────────────────────────
function UnisMarquee() {
  return (
    <section id="universities" className="py-12 bg-white border-y border-teal-50 overflow-hidden">
      <p className="text-center text-[10px] font-black text-teal-300 uppercase tracking-[0.2em] mb-8">
        Trusted by students across Ghana
      </p>
      <div className="overflow-hidden relative">
        <div className="flex gap-14 marquee">
          {[...IMG.unis, ...IMG.unis].map((u, i) => (
            <div key={i} className="flex flex-col items-center min-w-[110px] opacity-60 hover:opacity-100 transition-opacity">
              <img src={u.src} alt={u.name} className="h-10 sm:h-12 object-contain mb-2" />
              <span className="text-xs text-gray-400 text-center font-semibold">{u.name}</span>
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
  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % IMG.reviews.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <div>
      <div className="hidden sm:grid sm:grid-cols-3 gap-5">
        {IMG.reviews.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl border border-teal-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="relative mb-4">
              <img src={r.src} alt={r.name} className="w-14 h-14 rounded-full object-cover border-2 border-teal-200" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-white" />
            </div>
            <span className="text-sm font-black text-teal-500 mb-2">{r.name}</span>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed italic">"{r.text}"</p>
            <Stars n={r.stars} />
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        <div key={cur} className="bg-white rounded-2xl border border-teal-100 p-6 flex flex-col items-center text-center mx-2 ani-fade shadow-sm">
          <img src={IMG.reviews[cur].src} alt={IMG.reviews[cur].name} className="w-14 h-14 rounded-full object-cover border-2 border-teal-200 mb-3" />
          <span className="text-sm font-black text-teal-500 mb-1">{IMG.reviews[cur].name}</span>
          <p className="text-sm text-gray-400 mb-3 italic">"{IMG.reviews[cur].text}"</p>
          <Stars n={IMG.reviews[cur].stars} />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {IMG.reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              className={`h-2 rounded-full transition-all ${i === cur ? "w-5 bg-teal-500" : "w-2 bg-teal-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── VOLUNTEER ────────────────────────────────────────────────────────────────
function Volunteer() {
  const perks = [
    { Icon: Zap,        text: "Early access to new UniMart features"         },
    { Icon: Award,      text: "Certificates & recommendation letters"        },
    { Icon: TrendingUp, text: "Hands-on experience in tech, marketing & ops" },
    { Icon: Users,      text: "Network with founders, sellers & partners"    },
    { Icon: Gift,       text: "Volunteer rewards, badges & UniMart credits"  },
    { Icon: Shield,     text: "Priority access to future paid roles"         },
  ]
  return (
    <section id="volunteer" className="py-20 bg-white border-t border-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-teal-500 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full uppercase tracking-widest mb-5">
            <Zap className="w-3 h-3" /> Community Program
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">Become a UniMart Volunteer</h2>
          <p className="text-gray-400 text-base mb-8 leading-relaxed">Help grow UniMart across campuses. Learn real skills, build your network, and earn rewards while making a real impact on student commerce.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {perks.map(({ Icon, text }, i) => (
              <div key={i} className="flex gap-3 items-center p-3 bg-teal-50 rounded-xl border border-teal-100">
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-teal-200">
                  <Icon className="w-4 h-4 text-teal-500" />
                </span>
                <span className="text-sm text-gray-600 leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-teal-500 rounded-3xl overflow-hidden shadow-xl shadow-teal-200/60">
            <div className="px-8 pt-10 pb-6 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Join Our Volunteer Team</h3>
              <p className="text-white/80 text-sm leading-relaxed">Be part of the team building Africa's largest student marketplace.</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/20 bg-teal-600/40">
              {[{ v: "500+", l: "Volunteers" }, { v: "15+", l: "Campuses" }, { v: "Free", l: "To Join" }].map(({ v, l }) => (
                <div key={l} className="py-5 text-center">
                  <p className="text-xl font-black text-white">{v}</p>
                  <p className="text-[10px] text-white/70 font-semibold uppercase tracking-widest mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <div className="px-8 py-8 bg-white flex flex-col items-center gap-3">
              <a
                href={VOLUNTEER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-black text-base px-8 py-4 rounded-2xl transition-colors shadow-md shadow-teal-200/60"
              >
                <Zap className="w-5 h-5" />
                Sign Up as a Volunteer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal-500" />
                Takes less than 2 minutes · No fees
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  const pillars = [
    { Icon: Target,    title: "Mission",  text: "Empower every African student with AI-powered commerce — list in 2 minutes, buy at the lowest campus prices.",        bg: "bg-teal-50",  c: "bg-teal-500"  },
    { Icon: Eye,       title: "Vision",   text: "Africa's first AI e-commerce network — 500+ campuses and 1M+ students by 2030, starting in Ghana.",                 bg: "bg-teal-50",  c: "bg-teal-400"  },
    { Icon: Lightbulb, title: "AI-First", text: "RIRI.ai auto-generates listings from photos, detects fakes, and suggests the best price — in under 2 minutes.",     bg: "bg-teal-50",  c: "bg-teal-500"  },
    { Icon: Globe2,    title: "Impact",   text: "From Sunyani to Accra, Kumasi to Tamale — keeping money circulating within African student communities.",            bg: "bg-teal-50",  c: "bg-teal-400"  },
  ]
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-teal-500 bg-teal-50 border border-teal-200 px-5 py-2 rounded-full uppercase tracking-widest mb-5">
            <BadgeCheck className="w-3.5 h-3.5" /> About UniMart
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
            Built for Students,<br /><span className="text-teal-500">Powered by AI.</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            UniMart is <strong className="text-gray-700">Africa's first fully AI-driven e-commerce platform</strong> — replacing the chaos of WhatsApp group buying and social media scams with a verified, intelligent, and affordable campus marketplace.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
          <Reveal>
            <div className="relative h-[380px] sm:h-[420px]">
              <img src={IMG.aboutTop} alt="Students collaborating" className="absolute top-0 left-0 w-[68%] h-[250px] sm:h-[270px] object-cover rounded-3xl shadow-xl border-4 border-white" />
              <img src={IMG.aboutBottom} alt="Campus marketplace"  className="absolute bottom-0 right-0 w-[56%] h-[200px] sm:h-[210px] object-cover rounded-3xl shadow-lg border-4 border-white" />
              <div className="absolute bottom-20 left-3 z-10 bg-white rounded-2xl shadow-lg px-4 py-3 border border-teal-100 flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-500"><BadgeCheck className="w-5 h-5 text-white" /></span>
                <div><p className="text-xs font-black text-gray-800 leading-none">AI-Verified</p><p className="text-[11px] text-gray-400">Every seller checked</p></div>
              </div>
              <div className="absolute top-3 right-3 z-10 bg-teal-500 text-white rounded-2xl shadow-lg px-4 py-3 text-center">
                <p className="text-2xl font-black leading-none">50K+</p>
                <p className="text-[11px] font-semibold opacity-90">Students Waiting</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-3 block">Who We Are</span>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 leading-tight">A team of African students building the continent's first AI commerce platform</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">UniMart was born out of frustration. Students across Ghana were losing money to fake products, social media scams, and had no easy way to sell unused goods.</p>
            <p className="text-gray-400 mb-4 leading-relaxed">From a dorm room at UENR, we built <strong className="text-gray-700">RIRI.ai</strong> — an AI that looks at a product photo, writes the listing, detects fakes, prices it correctly, and finds buyers. <strong className="text-gray-700">No African platform had done this before. We did it first.</strong></p>
            <p className="text-gray-400 mb-8 leading-relaxed">Our goal: become the commerce infrastructure for every African campus by 2030.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: Store, v: "15+", l: "Universities" },
                { Icon: BadgeCheck, v: "AI ✓", l: "Every Listing" },
                { Icon: Clock, v: "2 min", l: "To List" },
                { Icon: Users, v: "50K+", l: "Students" },
              ].map(({ Icon, v, l }, i) => (
                <div key={i} className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-500 flex-shrink-0"><Icon className="w-4 h-4 text-white" /></span>
                  <div><p className="text-lg font-black text-teal-500 leading-none">{v}</p><p className="text-xs text-gray-400 font-medium">{l}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map(({ Icon, title, text, c, bg }, i) => (
              <div key={i} className={`${bg} rounded-2xl p-6 border border-teal-100 group hover:-translate-y-1 transition-all duration-200`}>
                <span className={`flex items-center justify-center w-11 h-11 rounded-2xl ${c} text-white mb-4`}><Icon className="w-5 h-5" /></span>
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

// ─── AFRICA'S FIRST — redesigned: teal + white only, human-friendly ────────
function AfricaFirst() {
  return (
    <section id="africa-first" className="py-20 bg-teal-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-teal-500 bg-white px-5 py-2 rounded-full uppercase tracking-widest mb-6">
            <Globe2 className="w-3.5 h-3.5" /> A Historic Moment for Africa
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] mb-5">
            Ghana's first fully<br />
            <span className="bg-white text-teal-500 px-3 rounded-xl inline-block mt-1">AI-verified</span>{" "}
            <span className="text-white">marketplace.</span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Not just a marketplace. A complete, intelligent commerce infrastructure built in Africa, for Africa, by Africans. Starting on campus. Scaling to the continent.
          </p>
        </Reveal>

        {/* Four declaration cards */}
        <Reveal className="mb-12">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                Icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                title: "Ghana's First Fully AI-Verified Marketplace",
                body: "Every listing is scanned by RIRI.ai before it goes live — fake products are caught, sellers are verified, and buyers are protected. Ghana has never had this level of commerce trust.",
              },
              {
                Icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
                title: "Sellers Verified by AI — Not Just Emails",
                body: "Students use their .edu email. Brands and campus businesses go through AI-assisted product and document authentication. No shortcuts, no loopholes.",
              },
              {
                Icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                title: "Students and Brands Both Sell Here",
                body: "UniMart is open to university students, campus vendors, local product brands, and campus entrepreneurs — food sellers, tailors, photographers, tutors and more.",
              },
              {
                Icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
                title: "Built on Student Entrepreneurial Infrastructure",
                body: "Every student who lists is building a business. We give them the AI, payments, and logistics — so they focus on hustling, not on paperwork or tech barriers.",
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 flex gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-500 mt-0.5">
                  {Icon}
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 mb-2 leading-snug">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Who can sell row */}
        <Reveal className="mb-12">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-4 text-center">Who Can Sell on UniMart</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { Icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10-5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, title: "University Students", desc: "Verified by .edu email" },
                { Icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>, title: "Campus Vendors", desc: "Local business owners" },
                { Icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg>, title: "Product Brands", desc: "AI-verified businesses" },
                { Icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Campus Entrepreneurs", desc: "Food, services & more" },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <span className="text-white flex-shrink-0">{Icon}</span>
                  <div>
                    <p className="text-sm font-black text-white leading-none">{title}</p>
                    <p className="text-[11px] text-white/60 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Stat bar */}
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { v: "#1",    l: "AI E-Commerce Platform in Africa" },
              { v: "2 min", l: "To list any product with AI"      },
              { v: "0%",    l: "Commission — always free to sell" },
              { v: "2030",  l: "Target: 500+ African campuses"    },
            ].map(({ v, l }) => (
              <div key={l} className="bg-white rounded-2xl px-5 py-6 text-center">
                <p className="text-3xl sm:text-4xl font-black text-teal-500 leading-none mb-2">{v}</p>
                <p className="text-xs text-gray-400 font-semibold leading-snug">{l}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => document.getElementById("join-marketplace")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-teal-500 font-black px-8 py-4 rounded-2xl hover:bg-teal-50 transition-colors shadow-sm"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-white/50 text-white font-black px-8 py-4 rounded-2xl hover:border-white hover:bg-white/10 transition-colors"
            >
              <Store className="w-5 h-5" /> List a Product Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "What is UniMart?", a: "UniMart is Ghana's first verified campus marketplace — built exclusively for students to buy, sell, and swap items safely. From textbooks to electronics, dorm furniture to food, UniMart connects students across 15+ campuses." },
  { q: "Who can use UniMart?", a: "UniMart is open to all students in Ghanaian universities. Sellers verify with a university email (.edu.gh). Buyers can browse freely. Campus vendors and product brands can also apply to sell through AI-assisted verification." },
  { q: "Is it free to list my products?", a: "Yes — completely free for the first 500 vendors, with zero commission on sales. We believe every student deserves a fair chance to earn." },
  { q: "How do I list a product?", a: "Visit unimart-listing.vercel.app, upload a photo of your item, and RIRI.ai automatically fills in the title, description, price, and tags. The whole process takes under 2 minutes." },
  { q: "How does UniMart keep me safe from scams?", a: "Every seller is verified with a university email. RIRI.ai scans every listing for counterfeit products before they go live. Listings are also reviewed by our admin team. Payments are held securely — funds are only released when the buyer confirms receipt." },
  { q: "Can UniMart detect fake products?", a: "Yes. RIRI.ai is trained to detect counterfeits of major brands — Nike, Adidas, Gucci, Rolex, Apple, Samsung, Supreme and more. It inspects logos, stitching, proportions, and build quality before any listing goes live." },
  { q: "Which universities does UniMart support?", a: "Currently UENR, KNUST, UDS, Catholic University, STU, and Ashesi University. We are expanding to all Ghanaian universities. Join the waitlist to be notified when we launch at your campus." },
  { q: "What payment methods are supported?", a: "UniMart supports MTN Mobile Money (MoMo), Telecel Cash, and card payments. All transactions are secured and encrypted." },
  { q: "When does UniMart officially launch?", a: "UniMart officially launches on 25 March 2026. Join the waitlist with your university email to get early access and be among the first 500 free vendors." },
  { q: "Does UniMart offer delivery?", a: "Yes. Sellers choose Self Delivery or UniMart Riders — our campus delivery network. Rider fees are based on distance and shown transparently at checkout." },
  { q: "Can I sell food or services?", a: "Absolutely. UniMart has dedicated categories for Campus Food, Services (tutoring, printing, photography, repairs), and Events. Any student-run business is welcome." },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-teal-500 bg-teal-50 border border-teal-200 px-5 py-2 rounded-full uppercase tracking-widest mb-5">
            <MessageCircle className="w-3.5 h-3.5" /> FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight mb-3">
            Everything You <span className="text-teal-500">Need to Know</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">Common questions about UniMart — answered clearly.</p>
        </Reveal>

        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i}>
              <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${open === i ? "border-teal-300 bg-teal-50" : "border-gray-100 bg-white hover:border-teal-100"}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={`text-sm sm:text-base font-black leading-snug ${open === i ? "text-teal-600" : "text-gray-800"}`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${open === i ? "bg-teal-500 text-white rotate-180" : "bg-teal-50 text-teal-400"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 ani-fade">
                    <div className="h-px bg-teal-200 mb-4" />
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-7">
            <p className="text-gray-700 font-bold mb-1">Still have questions?</p>
            <p className="text-gray-400 text-sm mb-5">Chat with us on WhatsApp — we reply within minutes.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-black px-6 py-3 rounded-xl transition-colors">
              <WaIcon className="w-4 h-4 fill-white" /> Chat on WhatsApp
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
    <section id="community" className="py-20 bg-teal-50 border-t border-teal-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-teal-500 bg-white border border-teal-200 px-5 py-2 rounded-full uppercase tracking-widest mb-6">
            <MessageCircle className="w-3.5 h-3.5" /> Join the Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Be Part of Something Big</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Join 5,000+ students in our WhatsApp community. Get early access, exclusive deals, and campus updates.</p>

          <div className="bg-white rounded-3xl shadow-sm border border-teal-100 p-7 sm:p-10">
            <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center mx-auto mb-5 shadow-md">
              <WaIcon className="w-9 h-9 fill-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-1">UniMart Student Community</h3>
            <p className="text-sm text-gray-400 mb-5">5,000+ members · Ghana's biggest student marketplace group</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {["Deals", "Textbooks", "Earn Cash", "Launch News"].map(tag => (
                <span key={tag} className="text-xs bg-teal-50 text-teal-600 border border-teal-200 px-3 py-1 rounded-full font-bold">{tag}</span>
              ))}
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-black text-base rounded-2xl transition-colors shadow-md">
              <WaIcon className="w-5 h-5 fill-white flex-shrink-0" />
              Join WhatsApp Group
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-gray-400 mt-4">Free to join · No spam · Leave anytime</p>
          </div>

          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {[
              { href: "https://facebook.com/unimartgh",         Icon: Facebook,  bg: "bg-[#1877F2]" },
              { href: "https://twitter.com/unimartgh",          Icon: Twitter,   bg: "bg-[#1DA1F2]" },
              { href: "https://instagram.com/unimartgh",        Icon: Instagram, bg: "bg-gradient-to-r from-[#F58529] to-[#8134AF]" },
              { href: "https://linkedin.com/company/unimartgh", Icon: Linkedin,  bg: "bg-[#0A66C2]" },
              { href: "https://youtube.com/@unimartgh",         Icon: Youtube,   bg: "bg-[#FF0000]" },
            ].map(({ href, Icon, bg }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className={`${bg} text-white w-9 h-9 rounded-full flex items-center justify-center hover:opacity-85 transition-opacity shadow-sm`}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CHATBOT — fixed: one message only, proper sizing ────────────────────────
function UniBot() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!shown) {
      const t = setTimeout(() => { setOpen(true); setShown(true) }, 3000)
      return () => clearTimeout(t)
    }
  }, [shown])

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(320px,calc(100vw-32px))] ani-fade">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden">
            {/* Header */}
            <div className="bg-teal-500 px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-sm leading-none">UniMart</p>
                <p className="text-white/70 text-[11px] mt-0.5">Campus Marketplace · Ghana</p>
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0">
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Single welcome message */}
            <div className="p-4">
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                <p className="text-sm font-black text-gray-900 mb-1.5">Welcome to Uni-Mart 👋</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Ghana's first AI-powered campus marketplace. Buy, sell and swap safely with verified students across 15+ universities.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <a href={LISTING_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-black text-sm px-4 py-3 rounded-xl transition-colors">
                  <Store className="w-4 h-4" /> List a Product Free
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-teal-200 text-teal-500 hover:bg-teal-50 font-black text-sm px-4 py-3 rounded-xl transition-colors">
                  <WaIcon className="w-4 h-4 fill-teal-500" /> Join Our Community
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-teal-500 shadow-xl shadow-teal-300/50 flex items-center justify-center hover:bg-teal-600 transition-colors border-2 border-white focus:outline-none"
        aria-label="Open UniMart chat"
      >
        {open
          ? <X className="w-5 h-5 text-white" />
          : <Store className="w-5 h-5 text-white" />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
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
    { src: IMG.heroMain,   alt: "Students on campus",    span: "col-span-2", h: "h-44 sm:h-48" },
    { src: IMG.heroSecond, alt: "Campus vendor",         span: "col-span-1", h: "h-44 sm:h-48" },
    { src: IMG.heroThird,  alt: "Mobile shopping",       span: "col-span-1", h: "h-36 sm:h-40" },
    { src: IMG.heroFourth, alt: "Student marketplace",   span: "col-span-2", h: "h-36 sm:h-40" },
  ]
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {pics.map((p, i) => (
          <div key={i} className={`${p.span} ${p.h} rounded-2xl overflow-hidden shadow-md relative group`}>
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
      <div className="absolute -bottom-4 -left-3 z-10 bg-white rounded-2xl shadow-lg px-4 py-2.5 border border-teal-100 flex items-center gap-2.5">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-teal-500 flex-shrink-0"><Zap className="w-4 h-4 text-white" /></span>
        <div className="leading-tight"><p className="text-[11px] font-black text-gray-900">AI-Powered</p><p className="text-[10px] text-gray-400">Africa's First</p></div>
      </div>
      <div className="absolute -top-3 -right-3 z-10 bg-teal-500 text-white rounded-2xl shadow-lg px-3 py-2.5 text-center">
        <p className="text-xl font-black leading-none">50K+</p>
        <p className="text-[10px] font-semibold opacity-90">Students</p>
      </div>
    </div>
  )
}

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
        @keyframes fade    { from{opacity:0} to{opacity:1} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .ani-fade { animation: fade 0.35s ease both }
        .rv       { opacity:0; transform:translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease }
        .rv.rv-on { opacity:1; transform:translateY(0) }
        .marquee  { animation: marquee 30s linear infinite }

        ::-webkit-scrollbar       { width: 4px }
        ::-webkit-scrollbar-thumb { background: #14B8A6; border-radius: 4px }
        html { scroll-behavior: smooth; scroll-padding-top: 72px }
      `}</style>

      <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">

        {/* ── HEADER ── */}
        <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            <button onClick={() => go("hero")} className="flex items-center gap-2.5 flex-shrink-0">
              <img src={IMG.logo} alt="Uni-Mart logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
              <div>
                <span className="block text-[17px] font-black text-teal-500 leading-none">Uni-Mart</span>
                <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-0.5">by ComfyQuest</span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-5">
              {links.map(({ l, id }) => (
                <button key={id} onClick={() => go(id)}
                  className="text-sm font-semibold text-gray-500 hover:text-teal-500 transition-colors relative group">
                  {l}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href={LISTING_URL} target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-black px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-teal-200/60">
                <Store className="w-4 h-4" /> Become a Vendor
              </a>
              <button onClick={() => setNavOpen(v => !v)} className="lg:hidden p-2 rounded-xl hover:bg-teal-50 transition-colors">
                {navOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>
            </div>
          </div>

          {navOpen && (
            <div className="lg:hidden bg-white border-b border-teal-50 px-4 py-4 grid grid-cols-2 gap-1 shadow-lg ani-fade">
              {links.map(({ l, id }) => (
                <button key={id} onClick={() => go(id)}
                  className="text-sm font-semibold text-gray-600 hover:text-teal-500 hover:bg-teal-50 px-4 py-3 rounded-xl text-left transition-colors">
                  {l}
                </button>
              ))}
              <a href={LISTING_URL} target="_blank" rel="noopener noreferrer"
                className="col-span-2 mt-2 bg-teal-500 text-white font-black text-sm py-3 rounded-xl hover:bg-teal-600 flex items-center justify-center gap-2 transition-colors">
                <Store className="w-4 h-4" /> Become a Vendor
              </a>
            </div>
          )}
        </header>

        {/* ── HERO ── */}
        <section id="hero" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6 ani-fade">
              <div className="inline-flex items-center overflow-hidden rounded-full border border-teal-200 bg-white shadow-sm">
                <span className="bg-teal-500 text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-[0.16em] flex-shrink-0 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" /> Historic
                </span>
                <span className="px-4 py-1.5 text-[10px] font-black text-gray-700 uppercase tracking-[0.1em] flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                  Africa's First AI E-Commerce Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.06] text-gray-900">
                Africa's{" "}
                <span className="relative inline-block">
                  <span className="text-teal-500">smartest</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                    <path d="M4 5 Q50 1 100 5 Q150 9 196 4" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </span>{" "}
                campus marketplace
              </h1>

              <div className="bg-teal-500 rounded-2xl p-4 sm:p-5">
                <p className="text-white font-bold text-sm sm:text-base leading-relaxed">
                  We are building Africa's first fully AI-powered e-commerce platform — where any student can list, price, and sell in under 2 minutes, at prices cheaper than anywhere else on campus.
                </p>
              </div>

              <p className="text-base text-gray-500 max-w-lg leading-relaxed">
                Powered by <strong className="text-gray-800">RIRI.ai</strong> — our homegrown AI that auto-lists your products, detects fake items, suggests the best price, and connects you with buyers across 15+ Ghanaian universities.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => go("join-marketplace")}
                  className="group inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-black px-8 py-4 rounded-2xl shadow-md shadow-teal-200/60 transition-colors">
                  Join UniMart Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => go("about")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-teal-200 hover:border-teal-400 text-gray-700 hover:text-teal-500 font-black px-8 py-4 rounded-2xl transition-colors">
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
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white px-3 py-1.5 rounded-full border border-teal-100 shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-teal-500" />{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative ani-fade" style={{ animationDelay: "0.15s" }}>
              <HeroMosaic />
            </div>
          </div>
          <div className="block md:hidden mt-10"><UnisMarquee /></div>
        </section>

        <div className="hidden md:block"><UnisMarquee /></div>

        {/* ── AFRICA'S FIRST ── */}
        <AfricaFirst />

        {/* ── ABOUT ── */}
        <About />

        {/* ── FEATURES ── */}
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-teal-50 border-y border-teal-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
                Everything traditional e-commerce can't do — <span className="text-teal-500">we do with AI</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">RIRI.ai powers every feature, designed specifically for African students.</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { Icon: Zap,        title: "AI Listing in 2 Minutes",   desc: "RIRI.ai reads your photo and generates a complete listing — title, description, price, and tags — automatically."       },
                { Icon: Shield,     title: "Fake Product Detection",    desc: "Our AI inspects every image for counterfeit Nike, Gucci, Apple and more. Fakes are flagged before they go live."        },
                { Icon: TrendingUp, title: "Cheapest Prices on Campus", desc: "AI pricing ensures your products are always competitive — cheaper than WhatsApp groups, social media, or any other app." },
                { Icon: Globe2,     title: "Pan-African Scale",         desc: "Built to expand from UENR to every African campus. 15+ universities today. 500+ by 2030."                               },
              ].map(({ Icon, title, desc }) => (
                <Reveal key={title}>
                  <div className="bg-white rounded-2xl p-6 border border-teal-100 flex flex-col items-center text-center h-full shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-black text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-12">
              <span className="inline-block text-[9px] font-black text-teal-500 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">How It Works</span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-3">AI does the work.<br /><span className="text-teal-500">You just show up.</span></h2>
              <p className="text-gray-400 max-w-xl mx-auto">No forms to fill. No pricing research. No writing descriptions. RIRI.ai handles it all.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { n: "01", Icon: ShoppingBag, title: "Snap a Photo",        desc: "Take a picture of your item. That's it. RIRI.ai reads it and generates a complete listing instantly."                },
                { n: "02", Icon: Zap,         title: "AI Lists It for You", desc: "Our AI writes the title, description, and price, checks for fakes, and finds the most competitive market value."   },
                { n: "03", Icon: CreditCard,  title: "Get Paid Safely",     desc: "Receive MoMo or card payments. Funds are only released once the buyer confirms receipt. No scams, ever."           },
              ].map(({ n, Icon, title, desc }) => (
                <Reveal key={n}>
                  <div className="relative bg-teal-50 rounded-2xl p-7 border border-teal-100 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                    <span className="absolute top-4 right-5 text-5xl font-black text-teal-200 select-none">{n}</span>
                    <div className="w-13 h-13 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-5 w-14 h-14 shadow-md shadow-teal-200/60">
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

        {/* ── REVIEWS ── */}
        <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-teal-50 border-y border-teal-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Trusted by Students</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Hear what your fellow students are saying about UniMart</p>
            </Reveal>
            <Reviews />
          </div>
        </section>

        {/* ── VENDOR CTA (single, consolidated) ── */}
        <section id="onboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="bg-teal-500 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-block text-[9px] font-black bg-white text-teal-500 px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">Free for First 500 Vendors</span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">List your product for free — in under 2 minutes</h2>
                  <p className="text-white/80 leading-relaxed mb-6">Take a photo. Our AI writes the listing, prices it correctly, and connects you with buyers at 15+ universities. Zero commission. Always.</p>
                  <ul className="space-y-2 mb-8">
                    {["RIRI.ai writes your listing from one photo", "AI pricing based on real market data", "Reach buyers at 15+ universities instantly", "0% commission — you keep everything"].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-white/90">
                        <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                  <a href={LISTING_URL} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-white text-teal-500 font-black px-7 py-4 rounded-2xl hover:bg-teal-50 transition-colors shadow-sm">
                    <PlusCircle className="w-5 h-5" /> List Your Product Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { Icon: Clock,      v: "2 min", l: "To list"    },
                    { Icon: Users,      v: "10K+",  l: "Buyers"     },
                    { Icon: TrendingUp, v: "0%",    l: "Commission" },
                    { Icon: Shield,     v: "24/7",  l: "Support"    },
                  ].map(({ Icon, v, l }) => (
                    <div key={l} className="bg-white/15 rounded-2xl p-5 text-center border border-white/20">
                      <Icon className="w-5 h-5 text-white mx-auto mb-2 opacity-80" />
                      <p className="text-2xl font-black text-white">{v}</p>
                      <p className="text-xs text-white/70 font-semibold mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTDOWN ── */}
        <section className="bg-teal-50 border-y border-teal-100">
          <Countdown target="2026-03-25T00:00:00Z" />
        </section>

        {/* ── APP SLIDER ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">See UniMart in Action</h2>
              <p className="text-gray-400 text-sm">The app, built for campus commerce</p>
            </Reveal>
            <AppSlider />
          </div>
        </section>

        {/* ── WAITLIST ── */}
        <section id="join-marketplace" className="py-20 px-4 sm:px-6 lg:px-8 bg-teal-50 border-t border-teal-100">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <span className="inline-block text-[9px] font-black text-teal-500 bg-white border border-teal-200 px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 shadow-sm">Get Early Access</span>
              <h2 className="text-4xl font-black text-gray-900 mb-3">Join the Waitlist</h2>
              <p className="text-gray-400 text-lg mb-8">Use your university email to be among the first on the platform.</p>
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
              <input
                type="email" required placeholder="yourname@uenr.edu.gh" value={email}
                onChange={e => setEmail(e.target.value)} disabled={subLoad || subDone}
                className="flex-1 px-4 py-3 rounded-xl border border-teal-200 bg-white shadow-sm outline-none focus:border-teal-400 transition-colors text-sm"
              />
              <Button type="submit" disabled={subLoad || subDone}
                className="bg-teal-500 hover:bg-teal-600 text-white font-black px-6 rounded-xl transition-colors">
                {subLoad ? "Joining…" : subDone ? "✓ Done!" : "Join Now"}
              </Button>
            </form>
            {subDone && <p className="mt-4 text-sm text-green-600 font-bold">✓ Check your email — you're all set!</p>}
            {popup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full flex flex-col items-center border border-teal-100 ani-fade">
                  <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">You're in!</h3>
                  <p className="text-gray-400 text-center mb-6">You've joined the UniMart waitlist.<br /><span className="font-bold text-teal-500">Check your email for updates.</span></p>
                  <Button onClick={() => setPopup(false)} className="bg-teal-500 hover:bg-teal-600 text-white font-black px-8 rounded-xl">Got it</Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <Volunteer />
        <Community />
        <FAQ />

        {/* ── FOOTER ── */}
        <footer className="bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-5 text-center">
            <div className="flex items-center gap-2.5">
              <img src={IMG.logo} alt="Uni-Mart" className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <span className="block text-xl font-black text-teal-500 leading-none">Uni-Mart</span>
                <span className="block text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">by ComfyQuest</span>
              </div>
            </div>
            <div className="w-10 h-0.5 bg-teal-500 rounded-full" />
            <p className="text-base font-black text-teal-500">Shop Big, Spend Less</p>
            <div className="flex flex-wrap justify-center gap-5">
              {links.slice(0, 6).map(({ l, id }) => (
                <button key={id} onClick={() => go(id)} className="text-xs text-gray-500 hover:text-teal-400 font-semibold transition-colors">{l}</button>
              ))}
            </div>
            <div className="flex justify-center gap-3 mt-1">
              {[
                { href: "https://facebook.com/unimartgh",  Icon: Facebook,  bg: "bg-[#1877F2]" },
                { href: "https://twitter.com/unimartgh",   Icon: Twitter,   bg: "bg-[#1DA1F2]" },
                { href: "https://instagram.com/unimartgh", Icon: Instagram, bg: "bg-[#E4405F]"  },
              ].map(({ href, Icon, bg }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className={`${bg} text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-85 transition-opacity`}>
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">© 2025 UniMart. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <UniBot />
    </>
  )
}