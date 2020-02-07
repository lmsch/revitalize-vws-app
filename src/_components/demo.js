import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3)
    }
}));

export default function RadioButtonsGroup() {
    const classes = useStyles();
    const [value, setValue] = React.useState("agree");

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Rating Options</FormLabel>
                <RadioGroup
                    aria-label="position"
                    name="position"
                    value={value}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel
                        value="agree"
                        control={<Radio color="primary" />}
                        label="Agree"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="neutral"
                        control={<Radio color="primary" />}
                        label="Neutral"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="disagree"
                        control={<Radio color="primary" />}
                        label="Disagree"
                        labelPlacement="top"
                    />
                </RadioGroup>
            </FormControl>

            <FormLabel component="legend">Choose from following</FormLabel>
            <RadioGroup
                aria-label="position"
                name="position"
                value={value}
                onChange={handleChange}
                row
            >
                <FormControlLabel
                    value="option1"
                    control={<Checkbox color="primary" />}
                    label="Option 1"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="option2"
                    control={<Checkbox color="primary" />}
                    label="Option 2"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="option3"
                    control={<Checkbox color="primary" />}
                    label="Option 3"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="option4"
                    control={<Checkbox color="primary" />}
                    label="Option 4"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="option5"
                    control={<Checkbox color="primary" />}
                    label="Option 5"
                    labelPlacement="top"
                />
            </RadioGroup>
        </div>
    );
}
