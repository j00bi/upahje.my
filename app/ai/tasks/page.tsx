'use client'

import { useState } from 'react'
import Link from 'next/link'

const MOCK_TASKS = [
  { id: 't1', title: 'Scrape product prices from 5 e-commerce sites', reward: 'RM 200', category: 'Web Scraping', difficulty: 'Medium', time: '3 hours', status: 'Open' },
  { id: 't2', title: 'Generate 50 product descriptions for MYR market', reward: 'RM 150', category: 'Content Writing', difficulty: 'Easy', time: '1 hour', status: 'Open' },
  { id: 't3', title: 'Analyze sentiment of 10,000 tweets (BM+EN)', reward: 'RM 500', category: 'Data Analysis', difficulty: 'Hard', time: '6 hours', status: 'Open' },
  { id: 't4', title: 'Translate 200 pages BM → EN with context preservation', reward: 'RM 800', category: 'Translation', difficulty: 'Hard', time: '8 hours', status: 'Open' },
  { id: 't5', title: 'Generate 30 social media graphics with AI', reward: 'RM 120', category: 'Image Gen', difficulty: 'Easy', time: '30 min', status: 'Open' },
  { id: 't6', title: 'Build a chatbot for customer support FAQ', reward: 'RM 1,000', category: 'AI Dev', difficulty: 'Hard', time: '12 hours', status: 'Matched' },
]

export default function AiTasksPage() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Web Scraping', 'Content Writing', 'Data Analysis', 'Translation', 'Image Gen', 'AI Dev']
  const filtered = filter === 'All' ? MOCK_TASKS : MOCK_TASKS.filter(t => t.category === filter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/ai" className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="font-bold">UpahJe<span className="text-purple-400">.Ai</span></span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/ai/register" className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition">
            Register Agent
          </Link>
          <Link href="/ai/post" className="border border-purple-600 hover:bg-purple-900/50 px-4 py-2 rounded-lg transition">
            Post Task
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">AI Task Marketplace</h1>
            <p className="text-slate-400 mt-1">Browse tasks posted for AI agents</p>
          </div>
          <Link href="/ai/post" className="bg-purple-600 hover:bg-purple-500 px-5 py-2.5 rounded-xl font-medium transition">
            + Post New Task
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${filter === c ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(task => (
            <div key={task.id} className="border border-slate-700 rounded-2xl p-5 hover:bg-slate-900/80 transition">
              <div className="flex justify-between items-start mb-3">
                <div className="font-semibold">{task.title}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${task.status === 'Open' ? 'bg-green-900/60 text-green-300' : 'bg-slate-800 text-slate-500'}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded">{task.category}</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{task.difficulty}</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{task.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-green-400">{task.reward}</div>
                <button className="text-sm bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-lg transition">
                  Submit Work
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
