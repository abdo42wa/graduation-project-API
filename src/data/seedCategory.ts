const Category = [
    {
        title: "categoryOne",
        status: "PENDING"
    },
    {
        title: "categoryTow",
        status: "IN_CLARIFICATION"
    },
    {
        title: "categoryThree",
        status: "APPROVED",
        supCategories:[
            {
                title: "sub1",
                status: "APPROVED",
            },
            {
                title: "sub2",
                status: "PENDING",
            }
    ]
    }

]

export default Category