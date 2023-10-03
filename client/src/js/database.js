import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('😬 The jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('😁 The jate database has been created!');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database -- Decided to do similar to activity 24 
export const putDb = async (content) => { // Removed console.error('putDB not implemented')
  console.log('👉 Put to the database');   // Message to user
  const contentDb = await openDB('jate', 1); // Creates a connection to the db and the version wish to use
  const tx = contentDb.transaction('jate', 'readwrite');  // Creates new transaction and specifies the db and data privilages
  const store = tx.objectStore('jate');  // Opens the desired object store
  const request = store.put({ id: 1, value: content });  //  Use the .add() method on the store and pass in the content.
  const result = await request;  // Get conformation of the request
  console.log('😁 The data has been saved to the database!', result); // Message the user 
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {  // Removed console.error('getDb not implemented');
  console.log('👉 Put to the database');   // Message to user
  const jateDb = await openDB('jate', 1); // Creates a connection to the db and the version wish to use
  const tx = jateDb.transaction('jate', 'readonly');  // Creates new transaction and specifies the db and data privilages
  const store = tx.objectStore('jate');  // Opens the desired object store
  const request = store.getAll();  //  // Use the .getAll() method to get all data in the database.
  const result = await request;  // Get conformation of the request
  console.log('Data read from database', result);
  return result.value;
};

initdb();
