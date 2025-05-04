import { createSignal, Show, type Component } from 'solid-js';

import logo from './lightbulb_with_clarify_logo.png'
import styles from './App.module.css';

const App: Component = () => {
  const [showRRForm, setShowRRForm] = createSignal(false)

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <a
          class={styles.link}
          href="https://www.groundtruthai.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by GroundTruth AI
        </a>
      </header>
      {/* Temporary: meant for sales and marketing */}
      <div class={styles.main}>
        <button class={styles.startbutton} onClick={() => setShowRRForm(!showRRForm())}>{'Rapid response tool ➡️'}</button>
        <Show when={showRRForm()}>
          <p>A form will go here</p>
        </Show>
      </div>
    </div>
  );
};

export default App;
