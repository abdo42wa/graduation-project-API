import categories from './data/seedCategory'
import Category from './models/categoryModel'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()
connectDB()

const importData = async () => {
    try {
      

        const sampleCategories= categories.map(category => {
            return { ...category}
        })

        await Category.insertMany(sampleCategories)

        console.log('data imported')
        process.exit()

    } catch (error) {
        if(error instanceof Error){
            console.log(`Error: ${error.message}`)
        }
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Category.deleteMany()


        console.log('data destoroy')
        process.exit()

    } catch (error) {
        if(error instanceof Error){
            console.log(`Error: ${error.message}`)
        }
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}