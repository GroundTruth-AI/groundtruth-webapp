import { ArrowRight, ArrowRightAlt, ArrowRightAltOutlined, DoubleArrow } from "@suid/icons-material";
import { Avatar, Card, CardContent, CardHeader, CircularProgress, Divider, Stack, Typography } from "@suid/material";
import { createRenderEffect, createSignal, JSX, Match, Show, Switch } from "solid-js"
import logo from '../assets/lightbulb_logo.png'

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const PathItem = ({ loadingText, children, showContent, id }: { children?: JSX.Element, loadingText: string, showContent: boolean, id: string }) => {
    return (
        <Show when={showContent} fallback={
            <Stack alignItems="center" gap={'1rem'}>
                <Typography variant="h3">{loadingText}</Typography>
                <CircularProgress />
            </Stack>
        }>
            <Card sx={{
                height: '50vmin', width: '50vmin'
            }} id={id}>
                <CardContent>
                    {children}
                </CardContent>
            </Card >
        </Show>
    )
}


export default function DemoRRPath() {
    const [setupReady, setSetupReady] = createSignal(false)
    const [gatherReady, setGatherReady] = createSignal(false)
    const [assessmentReady, setAssessmentReady] = createSignal(false)

    return (
        <Stack
            direction='row'
            justifyContent="space-around"
            alignItems="center"
            divider={<ArrowRightAlt sx={{
                bgcolor: 'white'
            }} />}
        >
            {/* <PathItem header="Setting up rapid response..." id='setup-card' showContent={setupReady()} />
            <PathItem header="Searching YouTube and gathering videos..." id='gather-card' showContent={gatherReady()} />
            <PathItem header="Assessment" id='assess-card' showContent={assessmentReady()} /> */}
            <PathItem loadingText='Setting up...' showContent={setupReady()} id='setup-card' />
            <Avatar src={logo} variant="square" sx={{ height: '300px', width: '300px' }} />
            <Avatar src={logo} variant="square" sx={{ height: '300px', width: '300px' }} />
        </Stack >
    )
}