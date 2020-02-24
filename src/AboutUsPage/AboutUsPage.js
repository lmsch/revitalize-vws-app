/* REACT IMPORTS */
import React from 'react';
import { Link } from 'react-router-dom';

import { GenerateSurvey } from '../_components';

const model = {
    "name" : "Self-Efficacy for Managing Chronic Disease 6-item Scale",
    "id" : 1,
    "description" : "This 6-item scale contains items taken from several SE scales developed for the Chronic Disease SelfManagement study.",

    "number_of_elementss" : 7,

    "elements" : [
        {
            "element_type" : "text",
            "text" : "We would like to know how confident you are in doing certain activities. For each of the following questions, please choose the number that corresponds to your confidence that you can do the tasks regularly at the present time."
        },
        {
            "element_type" : "question_group",
            "number" : null, // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
            "question_group_type" : "integer_range",
            "question_group_type_data" : {
                "minimum" : 1,
                "maximum" : 10,
                "step" : 1,
                "initial" : 6,
                "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ], // What to put on the ticks.
                "annotations" : { // Text to associate with scale, ticks, ect.
                    "minimum" : "not at all confident", // What to put on the minimum side.
                    "maximum" : "totally confident", // What to put on the maximum side.
                    // Could have something like:  "label" : "Some text..." to add to the labels above
                    // For example:
                    // "5" : "somewhat confident"
                    // also possible :
                    // "middle" : "somewhat confident"
                }
            },
            "text" : null, // Text unifying multiple inputs goes here.
            "number_of_questions" : 1, // Number of inputs of the above type this question contains. 
            "questions" : [
                {
                    "number" : "1", // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
                    "text" : "How confident do you feel that you can keep the fatigue caused by your disease from interfering with the things you want to do?",
                    "help_text" : null
                }
            ]
        },
        {
            "element_type" : "question_group",
            "number" : null, // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
            "question_group_type" : "integer_range",
            "question_group_type_data" : {
                "minimum" : 1,
                "maximum" : 10,
                "step" : 1,
                "initial" : 6,
                "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ], // What to put on the ticks.
                "annotations" : { // Text to associate with scale, ticks, ect.
                    "minimum" : "not at all confident", // What to put on the minimum side.
                    "maximum" : "totally confident", // What to put on the maximum side.
                    // Could have something like:  "label" : "Some text..." to add to the labels above
                    // For example:
                    // "5" : "somewhat confident"
                    // also possible :
                    // "middle" : "somewhat confident"
                }
            },
            "text" : null, // Text unifying multiple inputs goes here.
            "number_of_questions" : 1, // Number of inputs of the above type this question contains. 
            "questions" : [
                {
                    "number" : "2", // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
                    "text" : "How confident do you feel that you can keep the physical discomfort or pain of your disease from interfering with the things you want to do?",
                    "help_text" : null
                }
            ]
        },
        {
            "element_type" : "question_group",
            "number" : null, // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
            "question_group_type" : "integer_range",
            "question_group_type_data" : {
                "minimum" : 1,
                "maximum" : 10,
                "step" : 1,
                "initial" : 6,
                "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ], // What to put on the ticks.
                "annotations" : { // Text to associate with scale, ticks, ect.
                    "minimum" : "not at all confident", // What to put on the minimum side.
                    "maximum" : "totally confident", // What to put on the maximum side.
                    // Could have something like:  "label" : "Some text..." to add to the labels above
                    // For example:
                    // "5" : "somewhat confident"
                    // also possible :
                    // "middle" : "somewhat confident"
                }
            },
            "text" : null, // Text unifying multiple inputs goes here.
            "number_of_questions" : 1, // Number of inputs of the above type this question contains. 
            "questions" : [
                {
                    "number" : "3", // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
                    "text" : "How confident do you feel that you can keep the emotional distress caused by your disease from interfering with the things you want to do?",
                    "help_text" : null
                }
            ]
        },
        {
            "element_type" : "question_group",
            "number" : null, // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
            "question_group_type" : "integer_range",
            "question_group_type_data" : {
                "minimum" : 1,
                "maximum" : 10,
                "step" : 1,
                "initial" : 6,
                "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ], // What to put on the ticks.
                "annotations" : { // Text to associate with scale, ticks, ect.
                    "minimum" : "not at all confident", // What to put on the minimum side.
                    "maximum" : "totally confident", // What to put on the maximum side.
                    // Could have something like:  "label" : "Some text..." to add to the labels above
                    // For example:
                    // "5" : "somewhat confident"
                    // also possible :
                    // "middle" : "somewhat confident"
                }
            },
            "text" : null, // Text unifying multiple inputs goes here.
            "number_of_questions" : 1, // Number of inputs of the above type this question contains. 
            "questions" : [
                {
                    "number" : "4", // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
                    "text" : "How confident do you feel that you can keep any other symptoms or health problems you have from interfering with the things you want to do?",
                    "help_text" : null
                }
            ]
        },
        {
            "element_type" : "question_group",
            "number" : null, // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
            "question_group_type" : "integer_range",
            "question_group_type_data" : {
                "minimum" : 1,
                "maximum" : 10,
                "step" : 1,
                "initial" : 6,
                "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ], // What to put on the ticks.
                "annotations" : { // Text to associate with scale, ticks, ect.
                    "minimum" : "not at all confident", // What to put on the minimum side.
                    "maximum" : "totally confident", // What to put on the maximum side.
                    // Could have something like:  "label" : "Some text..." to add to the labels above
                    // For example:
                    // "5" : "somewhat confident"
                    // also possible :
                    // "middle" : "somewhat confident"
                }
            },
            "text" : null, // Text unifying multiple inputs goes here.
            "number_of_questions" : 1, // Number of inputs of the above type this question contains. 
            "questions" : [
                {
                    "number" : "5", // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
                    "text" : "How confident do you feel that you can the different tasks and activities needed to manage your health condition so as to reduce your need to see a doctor?",
                    "help_text" : null
                }
            ]    
        },
        {
            "element_type" : "question_group",
            "number" : null, // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
            "question_group_type" : "integer_range",
            "question_group_type_data" : {
                "minimum" : 1,
                "maximum" : 10,
                "step" : 1,
                "initial" : 6,
                "labels" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ], // What to put on the ticks.
                "annotations" : { // Text to associate with scale, ticks, ect.
                    "minimum" : "not at all confident", // What to put on the minimum side.
                    "maximum" : "totally confident", // What to put on the maximum side.
                    // Could have something like:  "label" : "Some text..." to add to the labels above
                    // For example:
                    // "5" : "somewhat confident"
                    // also possible :
                    // "middle" : "somewhat confident"
                }
            },
            "text" : null, // Text unifying multiple inputs goes here.
            "number_of_questions" : 1, // Number of inputs of the above type this question contains. 
            "questions" : [
                {
                    "number" : "6", // What to display as the question number. Could be letters, etc. or null if no value should be displayed.
                    "text" : "How confident do you feel that you can do things other than just taking medication to reduce how much your illness affects your everyday life?",
                    "help_text" : null
                }
            ]
        }
    ]
};

class AboutUsPage extends React.Component {
    
    render() {
        return <GenerateSurvey model={model} />
    }
}

export { AboutUsPage };
