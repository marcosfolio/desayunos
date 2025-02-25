import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { createUser, findUserById, User } from '../../services/userService';
import './LoginComponent.css';

const LoginComponent = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    let dbUser = await findUserById(firebaseUser.uid);
                    if (!dbUser) {
                        // Create user if not exists
                        const newUser: User = {
                            id: firebaseUser.uid,
                            email: firebaseUser.email!,
                            name: firebaseUser.displayName,
                            photoUrl: firebaseUser.photoURL
                        };
                        await createUser(newUser);
                        dbUser = newUser;
                    }
                    setUser(dbUser);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Error checking auth state:', err);
                setError('Error al verificar la sesión');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            setError(null);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const { user: firebaseUser } = result;

            let dbUser = await findUserById(firebaseUser.uid);

            if (!dbUser) {
                const newUser: User = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email!,
                    name: firebaseUser.displayName,
                    photoUrl: firebaseUser.photoURL
                };
                await createUser(newUser);
                dbUser = newUser;
            }

            setUser(dbUser);
        } catch (err) {
            console.error('Error signing in with Google:', err);
            setError('Error al iniciar sesión con Google');
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (err) {
            console.error('Error signing out:', err);
            setError('Error al cerrar sesión');
        }
    };

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <div className="auth-section">
            {error && <div className="error-message">{error}</div>}

            {!user ? (
                <div className="login-container">
                    <button
                        className="google-signin-button"
                        onClick={handleGoogleSignIn}
                    >
                        Iniciar sesión
                    </button>
                </div>
            ) : (
                <div className="user-profile">
                    <button
                        className="avatar-button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {user?.photoUrl ? (
                            <img
                                src={user.photoUrl}
                                alt={user.name || 'Profile'}
                                className="profile-image"
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = user.photoUrl?.replace('s96-c', 's400-c') || '';
                                }}
                            />
                        ) : (
                            <div className="profile-image-placeholder" />
                        )}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="user-info">
                                <h3>{user?.name || 'Usuario'}</h3>
                                <p>{user?.email}</p>
                            </div>
                            <button
                                className="signout-button"
                                onClick={handleSignOut}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginComponent;
