import { Client, Account, Avatars } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('683586e6000ee4cb963c')
    .setPlatform('dev.adarsh.bookstore');

    export const account = new Account(client)
    export const avatars = new Account(client)
