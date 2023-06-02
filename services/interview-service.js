module.exports = {
    getAllInterviews: async () => {
        return await InterviewModel.find(
            {
                date: {
                    $gte: new Date().setHours(00, 00, 00),
                },
            },
            'date startTime endTime'
        );
    }
}