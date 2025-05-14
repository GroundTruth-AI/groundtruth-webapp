import { createSignal, Show, type Component } from 'solid-js';

import logo from './assets/lightbulb_with_clarify_logo_transparent.png'
import styles from './App.module.css';
import AddCircleIcon from '@suid/icons-material/AddCircle';
import { Button, CircularProgress, createTheme, MenuItem, Select, TextField, ThemeProvider, Toolbar, Typography } from '@suid/material';
import { customers } from './data';

const theme = createTheme({
  palette: {
    primary: {
      main: '#43A047',
    },
    secondary: {
      main: '#FDD835',
    },
    text: {
      primary: '#212121'
    },
    background: {
      paper: '#42A5F5'
    }
  }
})

const App: Component = () => {
  const [showRRForm, setShowRRForm] = createSignal(false)
  const [customerId, setCustomerId] = createSignal<number>()
  const [seedUrl, setSeedUrl] = createSignal('')
  const [running, setRunning] = createSignal(false)

  const startOnClick = () => {
    if (customerId() && seedUrl()) {
      console.log('Setting running')
      setRunning(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div class={styles.App}>
        <header class={styles.header}>
          <img src={logo} class={styles.logo} alt="logo" />
          <Toolbar variant='dense'>
            <Button class={styles.menuButton} variant='contained' size='large' color='primary' onClick={() => setShowRRForm(!showRRForm())} >
              <Typography>Start Rapid Response</Typography>
              <AddCircleIcon />
            </Button>
          </Toolbar>
        </header>
        <div class={styles.main}>
          <Show when={showRRForm()}>
            <div class={styles.rrForm}>
              <Select style={{ background: 'whitesmoke' }} value={customers.find((c) => c.id === customerId())} onChange={(event) => setCustomerId(event.target.value)} label='Organization'>
                {customers.map((c) => <MenuItem value={c.id}>{c.name}</MenuItem>)}
              </Select>
              <TextField id='seed-url-input' label='Seed YouTube URL' variant='filled' style={{ background: 'whitesmoke' }} value={seedUrl()} onChange={(event) => setSeedUrl(event.target.value)} />
              <Button color='secondary' variant='contained' onClick={startOnClick}>Start Rapid Response Investigation</Button>
            </div>
            <Show when={running()}>
              <CircularProgress color='secondary' />
            </Show>
          </Show>
        </div>
      </div >
    </ThemeProvider >
  );
};

export default App;

/*
          <a
            class={styles.link}
            href="https://www.groundtruthai.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by GroundTruth AI
          </a>
*/
