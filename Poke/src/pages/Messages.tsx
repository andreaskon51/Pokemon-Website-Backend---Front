import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, ChevronLeft, Image, MoreVertical } from 'lucide-react'
import { mockConversations } from '@/data/mockData'
import { timeAgo } from '@/utils'

interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

const mockMessages: ChatMessage[] = [
  { id: 'm1', sender: 'them', text: 'Hey! I saw your Charizard listing. Would you consider a trade?', time: '2:15 PM' },
  { id: 'm2', sender: 'me', text: 'Hi! I\'m open to hearing offers. What do you have?', time: '2:18 PM' },
  { id: 'm3', sender: 'them', text: 'I have a PSA 9 Blastoise Shadowless. I could add some cash on top if needed.', time: '2:20 PM' },
  { id: 'm4', sender: 'me', text: 'That\'s interesting! Can you send me some photos of the card? I\'d like to see the centering.', time: '2:22 PM' },
  { id: 'm5', sender: 'them', text: 'Sure! Here are front and back photos. The centering is about 55/45 which is typical for Shadowless.', time: '2:25 PM' },
  { id: 'm6', sender: 'them', text: 'Would you accept a trade for the Charizard? I have a PSA 9 Blastoise!', time: '2:30 PM' },
]

export default function Messages() {
  const [selectedConvo, setSelectedConvo] = useState<string | null>(mockConversations[0]?.id || null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedConversation = mockConversations.find(c => c.id === selectedConvo)

  const handleSend = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, {
      id: `m${messages.length + 1}`,
      sender: 'me',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }])
    setNewMessage('')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl font-black text-white font-display mb-6">Messages</h1>

      <div className="bg-brand-card rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: 'calc(100vh - 200px)', minHeight: 500 }}>
        <div className="flex h-full">
          {/* Conversation List */}
          <div className={`w-full sm:w-80 border-r border-white/[0.06] flex flex-col ${selectedConvo ? 'hidden sm:flex' : 'flex'}`}>
            <div className="p-4 border-b border-white/[0.06]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {mockConversations.map(convo => (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConvo(convo.id)}
                  className={`w-full text-left p-4 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors ${
                    selectedConvo === convo.id ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img src={convo.otherUser.avatar} alt="" className="w-10 h-10 rounded-full bg-brand-surface" />
                      {convo.unreadCount > 0 && (
                        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                          {convo.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-sm font-semibold ${convo.unreadCount ? 'text-white' : 'text-gray-300'}`}>
                          {convo.otherUser.username}
                        </span>
                        <span className="text-[10px] text-gray-500">{timeAgo(convo.lastMessageTime)}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{convo.listingTitle}</p>
                      <p className={`text-xs truncate mt-0.5 ${convo.unreadCount ? 'text-gray-300' : 'text-gray-500'}`}>
                        {convo.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedConvo ? 'hidden sm:flex' : 'flex'}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConvo(null)}
                    className="sm:hidden text-gray-400 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img src={selectedConversation.otherUser.avatar} alt="" className="w-8 h-8 rounded-full bg-brand-surface" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{selectedConversation.otherUser.username}</p>
                    <p className="text-[11px] text-gray-500">Re: {selectedConversation.listingTitle}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        msg.sender === 'me'
                          ? 'bg-red-500/20 text-white rounded-br-md'
                          : 'bg-white/[0.06] text-gray-300 rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-red-300/50' : 'text-gray-600'}`}>{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                      <Image className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-red-500/30"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="p-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
