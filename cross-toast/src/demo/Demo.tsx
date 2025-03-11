import React from 'react';
import { ReactToast } from '../react';
import styles from './Demo.module.css';

export const Demo = () => {
  const [position, setPosition] = React.useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top-right');
  const [activeToast, setActiveToast] = React.useState<React.ReactNode | null>(null);

  const showToast = () => {
    setActiveToast(
      <ReactToast
        message="Your action was completed"
        type="success"
        position={position}
        onHide={() => setActiveToast(null)}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.divider} />
        <h1>Modern Toast Notifications</h1>
      </div>
      
      <p className={styles.description}>
        Beautiful, accessible, and customizable toast notifications for your React
        applications. Built with modern best practices and powered by Radix UI.
      </p>

      <div className={styles.buttons}>
        <button className={styles.primaryButton} onClick={() => window.location.href = '#try-it'}>
          Try it out
        </button>
        <button 
          className={styles.secondaryButton} 
          onClick={() => window.location.href = 'https://github.com/yourusername/cross-toast'}
        >
          <span className={styles.githubIcon}>󰊤</span>
          GitHub
        </button>
      </div>

      <h2>How to Use</h2>
      
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.checkIcon}>✓</div>
          <div>
            <h3>Install the Package</h3>
            <p>Add the toast component to your project using npm or yarn.</p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.arrowIcon}>→</div>
          <div>
            <h3>Import and Initialize</h3>
            <p>Import the toast component and initialize it in your application.</p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.checkIcon}>✓</div>
          <div>
            <h3>Show Notifications</h3>
            <p>Call the toast function anywhere in your app to show notifications.</p>
          </div>
        </div>
      </div>

      <div id="try-it" className={styles.playground}>
        <h2>Toast Position Playground</h2>
        <div className={styles.positionGrid}>
          <button
            className={`${styles.positionButton} ${position === 'top-left' ? styles.active : ''}`}
            onClick={() => setPosition('top-left')}
          >
            ↖ Top Left
          </button>
          <button
            className={`${styles.positionButton} ${position === 'top-right' ? styles.active : ''}`}
            onClick={() => setPosition('top-right')}
          >
            ↗ Top Right
          </button>
          <button
            className={`${styles.positionButton} ${position === 'bottom-left' ? styles.active : ''}`}
            onClick={() => setPosition('bottom-left')}
          >
            ↙ Bottom Left
          </button>
          <button
            className={`${styles.positionButton} ${position === 'bottom-right' ? styles.active : ''}`}
            onClick={() => setPosition('bottom-right')}
          >
            ↘ Bottom Right
          </button>
        </div>

        <div className={styles.codePreview}>
          <div className={styles.codeHeader}>
            <button className={`${styles.tabButton} ${styles.active}`}>React</button>
            <button className={styles.tabButton}>Vue</button>
            <button className={styles.tabButton}>Vanilla JS</button>
          </div>
          <pre className={styles.code}>
            <code>{`import { useToast } from "@/components/ui/toast"

const Demo = () => {
  const { toast } = useToast()

  return (
    <button onClick={() => {
      toast({
        title: "Success",
        description: "Your action was completed"
      })
    }}>
      Show Toast
    </button>
  )
}`}</code>
          </pre>
        </div>
      </div>

      {activeToast}
    </div>
  );
}; 