export const calculateProjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places
};


export const groupAttendanceByProject = (projectAttendance) => {
    const attendanceByProject = {};

    projectAttendance.forEach((attendance) => {
        const projectName = attendance.projectName.projectName;
        const sessions = attendance.projectName.sessions;
        const subId = attendance.projectName._id;

        if (!attendanceByProject[projectName]) {
            attendanceByProject[projectName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        if (attendance.status === "Present") {
            attendanceByProject[projectName].present++;
        } else if (attendance.status === "Absent") {
            attendanceByProject[projectName].absent++;
        }
        attendanceByProject[projectName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });
    return attendanceByProject;
}

export const calculateOverallAttendancePercentage = (projectAttendance) => {
    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = [];

    projectAttendance.forEach((attendance) => {
        const projectId = attendance.projectName._id;
        if (!uniqueSubIds.includes(projectId)) {
            const sessions = parseInt(attendance.projectName.sessions);
            totalSessionsSum += sessions;
            uniqueSubIds.push(projectId);
        }
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    return (presentCountSum / totalSessionsSum) * 100;
};