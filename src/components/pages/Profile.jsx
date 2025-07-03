import React, { useState, useEffect } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ProfileSection from '@/components/molecules/ProfileSection'
import { UserService } from '@/services/api/UserService'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState({})
  
  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await UserService.getProfile()
      setUser(userData)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load profile:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadProfile()
  }, [])
  
  const handleSaveProfile = async (section, data) => {
    try {
      const updatedUser = await UserService.updateProfile({ ...user, ...data })
      setUser(updatedUser)
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile')
      console.error('Failed to update profile:', err)
    }
  }
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    try {
      // In a real app, this would upload the file to a server
      const resumeUrl = URL.createObjectURL(file)
      const updatedUser = await UserService.updateProfile({
        ...user,
        resumeUrl,
        resumeFileName: file.name
      })
      setUser(updatedUser)
      toast.success('Resume uploaded successfully!')
    } catch (err) {
      toast.error('Failed to upload resume')
      console.error('Failed to upload resume:', err)
    }
  }
  
  if (loading) return <Loading type="profile" />
  if (error) return <Error message={error} onRetry={loadProfile} type="profile" />
  if (!user) return <Error message="Profile not found" />
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your professional profile and increase your chances of getting hired
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user.name || 'Your Name'}
                </h2>
                <p className="text-lg text-gray-600 mb-3">
                  {user.headline || 'Add your professional headline'}
                </p>
                <div className="flex items-center gap-4 text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    {user.location || 'Add location'}
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Mail" className="w-4 h-4" />
                    {user.email || 'Add email'}
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Phone" className="w-4 h-4" />
                    {user.phone || 'Add phone'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setEditing({ ...editing, basic: true })}
                    icon="Edit"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('resume-upload').click()}
                    icon="Upload"
                  >
                    Upload Resume
                  </Button>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Professional Summary */}
          <ProfileSection
            title="Professional Summary"
            icon="FileText"
            editable={true}
            onSave={() => handleSaveProfile('summary', { summary: user.summary })}
          >
            {({ isEditing }) => (
              <div>
                {isEditing ? (
                  <textarea
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Write a brief summary of your professional background and career goals..."
                    value={user.summary || ''}
                    onChange={(e) => setUser({ ...user, summary: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {user.summary || 'Add a professional summary to highlight your experience and career goals.'}
                  </p>
                )}
              </div>
            )}
          </ProfileSection>
          
          {/* Skills */}
          <ProfileSection
            title="Skills"
            icon="Zap"
            editable={true}
            onSave={() => handleSaveProfile('skills', { skills: user.skills })}
          >
            {({ isEditing }) => (
              <div>
                {isEditing ? (
                  <div>
                    <Input
                      placeholder="Add skills separated by commas (e.g., JavaScript, React, Node.js)"
                      value={user.skills?.join(', ') || ''}
                      onChange={(e) => setUser({ ...user, skills: e.target.value.split(',').map(s => s.trim()) })}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Separate skills with commas
                    </p>
                  </div>
                ) : (
                  <div>
                    {user.skills && user.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <Badge key={index} variant="primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Add your professional skills to help employers find you
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </ProfileSection>
          
          {/* Experience */}
          <ProfileSection
            title="Work Experience"
            icon="Briefcase"
            editable={true}
            onSave={() => handleSaveProfile('experience', { experience: user.experience })}
          >
            {({ isEditing }) => (
              <div>
                {user.experience && user.experience.length > 0 ? (
                  <div className="space-y-6">
                    {user.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold text-lg text-gray-900">
                          {exp.position}
                        </h4>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Add your work experience to showcase your professional background
                  </p>
                )}
              </div>
            )}
          </ProfileSection>
          
          {/* Education */}
          <ProfileSection
            title="Education"
            icon="GraduationCap"
            editable={true}
            onSave={() => handleSaveProfile('education', { education: user.education })}
          >
            {({ isEditing }) => (
              <div>
                {user.education && user.education.length > 0 ? (
                  <div className="space-y-4">
                    {user.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-secondary pl-4">
                        <h4 className="font-semibold text-lg text-gray-900">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600 font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-500">
                          {edu.graduationYear}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Add your educational background
                  </p>
                )}
              </div>
            )}
          </ProfileSection>
          
          {/* Resume */}
          <ProfileSection
            title="Resume"
            icon="FileText"
          >
            <div>
              {user.resumeUrl ? (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-green-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {user.resumeFileName || 'Resume.pdf'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(user.resumeUrl, '_blank')}
                      icon="Eye"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => document.getElementById('resume-upload').click()}
                      icon="Upload"
                    >
                      Replace
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Upload" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add your resume to increase your chances of getting hired
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => document.getElementById('resume-upload').click()}
                    icon="Upload"
                  >
                    Upload Resume
                  </Button>
                </div>
              )}
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  )
}

export default Profile