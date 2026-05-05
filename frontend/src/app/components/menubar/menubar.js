"use client";
import styles from './menuBar.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function MenuBar({ hasNotification }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
    window.location.href = '/';
  }

  return (
    <header className={styles.menuBar}>
      <div className={styles.rightSection}>
        <div className={styles.userInfo} ref={ref} onClick={() => setOpen(v => !v)}>
          <UserIcon />
          <span className={styles.userName}>Fulano da Silva</span>
          <span className={styles.arrowDown}>▼</span>

          {open && (
            <div className={styles.dropdown} role="menu">
              <div className={styles.dropdownItem} onClick={handleLogout} role="menuitem">Sair</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function UserIcon() {
  return (
    <Image
      src="/user-icon.png"
      alt="User"
      width={24}
      height={24}
      style={{ marginRight: 12 }}
    />
  );
}
