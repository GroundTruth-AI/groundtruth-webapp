import { createSignal, Show, type Component } from 'solid-js';

import logo from './assets/lightbulb_with_clarify_logo_transparent.png'
import styles from './App.module.css';
import AddCircleIcon from '@suid/icons-material/AddCircle';
import { Button, CircularProgress, createTheme, MenuItem, Select, Stack, TextField, ThemeProvider, Toolbar, Typography } from '@suid/material';
import { customers } from './data';
import DemoRRPath from './components/DemoRRPath';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#43A047',
    },
    secondary: {
      main: '#FDD835',
    },
    text: {
      primary: '#212121'
    },
    background: {
      default: '#42A5F5',
    },
  }
})

const App: Component = () => {
  const [showRRForm, setShowRRForm] = createSignal(false)
  const [customerId, setCustomerId] = createSignal(0)
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
          <Toolbar>
            <Button size='large' color='primary'>Investigations</Button>
            <Button size='large' color='primary'>Channels</Button>
            <Button class={styles.menuButton} variant='contained' size='large' color='primary' onClick={() => setShowRRForm(!showRRForm())} >
              <Typography>Rapid Response</Typography>
              <AddCircleIcon />
            </Button>
          </Toolbar>
        </header>
        <div class={styles.main}>
          <Show when={showRRForm() || true}>
            <div class={styles.rrForm}>
              <Select sx={{ bgcolor: theme.palette.primary.light }} label='Organization' value={customers.find((c) => c.id === customerId())} onChange={(event) => setCustomerId(event.target.value)}>
                {customers.map((c) => <MenuItem value={c.id}>{c.name}</MenuItem>)}
              </Select>
              <TextField id='seed-url-input' sx={{ bgcolor: theme.palette.primary.light }} label='Seed YouTube URL' variant='filled' value={seedUrl()} onChange={(event) => setSeedUrl(event.target.value)} />
              <Button color='secondary' variant='contained' onClick={startOnClick}>Start Rapid Response Investigation</Button>
            </div>
            <Show when={running() || true}>
              <Stack spacing={10}>
                <CircularProgress color='secondary' />
                <DemoRRPath />
              </Stack>
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
