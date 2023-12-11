// Your code here

function createEmployeeRecord(employeeArray) {
    let employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1], 
        title: employeeArray[2], 
        payPerHour: employeeArray[3], 
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords(employeeArrays) {
    let employeeRecords = [];
    for (let i = 0; i < employeeArrays.length; i++) {
        let employeeArraysItem = employeeArrays[i];
        let employeeRecord = createEmployeeRecord(employeeArraysItem); 
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}
  
function createTimeInEvent(employeeRecord, inStamp) {
    let timeInData = inStamp.split(' ');
    let dateString = timeInData[0];
    let hourString = timeInData[1];
    let timeIn = {
        type: 'TimeIn',
        date: dateString,
        hour: Number(hourString)
    }
    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, outStamp) {
    let timeOutData = outStamp.split(' ');
    let dateString = timeOutData[0];
    let hourString = timeOutData[1];
    let timeOut = {
        type: 'TimeOut',
        date: dateString,
        hour: Number(hourString)
    }
    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    let timeInArray = employeeRecord.timeInEvents;
    let timeOutArray = employeeRecord.timeOutEvents;
    let totalHoursWorked = 0;

    for (let i = 0; i < timeInArray.length; i++) {
        if (dateWorked === timeInArray[i].date) {
            let timeInHour = timeInArray[i].hour;
            let timeOutHour = timeOutArray[i].hour;
            totalHoursWorked = (timeOutHour - timeInHour) / 100;
        }
    }
    return totalHoursWorked;
}

function wagesEarnedOnDate(employeeRecord, formDate) {
    let totalHoursWorked = hoursWorkedOnDate(employeeRecord, formDate);
    let payRate = employeeRecord.payPerHour;
    let payOwed = totalHoursWorked * payRate;
    return Number(payOwed);   
}

function allWagesFor(employeeRecord) {
    let employeeTimeArray = [];
    let employeeTimeEvents = employeeRecord.timeInEvents;
    for (let i = 0; i < employeeTimeEvents.length; i++) {
        let formDate = employeeTimeEvents[i].date;
        let eachWageDate = wagesEarnedOnDate(employeeRecord, formDate);
        employeeTimeArray.push(eachWageDate);
    }
    let employeeTotalWages = employeeTimeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return Number(employeeTotalWages);
}

function calculatePayroll(employeeRecords) {
    let staffArray = [];
    for (let i = 0; i < employeeRecords.length; i++) {
        let employeeWages = allWagesFor(employeeRecords[i]);
        staffArray.push(employeeWages);
    }
  
    let staffTotalWages = staffArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return Number(staffTotalWages);
  }

/*

NOTES

Mapping data: If you have a collection of data that needs to be transformed 
or processed in a certain way, the map function can be useful. For example, 
you use map to iterate over array of user objects and extract specific from 
each user, such as their names or email addresses.

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map((number) => number * 2);
console.log(doubledNumbers);

Reducing data: If you have a collection of data and you want to perform 
some kind of aggregation or calculation on it to obtain a single value, 
the reduce function can be handy. For instance, you might use reduce to 
calculate the total number of likes on a set of posts or to find the average 
age of a group of users.

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // Output: 15

*/