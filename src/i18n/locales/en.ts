export default {
  // Navigation
  nav: {
    home: 'Home',
    accounts: 'Accounts',
    payments: 'Payments',
    transactions: 'Transactions',
    cards: 'Cards',
    notifications: 'Notifications & Tracking',
    helpBible: 'Help Bible',
    logout: 'Logout',
  },
  
  // Common
  common: {
    cancel: 'Cancel',
    continue: 'Continue',
    done: 'Done',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    viewAll: 'View All',
    seeMore: 'See more',
    seeAll: 'See all',
    currency: '₦',
  },
  
  // Home Screen
  home: {
    welcome: 'Welcome back',
    yourCards: 'Your Virtual Cards',
    cardLimit: 'You can create up to {{max}} cards • {{current}} of {{max}} created',
    quickActions: 'Quick Actions',
    recentTransactions: 'Recent Transactions',
    totalBalance: 'Total Balance',
    activeCards: 'Active Cards',
    createCard: 'Create Virtual Card',
    sendMoney: 'Send Money From Any Card',
    fund: 'Fund',
    payBills: 'Pay Bills',
    requestStatement: 'Request Statement',
  },

  // Dashboard
  dashboard: {
    heroTitle: 'Get your finances in your hands',
    heroSubtitle: 'Manage, fund, track and control all your cards from one place.',
    createCardNow: 'Create Virtual Card Now',
    recentTransactions: 'Recent transactions',
    yourVirtualCards: 'Your Virtual Cards',
    quickActions: 'Quick Actions',
  },
  
  // Cards
  cards: {
    title: 'Cards',
    cardNumber: 'Card Number',
    balance: 'Balance',
    details: 'Details',
    freeze: 'Freeze',
    unfreeze: 'Unfreeze',
    addMoney: 'Add Money',
    send: 'Send',
    delete: 'Delete',
    cardDetails: 'Card Details',
    cvv: 'CVV',
    expiryDate: 'Expiry Date',
    cardSettings: 'Card Settings',
    onlinePayments: 'Online Payments',
    internationalPayments: 'International Payments',
    freezeConfirm: 'Are you sure you want to freeze this card?',
    deleteConfirm: 'Are you sure you want to delete this card?',
    recentTransactions: 'Recent Transactions',
  },
  
  // Create Card
  createCard: {
    title: 'Create Virtual Card — ₦2,000',
    description: 'Creating a virtual card costs ₦2,000.',
    maxLimit: 'You can create up to {{max}} virtual cards maximum.',
    limitReached: 'You\'ve reached the maximum limit of {{max}} cards.',
    creating: 'Debiting from account…',
    success: 'Virtual Card Created Successfully 🎉',
    seeCard: 'See Card',
    createButton: 'Create Card (₦2,000)',
  },
  
  // Send Money
  sendMoney: {
    title: 'Send Money From Any Card',
    description: 'Transfer money to any bank account',
    selectCard: 'Select Card to Debit',
    amount: 'Amount (₦)',
    recipientAccount: 'Recipient Account Number',
    recipientBank: 'Recipient Bank',
    enterOtp: 'Enter OTP',
    otpDescription: 'Enter the 6-digit code sent to your phone',
    initiateTransaction: 'Initiate Transaction',
    success: 'Transaction Successful',
    successDescription: 'Your transfer of ₦{{amount}} was completed successfully',
  },
  
  // Fund Card
  fundCard: {
    title: 'Fund Card',
    description: 'Transfer to this account to fund {{card}}',
    accountNumber: 'Account Number',
    bankName: 'Bank Name',
    instruction: 'Transfer funds to the account above and your card will be credited automatically.',
  },
  
  // Request Statement
  requestStatement: {
    title: 'Request Statement',
    description: 'Get your card statement via email',
    selectCard: 'Select Card',
    email: 'Email Address',
    sendButton: 'Send Statement',
    success: 'Your statement is on its way!',
  },
  
  // Pay Bills
  payBills: {
    title: 'Pay Bills',
    description: 'Pay for internet, cable and utility bills',
    selectCard: 'Select Card',
    selectBillType: 'Select Bill Type',
    amount: 'Amount (₦)',
    electricity: 'PHCN (Electricity)',
    cable: 'DSTV / GOTV',
    water: 'Water',
    waste: 'Waste Management',
    internet: 'Internet',
    airtime: 'Airtime',
    data: 'Data Bundle',
    verifyAndPay: 'Verify & Pay',
    success: 'Bill Payment Successful',
    successDescription: 'Your {{billType}} payment of ₦{{amount}} was completed successfully',
  },
  
  // Payments / Linked Platforms
  payments: {
    title: 'Payments',
    linkedPlatforms: 'Linked Platforms',
    availablePlatforms: 'Available Platforms',
    managePlatform: 'Manage {{platform}}',
    linkedCards: 'Cards linked to {{platform}}',
    noLinkedCards: 'No cards linked to this platform yet',
    unlinkCard: 'Unlink Card',
    unlinkConfirm: 'Are you sure you want to unlink {{card}} from {{platform}}?',
    cardUnlinked: 'Card successfully unlinked from {{platform}}',
  },
  
  // Transactions
  transactions: {
    title: 'Transactions',
    allTransactions: 'All Transactions',
    inflow: 'Inflow',
    outflow: 'Outflow',
    filterBy: 'Filter by:',
    allCards: 'All Cards',
    transactionDetails: 'Transaction Details',
    transactionId: 'Transaction ID',
    dateTime: 'Date & Time',
    type: 'Type',
    amount: 'Amount',
    date: 'Date',
    status: 'Status',
    cardUsed: 'Card Used',
    merchantName: 'Merchant Name',
    merchantCategory: 'Merchant Category',
    referenceNumber: 'Reference Number',
    fees: 'Fees',
    description: 'Description',
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
  },
  
  // Notifications & Tracking
  notifications: {
    title: 'Notifications & Tracking',
    physicalCardTracking: 'Physical Card Tracking',
    notificationsList: 'Notifications',
    clearAll: 'Clear All',
    clearConfirm: 'Are you sure you want to clear all notifications?',
    notificationsCleared: 'All notifications have been cleared',
    markAsRead: 'Mark as Read',
    viewDetails: 'View Details',
    
    // Timeline events
    cardCreated: 'Card Created',
    cardIssued: 'Card Issued',
    cardProcessing: 'Card in Processing',
    cardInBank: 'Card in the Bank',
    cardDispatched: 'Card Dispatched',
    cardOnWay: 'Card On Its Way',
    cardArriving: 'Card Arriving',
    cardAtDoorstep: 'Card At Your Doorstep',
    cardReceived: 'Card Received',
    cardActivated: 'Card Activated',
    pinCreated: 'Physical PIN Created',
    cardSetup: 'Card Fully Set Up',
  },
  
  // Settings
  settings: {
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    passwordChanged: 'Password changed successfully',
    editProfilePicture: 'Edit Profile Picture',
    uploadPhoto: 'Upload Photo',
    selectImage: 'Select an image to upload',
    photoUpdated: 'Profile picture updated successfully',
  },
  
  // Modals
  modals: {
    logout: {
      title: 'Confirm Logout',
      description: 'Are you sure you want to log out? You\'ll need to sign in again to access your account.',
      confirm: 'Logout',
    },
    support: {
      title: 'Help & Support',
      description: 'We\'re here to help you',
      email: 'Email Us',
      faq: 'Frequently Asked Questions',
      contactSupport: 'Contact Support',
    },
  },
  
  // Languages
  languages: {
    'en': 'English (Nigeria)',
    'ig': 'Igbo',
    'yo': 'Yoruba',
    'ha': 'Hausa',
    'pcm': 'Nigerian Pidgin',
  },
  
  // Errors
  errors: {
    fillAllFields: 'Please fill in all fields',
    invalidOtp: 'Please enter a valid 6-digit OTP',
    somethingWrong: 'Something went wrong. Please try again.',
  },
};
