import { Box, Card, CardContent, Grow, Skeleton, Stack, Typography } from "@suid/material";
import { Accessor, createMemo, createSignal, JSX, onMount, Show } from "solid-js"

const PathItem = ({ children, showContent, id }: { children?: JSX.Element, showContent: Accessor<boolean>, id: string }) => {
    return (
        <Box sx={{ width: '300', height: 'auto' }}>
            {showContent() ? <Grow in={showContent()} style={{ transformOrigin: "0 0 0" }}
                {...(showContent() ? { timeout: 3000 } : {})}>
                <Card id={id} sx={{ width: 'auto', height: '300px', borderRadius: '2rem', bgcolor: '#212121', color: '#42A5F5' }}><CardContent>{children}</CardContent></Card></Grow>
                : <Skeleton sx={{ bgcolor: '#212121', borderRadius: '2rem' }} variant='rectangular' height={300} width={300}></Skeleton>
            }
        </Box>
    )
}

export interface demoProps { sentiment: Accessor<string>, subject: Accessor<string> }
export default function DemoRRPath({ subject, sentiment }: demoProps) {
    const [setupReady, setSetupReady] = createSignal(false)
    const [gatherReady, setGatherReady] = createSignal(false)
    const [assessmentReady, setAssessmentReady] = createSignal(false)

    onMount(() => {
        setTimeout(() => setSetupReady(true), 1500)
    })

    // Gather step ready computation
    createMemo((prev) => {
        if (setupReady() && prev != setupReady()) {
            setTimeout(() => setGatherReady(true), 20000)
        }
    }, false)

    // Assess step computation
    createMemo((prev) => {
        if (gatherReady() && prev != assessmentReady()) {
            setTimeout(() => setAssessmentReady(true), 8000)
        }
    }, false)

    return (
        <Stack
            direction='row'
            justifyContent="space-between"
            alignItems="center"
            gap="1rem"
            padding='1rem'
        // divider={<ArrowRightAlt sx={{
        //     bgcolor: 'white'
        // }} />}
        >
            <PathItem showContent={setupReady} id='setup-step'>
                <Typography variant='h3' gutterBottom>Setup Complete</Typography>
                <Typography align="left" variant='h6'>{" -  New investigation has been created and attached to the organization's investigations"}</Typography>
                <Typography align="left" variant='h6'>{" -  Content-gathering will use the provided video to find similar content"}</Typography>
                <Typography align="left" variant='h6'>{` -  Investigation will assess content for ${sentiment()} assessments about ${subject()}`}</Typography>
            </PathItem>
            <Show when={setupReady()}>
                <PathItem showContent={gatherReady} id='gather-step'>
                    <Typography variant='h3' gutterBottom>Gathering Complete</Typography>
                    <Typography variant='h6' align="left">{" - Collected 3069 YouTube videos"}</Typography>
                    <Typography variant='h6' align="left" gutterBottom>{" - Gathered videos collected from 1641 different channels"}</Typography>
                    <Typography variant='h6' align="center" color='#43A047' fontWeight={'bold'}>{"Starting video assessments..."}</Typography>
                </PathItem>
            </Show>
            <Show when={gatherReady()}>
                <PathItem showContent={assessmentReady} id='assess-step'>
                    <Typography variant='h3' gutterBottom color={'#43A047'}>Assessing</Typography>
                    <Typography variant='h5' align="center" color={'#43A047'}>Insights and targeting matrix available for paying customers only</Typography>
                </PathItem>
            </Show>
        </Stack >
    )
}