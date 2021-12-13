const fs = require("fs").promises;
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.error(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contactsById = JSON.parse(data).find(
        (item) => item.id === contactId
      );
      console.table(contactsById);
    })
    .catch((error) => console.error(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const deletedContact = JSON.parse(data).filter(
        (item) => item.id !== contactId
      );
      console.table(deletedContact);
    })
    .catch((error) => console.error(error));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contactList = JSON.parse(data);
      contactList.push({
        id: uniqid(),
        name,
        email,
        phone,
      });
      fs.writeFile(contactsPath, JSON.stringify(contactList));
      console.table(contactList);
    })
    .catch((error) => console.error(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
