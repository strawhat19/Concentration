import * as React from 'react';
import Box from '@mui/material/Box';
import { dev } from '../pages/_app';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import { useState, useEffect, useRef } from 'react';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const muiTheme = createTheme({
    palette: {
        // primary: {
        //     main: `#00c2ff`,
        // },
        // secondary: {
        //     main: `#58717f`,
        // },
    },
});

const steps = [
    {
        label: `Topic`,
        description: `Select a Topic for the Game`,
    },
    {
        label: `Rules`,
        description: `Add Rules for the Game.`,
    },
    {
        label: `Time Limit`,
        description: `Time Limit for Players.`,
    },
];

export default function Concentration(props) {

    const loadedRef = useRef(false);
    const [loaded, setLoaded] = useState(false);
    const [formFields, setFormFields] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = (fields?) => {
        setActiveStep((prevActiveStep) => {
            return prevActiveStep + 1;
        });

        if (fields) {
            let stepConnectors = document.querySelectorAll(`.MuiStepConnector-root`);
            if (activeStep < stepConnectors.length) {
                let thisConnector = stepConnectors[activeStep];
                let connectorLineText = thisConnector?.querySelector(`span`);
                connectorLineText.innerHTML = Object.values(fields)[activeStep]?.toString();
            } else {
            setTimeout(() => {
                let lastCompleted = document.querySelectorAll(`.Mui-completed`)[document.querySelectorAll(`.Mui-completed`)?.length - 1]?.parentElement?.parentElement;
                lastCompleted.insertAdjacentHTML(`afterend`, `<div class="MuiStepConnector-root MuiStepConnector-vertical Mui-completed css-1pe7n21-MuiStepConnector-root"><span class="customConnector MuiStepConnector-line MuiStepConnector-lineVertical css-8t49rw-MuiStepConnector-line">${Object.values(fields)[activeStep]?.toString()}</span></div>`);
            }, 35);
            }
        }

        setTimeout(() => {
            let nextInput: any = document.querySelectorAll(`.formField`)[document.querySelectorAll(`.formField`)?.length - 1].querySelector(`input`);
            if (nextInput) nextInput?.focus();
        }, 35);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        let stepConnectors = document.querySelectorAll(`.MuiStepConnector-root`);
        stepConnectors.forEach((step, index) => {
            if (index == stepConnectors?.length - 1) {
                step.remove();
            } else {
                step.firstElementChild.innerHTML = ``;
            }
        });
        document.querySelector(`.formField`)?.querySelector(`input`)?.focus();
    };

    const ConcentrationGameFormSubmit = (ConcentrationGameFormSubmitEvent) => {
        ConcentrationGameFormSubmitEvent.preventDefault();

        // Set Up Object Where We Can Store Form Values
        let concentrationForm = ConcentrationGameFormSubmitEvent?.target;
        let formFieldContainers = concentrationForm.querySelectorAll(`.formField`);
 
        // Store Form Values
        Object.assign(formFields, ...([...formFieldContainers].map((fieldContainer: any, fieldContainerIndex) => {
            let field = fieldContainer.querySelector(`.MuiInput-input`);
            if (field != null && field != undefined) {
                return { [field?.name]: field?.value };
            } else {
                field = fieldContainer.querySelector(`.MuiInputBase-formControl`).querySelector(`input`);
                return { [field?.name]: field?.value };
            }
        })));

        let values = Object.values(formFields);
        let emptyVals = values.some(val => val == ``);

        if (emptyVals) {
            dev() && console.log(`Empty`);
            return;
        } else {
            dev() && console.log(`Game`, formFields);
            handleNext(formFields);
        }
    }

    useEffect(() => {

        if (activeStep == 0) {
            document.querySelector(`.formField`)?.querySelector(`input`)?.focus()
        } else if (activeStep === steps.length) {

            const handleEnterKey = (event) => {
                if (event.key === `Enter`) {
                    handleReset();
                }
            };
            
            window.addEventListener(`keydown`, handleEnterKey);
    
            // Cleanup function to remove the event listener
            return () => {
                window.removeEventListener(`keydown`, handleEnterKey);
            };
        }

        if (loadedRef.current) return;
        loadedRef.current = true;
        setLoaded(true);

      }, [activeStep]);

    return <>
        <div id={`ConcentrationGame`} title={props.title} style={{width: `100%`, margin: `20px auto`}}>
            <form className={`ConcentrationGameForm`} id={`ConcentrationGameForm`} onSubmit={(ConcentrationGameFormSubmitEvent) => ConcentrationGameFormSubmit(ConcentrationGameFormSubmitEvent)}>
                <ThemeProvider theme={muiTheme}>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                    //   optional={
                                    //     index === 2 ? (
                                    //       <Typography variant="caption">Last step</Typography>
                                    //     ) : null
                                    //   }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        {step.description && step.description != `` && <Typography>{step.description}</Typography>}
                                        {step.label == `Topic` && <>
                                            <TextField fullWidth className={`formField topic`} name={`topic`} id="standard-basic" label="Topic" variant="standard" required />
                                        </>}
                                        {step.label == `Rules` && <>
                                            <TextField fullWidth className={`formField rules`} name={`rules`} id="standard-basic" label="Rules" variant="standard" required />
                                        </>}
                                        {step.label == `Time Limit` && <>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimeField style={{ marginTop: 15 }} format="HH:mm:ss" className={`formField timeLimit`} name={`timeLimit`} label="Time Limit" required />
                                            </LocalizationProvider>
                                        </>}
                                        {activeStep == steps?.length && <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>}
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>Game Set</Typography>
                                <Button type={`submit`} className={`MuiButton-containedPrimary containedPrimary`} onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Start Game
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </ThemeProvider>
            </form>
        </div>
    </>
}