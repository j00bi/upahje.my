'use client'

import { useState } from 'react'
import { LABOUR_CATEGORIES, type LabourCategoryId } from '@/lib/domain'
import type { LabourOnboardingData } from '../shared'

interface Message {
  role: 'bot' | 'user'
  text: string
  key?: string
}

interface LabourOnboardingChatProps {
  onComplete?: (data: LabourOnboardingData) => void
  onBack?: () => void
}

export function LabourOnboardingChat({ onComplete, onBack }: LabourOnboardingChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm here to help you set up your Labour profile on UpahJe. Ready to get started?" },
    { role: 'bot', text: "What's your full name? (as on your MyKad)" },
  ])
  const [input, setInput] = useState('')
  const [data, setData] = useState<Partial<LabourOnboardingData>>({ categories: [] })
  const [stage, setStage] = useState<'name' | 'phone' | 'mykad' | 'location' | 'cats' | 'rate' | 'avail' | 'bio' | 'done'>('name')

  const addBot = (text: string) => setMessages(m => [...m, { role: 'bot', text }])
  const addUser = (text: string, key?: string) => setMessages(m => [...m, { role: 'user', text, key }])
  const update = <K extends keyof LabourOnboardingData>(key: K, value: LabourOnboardingData[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  const handleSend = () => {
    if (!input.trim()) return

    const val = input.trim()
    addUser(val)
    setInput('')

      setTimeout(() => {
      if (stage === 'name') {
        update('fullName', val)
        addBot("Great, " + val.split(' ')[0] + ". What's the best WhatsApp number for clients?")
        setStage('phone')
      } else if (stage === 'phone') {
        update('phone', val)
        addBot("Thanks. For Labour work we need a quick MyKad verification (front & back). Is that okay? (reply YES to continue)")
        setStage('mykad')
      } else if (stage === 'mykad') {
        update('myKadUploaded', true)
        addBot("Perfect. Where do you usually work? (e.g. Ampang or Petaling Jaya)")
        setStage('location')
      } else if (stage === 'location') {
        update('location', val)
        addBot("Awesome. Now pick 2–4 services you offer best. Reply with numbers: 1=Rumah & Taman, 2=Haiwan, 3=Cucian, 4=Angkat, 5=Masakan, 6=Jagaan, 7=Kereta, 8=Elektrik, 9=Karpet, 10=Foto")
        setStage('cats')
      } else if (stage === 'cats') {
        // crude parse
        const nums = val.match(/\d+/g)?.map(Number) || [1,3]
        const chosen = nums.map(n => LABOUR_CATEGORIES[n-1]?.id).filter(Boolean) as LabourCategoryId[]
        update('categories', chosen.length ? chosen : ['rumah-taman', 'cucian'])
        addBot("Nice choices. What is your typical rate? (e.g. RM40 per job or RM30/hr)")
        setStage('rate')
      } else if (stage === 'rate') {
        update('rate', val)
        addBot("When are you usually free? (Weekdays / Weekends / Flexible)")
        setStage('avail')
      } else if (stage === 'avail') {
        update('availability', val)
        addBot("Last one — short bio? Tell clients why they should pick you (2 sentences max).")
        setStage('bio')
      } else if (stage === 'bio') {
        update('bio', val)
        addBot("All done! Here's what I captured. Say 'CONFIRM' to publish your profile.")
        setStage('done')
      } else if (stage === 'done' && val.toUpperCase().includes('CONFIRM')) {
        addBot("🎉 Profile created! Welcome to UpahJe. You'll appear in job matches within minutes.")
        setTimeout(() => onComplete?.(data as LabourOnboardingData), 800)
      }
    }, 420)
  }

  const quickReply = (text: string) => {
    setInput(text)
    // auto send after
    setTimeout(() => {
      const val = text
      addUser(val)
      setInput('')
      // duplicate logic simplified for demo
      if (stage === 'mykad' || stage === 'avail') {
        if (stage === 'mykad') {
          update('myKadUploaded', true)
        } else {
          update('availability', val)
        }
        const nextQ = stage==='mykad' ? "Where are you usually based?" : "What do you usually charge?"
        addBot(nextQ)
        setStage(stage==='mykad' ? 'location' : 'rate')
      }
    }, 50)
  }

  return (
    <div className="max-w-md mx-auto bg-white border rounded-3xl shadow overflow-hidden">
      <div className="px-5 py-4 bg-green-700 text-white flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">👷</div>
        <div>
          <div className="font-semibold">UpahJe Assistant</div>
          <div className="text-xs opacity-75">Labour profile setup • 2 min</div>
        </div>
      </div>

      <div className="h-[420px] overflow-y-auto p-5 space-y-4 bg-[#f8f9f7] text-sm" id="chat-scroll">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'bot' ? 'flex gap-2' : 'flex justify-end'}>
            {m.role === 'bot' && <div className="w-6 h-6 rounded bg-green-100 flex-shrink-0 mt-1 text-center text-[10px] pt-0.5">🤖</div>}
            <div className={`max-w-[82%] px-4 py-2.5 rounded-3xl ${m.role === 'bot' ? 'bg-white border' : 'bg-green-600 text-white'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {stage === 'mykad' && (
          <div className="flex gap-2 pl-8">
            <button onClick={() => quickReply('YES')} className="text-xs bg-white border px-3 py-1 rounded-full">YES</button>
          </div>
        )}
        {stage === 'avail' && (
          <div className="flex gap-2 pl-8 flex-wrap">
            {['Weekdays','Weekends','Flexible'].map(a => <button key={a} onClick={() => quickReply(a)} className="text-xs bg-white border px-3 py-1 rounded-full">{a}</button>)}
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your answer..."
            className="flex-1 border rounded-3xl px-5 py-3 text-sm focus:outline-green-600" 
          />
          <button onClick={handleSend} className="bg-green-600 text-white px-5 rounded-3xl text-sm font-medium">Send</button>
        </div>
        <button onClick={onBack} className="text-[10px] text-gray-400 mt-2 block mx-auto">← Back</button>
      </div>

      <p className="text-center text-[10px] text-gray-400 pb-3 -mt-1">Version C — Chat-style conversational onboarding</p>
    </div>
  )
}
