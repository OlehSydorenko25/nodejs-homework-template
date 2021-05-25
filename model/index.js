const fs = require('fs/promises')
const path = require('path')
const {v4: uuid} = require('uuid')

const pathData = path.join(__dirname, './contacts.json')

const readData = async () => {
  const data = await fs.readFile(pathData, 'utf-8')
  return JSON.parse(data)
}

const listContacts = async () => {
  const data = await readData()
  return data
}

const getContactById = async (contactId) => {
  const data = await readData()
  const result = data.find((contact) => contact.id === contactId)
  return result
}

const removeContact = async (contactId) => {
  const data = await readData()
  const index = data.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const result = data.splice(index, 1)
    await fs.writeFile(pathData, JSON.stringify(data))
    return result
  }
  return null
}

const addContact = async ({name, email, phone}) => {
  const id = uuid()
  if (name && email && phone) {
    const record = {
      id,
      name,
      email,
      phone
    }
    const data = await readData()
    data.push(record)
    await fs.writeFile(pathData, JSON.stringify(data))
    return record
  }
  return null
}

const updateContact = async (contactId, body) => {
  const data = await readData()
  const result = data.find((contact) => contact.id === contactId)
  if (result) {
    Object.assign(result, body)
    await fs.readFile(pathData, 'utf-8')
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
