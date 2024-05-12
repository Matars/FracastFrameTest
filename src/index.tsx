import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'
import { Box, Column, Heading, Text, VStack, vars } from './ui.js'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'

export const app = new Frog({
    // Supply a Hub to enable frame verification.
    // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/', serveStatic({ root: './public' }))


let count = 0;

app.frame('/', (c) => {
    count = 0;
    return c.res({
        action: "/Gojo",
        image: "https://m.media-amazon.com/images/I/718RCq4gL0L.png",
        intents: [
            <Button value="apples">Start</Button>, ,
        ],
    })
})

app.frame('/Gojo', (c) => {
    return c.res({
        action: "/Killua",
        image: "https://staticg.sportskeeda.com/editor/2023/06/f2988-16880551809512-1920.jpg",
        intents: [
            <Button value="Naruto">Naruto</Button>,
            <Button value="Gojo">Gojo</Button>,
            <Button value="Gon">Gon</Button>
        ],
    })
})

app.frame('/Killua', (c) => {
    const { buttonValue } = c

    if (buttonValue == "Gojo") {
        count++
    }

    return c.res({
        action: "/Results",
        image: "https://imgur.com/rppiOqu.jpg",
        intents: [
            <Button value="Gon">Gon</Button>,
            <Button value="Hisoka">Hisoka</Button>,
            <Button value="Killua">Killua</Button>
        ],
    })
})

app.frame('/Results', (c) => {
    const { buttonValue } = c

    if (buttonValue == "Killua") {
        count++
    }
    return c.res({
        image: (
            <div style={{
                color: 'white',
                display: 'flex',
                fontSize: 60,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                Results: {count} / 2
            </div>
        ),
    })
})




devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
