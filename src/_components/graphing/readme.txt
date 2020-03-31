---common.js
serves as the basics for the layout of the theme.

---GraphSelector.js
posseses the information for the data that will be graphed with max data and min date as the limits and also utilizing the start of the days to the end of the days as the range.

---labvalueindicator.js
makes use of parameteres such as options, data and classes and checks if they are empty and calls upon the graph selector method to graph them, if they are not empty.
Also makes use of the scatterchart to graph the indicator vs the time.

---surveyIndicatorLinear.js
graph named Survey progress, similar to the graphing of labvalueindicator.