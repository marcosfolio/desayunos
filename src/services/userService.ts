import { firestore } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface User {
    id: string;
    email: string;
    name: string | null;
    photoUrl: string | null;
}

export const createUser = async (user: User) => {
    await setDoc(doc(firestore, 'users', user.id), {
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
        createdAt: new Date()
    });
};

export const findUserById = async (id: string) => {
    const docRef = doc(firestore, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as User : null;
}; 