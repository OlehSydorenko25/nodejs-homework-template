const fs = require('fs/promises')
const path = require('path')
const {v4: uuid} = require('uuid')

const pathContactsData = path.join(__dirname, './contacts.json')

const readData = async () => {
  const data = await fs.readFile(pathContactsData, 'utf-8')
  return JSON.parse(data)
}

const getListContacts = async () => {
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
    await fs.writeFile(pathContactsData, JSON.stringify(data))
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
    await fs.writeFile(pathContactsData, JSON.stringify(data))
    return record
  }
  return null
}

const updateContact = async (contactId, body) => {
  const data = await readData()
  const result = data.find((contact) => contact.id === contactId)
  if (result) {
    Object.assign(result, body)
    await fs.writeFile(pathContactsData, JSON.stringify(data))
  }
  return result
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
