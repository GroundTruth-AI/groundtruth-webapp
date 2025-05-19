import { createSignal, Show, type Component } from 'solid-js';

import logo from './assets/lightbulb_with_clarify_logo_transparent.png'
import styles from './App.module.css';
import AddCircleIcon from '@suid/icons-material/AddCircle';
import { Button, CircularProgress, createTheme, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, Toolbar, Typography } from '@suid/material';
import { AssessmentSentiment, customers } from './data';
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
  const [sentiment, setSentiment] = createSignal<AssessmentSentiment | "">("")
  const [subject, setSubject] = createSignal("")
  const [running, setRunning] = createSignal(false)
  const [loadingDone, setLoadingDone] = createSignal(false)

  const startOnClick = () => {
    if (customerId() && seedUrl()) {
      setRunning(true)
      setTimeout(() => setLoadingDone(true), 20000)
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
          <Show when={showRRForm()}>
            <div class={styles.rrForm}>
              <FormControl fullWidth>
                <InputLabel id='organization-select-label'>Organization</InputLabel>
                <Select labelId='organization-select-label' sx={{ bgcolor: theme.palette.primary.light }} value={customers.find((c) => c.id === customerId())} onChange={(event) => setCustomerId(event.target.value)}>
                  {customers.map((c) => <MenuItem value={c.id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField id='seed-url-input' sx={{ bgcolor: theme.palette.primary.light }} label='Seed YouTube URL' variant='filled' value={seedUrl()} onChange={(event) => setSeedUrl(event.target.value)} />
              <FormControl fullWidth>
                <InputLabel id='assessment-sentiment-label'>Sentiment</InputLabel>
                <Select labelId='assessment-sentiment-label' sx={{ bgcolor: theme.palette.primary.light }} label='Sentiment' value={sentiment()} onChange={(event) => setSentiment(event.target.value)}>
                  <MenuItem value={'positive'}>Positive</MenuItem>
                  <MenuItem value={'negative'}>Negative</MenuItem>
                </Select>
              </FormControl>
              <TextField id='assessment-subject' sx={{ bgcolor: theme.palette.primary.light }} label='Assessment focus' variant='filled' value={subject()} onChange={(event) => setSubject(event.target.value)}></TextField>
              <Button color='secondary' variant='contained' onClick={startOnClick}>Start Rapid Response Investigation</Button>
            </div>
            <Stack spacing={10} alignItems='center'>
              <Show when={running() && !loadingDone()}>
                <CircularProgress color='secondary' />
              </Show>
              <Show when={loadingDone()}>
                <DemoRRPath subject={subject} sentiment={sentiment} />
              </Show>
            </Stack>
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
