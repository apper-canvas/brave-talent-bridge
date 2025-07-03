import mockCompanies from '@/services/mockData/companies.json'

class CompanyServiceClass {
  constructor() {
    this.companies = [...mockCompanies]
  }

  async getAll() {
    await this.delay(300)
    return [...this.companies]
  }

  async getById(id) {
    await this.delay(200)
    const company = this.companies.find(c => c.Id === id)
    if (!company) {
      throw new Error(`Company with ID ${id} not found`)
    }
    return { ...company }
  }

  async create(companyData) {
    await this.delay(400)
    const newCompany = {
      ...companyData,
      Id: Math.max(...this.companies.map(c => c.Id)) + 1,
    }
    this.companies.push(newCompany)
    return { ...newCompany }
  }

  async update(id, companyData) {
    await this.delay(300)
    const index = this.companies.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error(`Company with ID ${id} not found`)
    }
    
    this.companies[index] = { ...this.companies[index], ...companyData }
    return { ...this.companies[index] }
  }

  async delete(id) {
    await this.delay(200)
    const index = this.companies.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error(`Company with ID ${id} not found`)
    }
    
    this.companies.splice(index, 1)
    return true
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const CompanyService = new CompanyServiceClass()