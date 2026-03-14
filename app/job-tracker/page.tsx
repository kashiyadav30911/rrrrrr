'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Calendar, MapPin, DollarSign, Briefcase, TrendingUp, Clock } from 'lucide-react'
import { JobApplication } from '@/types/resume'

export default function JobTracker() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied' as JobApplication['status'],
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
    salary: '',
    location: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('jobApplications')
    if (saved) {
      setApplications(JSON.parse(saved))
    }
  }, [])

  const saveApplications = (apps: JobApplication[]) => {
    setApplications(apps)
    localStorage.setItem('jobApplications', JSON.stringify(apps))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingApp) {
      const updated = applications.map(app =>
        app.id === editingApp.id ? { ...formData, id: app.id } : app
      )
      saveApplications(updated)
      setEditingApp(null)
    } else {
      const newApp: JobApplication = {
        ...formData,
        id: Date.now().toString()
      }
      saveApplications([...applications, newApp])
    }
    
    setShowAddModal(false)
    resetForm()
  }

  const handleEdit = (app: JobApplication) => {
    setEditingApp(app)
    setFormData({
      company: app.company,
      position: app.position,
      status: app.status,
      appliedDate: app.appliedDate,
      notes: app.notes || '',
      salary: app.salary || '',
      location: app.location || ''
    })
    setShowAddModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      saveApplications(applications.filter(app => app.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: '',
      salary: '',
      location: ''
    })
  }

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'interview': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'offer': return 'bg-green-100 text-green-700 border-green-200'
    }
  }

  const getStatusIcon = (status: JobApplication['status']) => {
    switch (status) {
      case 'applied': return '📤'
      case 'interview': return '💼'
      case 'rejected': return '❌'
      case 'offer': return '🎉'
    }
  }

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">Job Application Tracker</span>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingApp(null)
                resetForm()
                setShowAddModal(true)
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Applications</span>
              <Briefcase className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-700 text-sm font-medium">Applied</span>
              <span className="text-2xl">📤</span>
            </div>
            <div className="text-3xl font-bold text-blue-700">{stats.applied}</div>
          </div>
          <div className="bg-yellow-50 rounded-xl shadow-sm border border-yellow-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-700 text-sm font-medium">Interviews</span>
              <span className="text-2xl">💼</span>
            </div>
            <div className="text-3xl font-bold text-yellow-700">{stats.interview}</div>
          </div>
          <div className="bg-green-50 rounded-xl shadow-sm border border-green-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 text-sm font-medium">Offers</span>
              <span className="text-2xl">🎉</span>
            </div>
            <div className="text-3xl font-bold text-green-700">{stats.offer}</div>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your job applications to stay organized</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Application</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{app.position}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)} {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 mb-4">{app.company}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                      </div>
                      {app.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{app.location}</span>
                        </div>
                      )}
                      {app.salary && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{app.salary}</span>
                        </div>
                      )}
                    </div>
                    
                    {app.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{app.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(app)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingApp ? 'Edit Application' : 'Add New Application'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Google, Microsoft, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as JobApplication['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="San Francisco, CA"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="$100k - $150k"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any notes about the application, interview details, etc."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingApp(null)
                    resetForm()
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
                >
                  {editingApp ? 'Update' : 'Add'} Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
