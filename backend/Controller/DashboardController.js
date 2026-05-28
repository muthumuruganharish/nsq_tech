const getRecords = async (req, res) => {

    try {

        // Dummy Records
        const records = [

            {
                id: 1,
                title: "Employee Database",
                access: "Read"
            },

            {
                id: 2,
                title: "Payroll System",
                access: "Write"
            },

            {
                id: 3,
                title: "Admin Analytics",
                access: "Full Access"
            },

            {
                id: 4,
                title: "Project Management",
                access: "Read"
            }

        ];

        // Simulate API Delay
        setTimeout(() => {

            res.status(200).json(records);

        }, 2000);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports={getRecords}