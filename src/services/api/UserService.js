import mockUser from '@/services/mockData/user.json'

class UserServiceClass {
  constructor() {
    this.user = { ...mockUser }
  }

  async getProfile() {
    await this.delay(250)
    return { ...this.user }
  }

  async updateProfile(userData) {
    await this.delay(300)
    this.user = { ...this.user, ...userData }
    return { ...this.user }
  }

  async uploadResume(file) {
    await this.delay(500)
    // In a real app, this would upload to a server
    const resumeUrl = URL.createObjectURL(file)
    this.user.resumeUrl = resumeUrl
    this.user.resumeFileName = file.name
    return { ...this.user }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const UserService = new UserServiceClass()