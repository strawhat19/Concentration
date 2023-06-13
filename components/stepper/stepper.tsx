import * as React from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

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
  },
  {
    label: `Rules`,
    description: `Add Rules for the Game.`,
  },
  {
    label: `Time Limit`,
    description: `Time Limit for Players to Submit an Entry.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
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
                    <TextField id="standard-basic" label="Topic" variant="standard" required />
                </>}
                <Box sx={{ mb: 2 }}>
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
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
            </Button>
            </Paper>
        )}
        </Box>
    </ThemeProvider>
  );
}