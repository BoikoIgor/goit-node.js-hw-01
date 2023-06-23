// console.log('hi, test in Dev mode');
const contacts = require('./contacts/index');
const { program } = require('commander');

// contacts
//   .listContacts()
//   .then((contact) => console.log(contact))
//   .catch((err) => console.log(err));

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list': {
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      return;
    }
    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;
    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'remove':
      const removedContacts = await contacts.removeContact(id);
      break;
    case 'update':
      const updatedContact = await contacts.updateContact(id, name, email, phone);
      console.log(updatedContact);
      break;
    default:
      console.warn('unknown action ' + action);
  }
}

// invokeAction({ action: 'updateContact', id: 'rsKkOQUi80UsgVPCcLZZW', name: 'Howard', email: 'Donec.@sceler.net', phone: '(000) 206-2688' }).then(console.log).catch(console.error);

// console.log(process.argv);

program
  .option('-a, --action <type>', 'choose action to invoke')
  .option('-i, --id <type>', 'contact id')
  .option('-n, --name <type>', 'contact name')
  .option('-e, --email <type>', 'contact email')
  .option('-p, --phone <type>', 'contact phone');

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
