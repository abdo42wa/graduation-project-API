const Category = [
    {
        title: "categoryOne",
        status: "PENDING",
        subCategories:
        [
            {
                title: "fake",
                status: "APPROVED",
            },
            {
                title: "make",
                status: "PENDING",
            }
        ]
    },
    {
        title: "categoryTow",
        status: "IN_CLARIFICATION"
    },
    {
        title: "categoryThree",
        status: "APPROVED",
        subCategories:
        [
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