import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
];

function valuetext(value) {
    return `${value}`;
}

export default function DiscreteSliderMarks() {
    return (
        <Box sx={{width: 300}}>
            <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
            />
            <Slider defaultValue={30} step={10} marks min={10} max={110} disabled/>
        </Box>
    );
}