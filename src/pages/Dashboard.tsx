import React, { useEffect, useState } from 'react'
import { FirestoreService } from '../services/FirestoreServices'
import type { IReport } from '../types/Report'
import Report from '../components/Report'



function Dashboard() {
    const [reports, setReports] = useState<IReport[]>()

    const getReports = async () => {
        const reportsgot: IReport[] = await FirestoreService.getReports()
        setReports(reportsgot)
    }
    useEffect(() => {
        getReports()
    }, [])


    return (
        <section className='flex flex-row gap-4 flex-wrap p-4 justify-center-safe'>
            {reports && reports.map((report) => <Report key={report.id} report={report} />)}
        </section>
    )
}

export default Dashboard