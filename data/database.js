// Model types
class Root {}
class Store {}
class Ticket {}

// Mock data
const viewer = new Root();
      viewer.id = '1';
      viewer.name = 'Anonymous';

const stores = [
  { name: 'Store-1', ticket: [1,2,3] },
  { name: 'Store-2', ticket: [2,4,3] },
  { name: 'Store-3', ticket: [2, 5] }
].map(({ name, ticket }, i) => {
  const a = new Store();

  a.name = name;
  a.ticket = ticket;
  a.number = i;
  a.id = `${i}`;

  return a;
});

const tickets = [
  { title: 'Test-1', subject: 'Subject-1' },
  { title: 'Test-2', subject: 'Subject-2' },
  { title: 'Test-3', subject: 'Subject-3' },
  { title: 'Test-4', subject: 'Subject-4' },
  { title: 'Test-5', subject: 'Subject-5' },
  { title: 'Test-6', subject: 'Subject-6' }
].map(({ title, subject }, i) => {
  const a = new Ticket();

  a.title = title;
  a.subject = subject;
  a.id = `${i}`;

  return a;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getRoot: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getStore: (id) => stores.find(w => w.id === id),
  getStores: () => stores,
  getConnectedTickets: (array) => (array.map(id => (tickets.find(w => parseInt(w.id) === id)))),
  getTicket: (id) => tickets.find(w => w.id === id),
  getTickets: () => tickets,
  Root,
  Store,
  Ticket
};
