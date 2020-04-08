/* REACT IMPORTS */
import React from 'react';
import { PropTypes } from 'prop-types'
/* THIRD PARTY IMPORTS */
import * as _ from 'lodash';
import { 
    Card, 
    CardHeader, 
    CardContent,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Collapse,
    CardActions,
    IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// This is really bad. We should include labels and visible properties in the endpoints.
const visibleKeys = [
    { 
        key: 'first_name',
        label: 'First Name',
    },
    { 
        key: 'last_name',
        label: 'Last Name',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'physician',
        label: 'Physician',
    }
];

// Again, really bad.
const hiddenKeys = [
    { 
        key: 'gender',
        label: 'Gender',
    },
    { 
        key: 'date_of_birth',
        label: 'Date of Birth',
    },
    {
        key: 'phone_number',
        label: 'Phone',
    },
    { 
        key: 'address.street_address',
        label: 'Street Adress',
    },
    { 
        key: 'address.city',
        label: 'City',
    },
    {
        key: 'address.province',
        label: 'Province',
    },
    { 
        key: 'ec_phone_number',
        label: 'Emergency Contact',
    },
];

class MyInformation extends React.Component {

    state = {
        expanded: false,
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    findProfileData(profile, common) {
        const data = [];
        for(let cObj of common) {
            const profileItem = _.get(profile, cObj.key);
            if(profileItem) {
                data.push({
                    id: cObj.key,
                    label: cObj.label,
                    value: profileItem,
                });
            }
        }
        return data;
    }

    render() {
        let { profile } = this.props;
        const visible = this.findProfileData(profile, visibleKeys);
        const hidden = this.findProfileData(profile, hiddenKeys);
        return (
            <Card>
                <CardHeader 
                    title="Information"
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <CardContent>
                    <Table>
                        <TableBody>
                        {visible.map(vis => (
                            <TableRow
                                key={vis.id}>
                                <TableCell
                                    align="left">
                                    <b>{vis.label}</b>
                                </TableCell>
                                <TableCell
                                    align="left">
                                    {vis.value}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardActions style={{justifyContent: 'end'}}>
                    <IconButton
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more">
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto">
                    <CardContent>
                        <Table>
                            <TableBody>
                            {hidden.map(hid => (
                                <TableRow
                                    key={hid.id}>
                                    <TableCell
                                        align="left">
                                        <b>{hid.label}</b>
                                    </TableCell>
                                    <TableCell
                                        align="left">
                                        {hid.value}
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

MyInformation.propTypes = {
    profile: PropTypes.object.isRequired,
};

export { MyInformation };
