import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the contacts JSON file
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

// Function to list all contacts
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

// Function to get a contact by ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
  }
}

// Function to remove a contact by ID
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removed] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removed;
  } catch (error) {
    console.error("Error removing contact:", error);
  }
}

// Function to add a new contact
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
  }
}

const contactsService = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

export default contactsService;
