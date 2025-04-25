let currentBalance = 1000.00;
let transactions = [];

const withdrawalForm = document.getElementById('withdrawalForm');
const messageDiv = document.getElementById('message');
const balanceDisplay = document.querySelector('.balance');

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

function updateBalance(newBalance) {
    currentBalance = newBalance;
    balanceDisplay.textContent = formatCurrency(newBalance);
}

function showMessage(text, isError = false) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 3000);
}

withdrawalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const account = document.getElementById('account').value;
    const description = document.getElementById('description').value;
    
    // Enhanced amount validation
    if (isNaN(amount) || amount <= 0 || amount > 10000) {
        showMessage('Please enter a valid amount between $0 and $10,000', true);
        return;
    }
    
    // Enhanced account validation
    if (!/^\d{8,12}$/.test(account)) {
        showMessage('Account number must be 8-12 digits', true);
        return;
    }
    
    // Check if sufficient balance
    if (amount > currentBalance) {
        showMessage('Insufficient balance for this withdrawal', true);
        return;
    }
    
    // Process withdrawal
    const newBalance = currentBalance - amount;
    updateBalance(newBalance);
    
    // Record transaction
    const transaction = {
        type: 'withdrawal',
        amount: amount,
        account: account,
        description: description || 'No description',
        timestamp: new Date().toISOString(),
        remainingBalance: newBalance
    };
    transactions.push(transaction);
    
    showMessage(`Successfully withdrawn ${formatCurrency(amount)}`);
    withdrawalForm.reset();
});