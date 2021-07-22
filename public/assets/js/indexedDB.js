'use strict';

const updateRealDatabase = () => {
    const db = openRequest.result;
    const transaction = db.transaction('budgetTransactions');
    const transactionStore = transaction.objectStore('budgetTransactions');
    const allData = transactionStore.getAll();

    allData.onsuccess = async () => {
        const response = await fetch('/api/transaction/bulk', {
            method: 'POST',
            body: JSON.stringify(allData.result),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const jsonData = await response.json();

        if (jsonData.length) {
            const newTransaction = db.transaction('budgetTransactions', 'readwrite');
            const newTransactionStore = newTransaction.objectStore('budgetTransactions');

            newTransactionStore.clear();
        }
    }
}

const saveRecord = (data) => {
    const db = openRequest.result;
    const transaction = db.transaction('budgetTransactions', 'readwrite');
    const transactionStore = transaction.objectStore('budgetTransactions');

    transactionStore.add(data);
}

const openRequest = indexedDB.open('budgetTrackerDB', 1);

openRequest.onupgradeneeded = (event) => {
    console.log(`IDB Updated from version ${event.oldVersion} to ${event.newVersion}`);

    const db = openRequest.result;

    if (!db.objectStoreNames.contains('budgetTransactions')) {
        db.createObjectStore('budgetTransactions', {
            autoIncrement: true,
        });
    }
}

openRequest.onerror = () => {
    console.error("Error", openRequest.error);
}

openRequest.onsuccess = () => {
    if (navigator.onLine) {
        updateRealDatabase();
    }
}

window.addEventListener('online', updateRealDatabase);
