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
  menu: {
    users: {
      title: 'Users',
      sub: {
        index: 'List',
        new: 'Add'
      }
    }
  },
  user: {
    roles: {
      admin: "Administrator",
      user: "User"
    },
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
    password_confirmation: 'Password confirmation',
    firstname: 'Firstname',
    lastname: 'Lastname',
    fullname: 'Name',
    age: 'Age',
    birthdate: 'Birthdate',
    role: 'Role'
  },
  login: 'Login',
  messages: {
    user: {
      success: {
        created: '{{user.one}} created successfully',
        updated: 'User {{user}} updated successfully',
        saved: 'User {{user}} saved successfully',
        deleted: 'User {{user}} deleted successfully'
      },
      danger: {
        created: 'User creation failed',
        updated: 'User {{user}} update failed',
        saved: 'User {{user}} save failed',
        deleted: 'User {{user}} deletion failed'
      }
    }
  }
};