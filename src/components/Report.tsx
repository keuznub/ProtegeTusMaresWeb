
import React, { useState } from 'react';
import type { IReport } from '../types/Report'
import { Link } from 'react-router-dom';
import IncidentTypes from '../constants/typeconstants';




function Report({ report }: { report: IReport }) {
  const [loading, setLoading] = useState<boolean>(true)
  const color = IncidentTypes.find(i => i.name.toLowerCase() === report.type.toLowerCase())?.color ?? "#262f40"
  const handleOnLoad = () => {
    setLoading(false)
  }



  return (
    <Link to={`/report/${report.id}`} className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
      <article className='w-68 h-fit overflow-hidden  border-2 p-4 rounded-xl flex flex-col gap-2 bg-blue-900 cursor-pointer hover:scale-105 transition-transform duration-300'>
        <h4 className='text-xl'>{report.title}</h4>
        <h4 className={`border w-fit p-1 rounded-xl`} style={{ backgroundColor: color }}>{report.type}</h4>
        <div className='h-40 justify-items-center'>
          <img src={report.imageUrl} onLoad={handleOnLoad} className='h-full rounded-lg overflow-hidden object-scale-down' />
        </div>

        <aside className='flex flex-row'>
          <span className='flex-1 self-start'>{report.address.street} {report.address.city}</span>
          <span className='w-fit border p-1 rounded-xl self-end'>{report.state}</span>
        </aside>

      </article>
    </Link>
  )
}

export default React.memo(Report)