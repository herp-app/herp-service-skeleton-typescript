import {  CssBaseline, GlobalStyles, ThemeProvider, Typography} from "@mui/material";
import { useThemeDetector } from "../hooks/useThemeDetector";
import herpLightTheme from '../themes/herpLight';
import herpDarkTheme from '../themes/herpDark';
import { Box } from "@mui/system";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'

export default function HelloWorld() {
    const socket = useRef(io());
    const darkMode = useThemeDetector();
    const router = useRouter();
    const [greetingName, setGreetingName] = useState<string>("");

    // Listen on socket data update
    useEffect(() => {
        const listenerGreeting = function(msg: string) {
            setGreetingName(msg);
        }

        if (router.query.collaborationId) {
            socket.current.on('greeting:' + router.query.collaborationId, listenerGreeting);
        }

        return () => {
            if (router.query.collaborationId) {
                socket.current.off('greeting:' + router.query.collaborationId, listenerGreeting);
            }
        }
    });


    return <ThemeProvider theme={darkMode ? herpDarkTheme : herpLightTheme}>        
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "transparent" },
          }}
        />
        <Box>
            <Typography variant="h1">
                {!greetingName && "Hello World"}
                {!!greetingName && greetingName}
            </Typography>
        </Box>
    </ThemeProvider>
}