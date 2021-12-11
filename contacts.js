const fs = require("fs").promises;
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return (contactById = contacts.find((item) => item.id === contactId));
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const deleteContact = contacts.filter((item) => item.id !== contactId);
    const newFile = fs.writeFile(contactsPath, deleteContact);
    return newFile;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const addContact = fs.appendFile([...contacts], {
      id: uniqid(),
      name,
      email,
      phone,
    });
    return addContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
