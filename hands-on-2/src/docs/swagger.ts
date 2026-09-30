const doc = {
  info: {
    title: 'Review Kantin API',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'], 
  definitions: {
    StallInput: {
      ownerId: 2,
      name: "Warung Baru",
      category: "Nasi",
      location: "Kantin FK",
      description: ""
    },
    UserInput: {
      name: "Rai",
      email: "rai@mail.com",
      passwordHash: "123456",
      role: "customer"
    },
    MenuItemInput: {
      stallId: 1,
      name: "Nasi Goreng",
      price: 15000,
      isAvailable: true
    },
    ReviewInput: {
      stallId: 1,
      customerId: 1,
      rating: 5,
      comment: "Mantap!"
    },
    LikeInput: {
      customerId: 1,
      stallId: 1
    },
    FlagInput: {
      status: "resolved"
    },
    AuditInput: {
      userId: 1,
      action: "LOGIN",
      details: "User logged in"
    }
  }
};