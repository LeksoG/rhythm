import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

function NavBar() {
    const [menuItem, setMenuItem] = useState('home')
    const [isSearchActive, setIsSearchActive] = useState(false)

    const inputRef = useRef()

    return (
        <div className="nav-container">
            <nav className="nav-bar">
                <div className={`menu-container ${isSearchActive ? 'hidden' : ''}`}>
                    <button className={`menu-item ${menuItem === 'home' ? 'active' : ''}`} onClick={() => setMenuItem('home')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="icon-label">Home</span>
                    </button>
                    <button className={`menu-item ${menuItem === 'playlist' ? 'active' : ''}`} onClick={() => setMenuItem('playlist')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"
                            ></path>
                            <line x1="12" y1="7" x2="16" y2="7"></line>
                            <line x1="12" y1="11" x2="16" y2="11"></line>
                            <line x1="12" y1="15" x2="16" y2="15"></line>
                        </svg>
                        <span className="icon-label">Playlist</span>
                    </button>
                    <button className={`menu-item ${menuItem === 'library' ? 'active' : ''}`} onClick={() => setMenuItem('library')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18V5l12-2v13"></path>
                            <circle cx="6" cy="18" r="3"></circle>
                            <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                        <span className="icon-label">Library</span>
                    </button>
                    <button className={`menu-item ${menuItem === 'favorites' ? 'active' : ''}`} onClick={() => setMenuItem('favorites')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            ></path>
                        </svg>
                        <span className="icon-label">Favorites</span>
                    </button>
                    <button className={`menu-item search-trigger ${isSearchActive ? 'active' : ''}`} onClick={() => {
                        setIsSearchActive(true)
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 300);
                    }}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span className="icon-label">Search</span>
                    </button>
                </div>

                <div className={`search-wrapper ${isSearchActive ? 'active' : ''}`}>
                    <div className={`search-content ${isSearchActive ? 'active' : ''}`}>
                        <input ref={inputRef} type="text" className="search-input" placeholder="Search..." />
                        <button className="search-close" onClick={() => {
                            setIsSearchActive(false)
                            inputRef.current.value = ''
                        }
                        }>
                            <svg
                                className="icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                width="16"
                                height="16"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default NavBar;
