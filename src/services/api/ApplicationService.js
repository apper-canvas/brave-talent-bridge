import mockApplications from '@/services/mockData/applications.json'

class ApplicationServiceClass {
  constructor() {
    this.applications = [...mockApplications]
  }

  async getAll() {
    await this.delay(300)
    return [...this.applications]
  }

  async getById(id) {
    await this.delay(200)
    const application = this.applications.find(a => a.Id === id)
    if (!application) {
      throw new Error(`Application with ID ${id} not found`)
    }
    return { ...application }
  }

  async create(applicationData) {
    await this.delay(400)
    const newApplication = {
      ...applicationData,
      Id: Math.max(...this.applications.map(a => a.Id)) + 1,
      appliedDate: new Date().toISOString(),
      status: 'pending',
    }
    this.applications.push(newApplication)
    return { ...newApplication }
  }

  async update(id, applicationData) {
    await this.delay(300)
    const index = this.applications.findIndex(a => a.Id === id)
    if (index === -1) {
      throw new Error(`Application with ID ${id} not found`)
    }
    
    this.applications[index] = { ...this.applications[index], ...applicationData }
    return { ...this.applications[index] }
  }

  async delete(id) {
    await this.delay(200)
    const index = this.applications.findIndex(a => a.Id === id)
    if (index === -1) {
      throw new Error(`Application with ID ${id} not found`)
    }
    
    this.applications.splice(index, 1)
    return true
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const ApplicationService = new ApplicationServiceClass()