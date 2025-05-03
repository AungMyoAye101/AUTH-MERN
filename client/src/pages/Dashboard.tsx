
import Button from '../components/ui/Button'

const Dashboard = () => {
    return (
        <section className='mt-4 space-y-4'>
            <div className='bg-white shadow-md rounded-lg p-4 flex flex-col gap-1 w-48 hover:shadow-xl'>
                <h2 className='text-neutral-600 font-semibold font-serif'>Totals</h2>
                <h1 className='font-bold text-3xl text-center '>1200</h1>
                <p className='text-neutral-600 font-serif text-end'>users</p>
            </div>
            <div className='flex gap-4 flex-wrap'>

                {
                    Array(12).fill(null).map((_, i) => (<div className='flex items-center justify-between gap-2 bg-white p-2 w-60 rounded-lg hover:shadow-lg border'>
                        <div className='flex items-center gap-1 ' key={i}>

                            <div className='w-10 h-10 rounded-full bg-purple-400 flex justify-center items-center text-white font-semibold'>S</div>
                            <div>
                                <p className=' font-semibold font-serif'>Name</p>
                                <p className='text-xs -mt-1'>email@gmail.com</p>
                            </div>
                        </div>
                        <Button className='bg-red-400 text-sm'>Ban</Button>
                    </div>))
                }
            </div>

        </section>
    )
}

export default Dashboard