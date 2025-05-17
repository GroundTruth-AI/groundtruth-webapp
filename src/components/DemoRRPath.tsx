import { ArrowRightAlt } from "@suid/icons-material";
import { Box, Card, CardContent, CircularProgress, Grow, Skeleton, Stack, Typography } from "@suid/material";
import { Accessor, createMemo, createSignal, JSX, onMount, Show } from "solid-js"

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const PathItem = ({ loadingText, children, showContent, id }: { children?: JSX.Element, loadingText: string, showContent: Accessor<boolean>, id: string }) => {
    return (
        <Box sx={{ width: '300', height: '300' }}>
            {showContent() ? <Grow in={showContent()} style={{ transformOrigin: "0 0 0" }}
                {...(showContent() ? { timeout: 3000 } : {})}>
                <Card id={id} sx={{ width: '300', height: '300' }}><CardContent><Typography variant="h4">{loadingText}</Typography></CardContent></Card></Grow>
                : <Skeleton sx={{ bgcolor: '#212121', borderRadius: '2rem' }} variant='rectangular' height={300} width={300}></Skeleton>
            }
        </Box>
    )
}


export default function DemoRRPath() {
    const [setupReady, setSetupReady] = createSignal(false)
    const [gatherReady, setGatherReady] = createSignal(false)
    const [assessmentReady, setAssessmentReady] = createSignal(false)

    onMount(() => {
        setTimeout(() => setSetupReady(true), 10000)
    })

    createMemo((prev) => {
        if (setupReady() && prev != setupReady()) {
            setTimeout(() => setGatherReady(true), 20000)
        }
    }, false)

    return (
        <Stack
            direction='row'
            justifyContent="space-around"
            alignItems="center"
        // divider={<ArrowRightAlt sx={{
        //     bgcolor: 'white'
        // }} />}
        >
            <PathItem loadingText="Setting up" showContent={setupReady} id='setup-step' />
            <Show when={setupReady()}>
                <PathItem loadingText="Collecting YouTube data" showContent={gatherReady} id='gather-step' />
            </Show>
            <Show when={gatherReady()}>
                <PathItem loadingText="Starting assessments" showContent={assessmentReady} id='assess-step' />
            </Show>
        </Stack >
    )
}