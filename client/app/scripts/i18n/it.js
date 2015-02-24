'use strict';

/**
 * @ngdoc overview
 * @name openbusApp
 * @description
 * # openbusApp
 *
 * Main module of the application.
 */

var it = {
  menu: {
    users: {
      title: 'Utenti',
      sub: {
        index: 'Lista',
        new: 'Nuovo'
      }
    }
  },
  user: {
    header: {
      title: 'Utente: {{user}}'
    },
    actions: {
      new: {
        title: "Crea nuovo utente"
      }
    },
    one: 'Usente',
    two: 'Usenti',
    title: 'Titolo',
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Conferma password',
    firstname: 'Nome',
    lastname: 'Cognome',
    fullname: 'Nome completo',
    age: 'Età',
    birthdate: 'Data di nascita',
    role: 'Ruolo'
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