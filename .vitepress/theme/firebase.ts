import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBK9id7DMHxp_H0o3B_6lYOHEo30nxChpU',
  authDomain: 'measuremate-blog-12345.firebaseapp.com',
  projectId: 'measuremate-blog-12345',
  storageBucket: 'measuremate-blog-12345.firebasestorage.app',
  messagingSenderId: '134044598052',
  appId: '1:134044598052:web:67c0fcefb9c4a40ca47db1',
};

export const app = initializeApp(firebaseConfig);
