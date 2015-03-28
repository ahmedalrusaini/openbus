'use strict';

/**
 * @ngdoc overview
 * @name openbusApp
 * @description
 * # openbusApp
 *
 * Main module of the application.
 */

var en = {
  actions: {
    edit: "Edit",
    save: "Save",
    create: "Create",
    cancel: "Cancel",
    followup: "Follow up"
  },
  menu: {
    index: 'List',
    new: 'Add',
    
    users: {
      title: 'Users',
      sub: {
        index: "@:menu.index",
        new: "@:menu.new"
      }
    },
    
    accounts: {
      title: "Accounts",
      sub: {
        index: "@:menu.index",
        new: "@:menu.new"
      }
    },
    
    service: {
      requests: {
        title: 'Service Requests',
        sub: {
          index: "@:menu.index",
          new: "@:menu.new"
        }
      }
    }
  },
  main: {
    users: {
      descr: "Manage your application users"
    },
    service: {
      requests: {
        descr: "Manage you service requests"
      }
    }
  },
  user: {
    header: {
      title: 'User: {{user}}'
    },
    actions: {
      new: {
        title: "Create new user"
      }
    },
    one: 'User',
    two: 'Users',
    title: 'Title',
    email: 'Email',
    password: 'Password',
    newPassword: 'New password',
    password_confirmation: 'Password confirmation',
    firstname: 'Firstname',
    lastname: 'Lastname',
    fullname: 'Name',
    age: 'Age',
    birthdate: 'Birthdate',
    role: 'Role',
    change_password: 'Change your password',
    createdAt: 'Created on',
    updatedAt: 'Updated on'
  },
  login: 'Login',
  messages: {
    user: {
      success: {
        created: '{{user.one}} created successfully',
        updated: 'User {{user}} updated successfully',
        saved: 'User {{user}} saved successfully',
        deleted: 'User {{user}} deleted successfully',
        passwordChanged: 'Password changed'
      },
      danger: {
        created: 'User creation failed',
        updated: 'User {{user}} update failed',
        saved: 'User {{user}} save failed',
        deleted: 'User {{user}} deletion failed'
      }
    },
    account: {
      success: {
        created: 'Account created successfully',
        updated: 'Account {{account}} updated successfully',
        saved: 'Account {{account}} saved successfully',
        deleted: 'Account {{account}} deleted successfully',
        passwordChanged: 'Password changed'
      },
      danger: {
        created: 'Account creation failed',
        updated: 'Account {{name}} update failed',
        saved: 'Account {{account}} save failed',
        deleted: 'Account {{account}} deletion failed'
      }
    }
  },
  account: {
    actions: {
      new: {
        title: "Create new account"
      }
    },
    header: {
      title: "Account: {{account}}"
    },
    followups: {
      modal: {
        title: "Choose follow up action",
        titleHead: "Available follow up"
      }
    },
    address: {
      modal: {
        title: "Address"
      }
    },
    one: "Account",
    two: "Accounts",
    name: "Name",
    type: "Type"
  },
  address: {
    one: "Address",
    two: "Addresses",
    street: "Street",
    city: "City",
    houseNo: "House no",
    postalCode: "Postal code",
    region: "Region",
    telephone: "Telephone",
    mobile: "Mobile",
    email: "Email"
    
  }
};