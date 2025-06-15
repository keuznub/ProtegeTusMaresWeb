import { useEffect, useRef, useState } from 'react'
import type { IReport } from '../types/Report'
import { FirestoreService } from '../services/FirestoreServices'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { auth } from '../configs/firebaseInit'
import { FaMapMarkerAlt } from "react-icons/fa";

function ReportPage() {
    const [report, setReport] = useState<IReport>()
    const states = ["pendiente", "resuelto"]
    const navigate = useNavigate()
    const { id } = useParams()
    const mapRef = useRef<google.maps.Map | null>(null);
    useEffect(() => {
        getReport()
    }, [])

    useEffect(() => {
        console.log(report?.state);

    }, [report])



    function handleMarkerClick() {
        if (mapRef.current && report?.geoLocation) {
            mapRef.current.panTo({
                lat: report.geoLocation.latitude,
                lng: report.geoLocation.longitude,
            });
            mapRef.current.setZoom(17)
        }
    }


    const getReport = async () => {
        if (!id) return
        const reportGot = await FirestoreService.getReportById(id)
        if (!reportGot) return navigate("/dasboard")
        setReport(reportGot)
    }

    const handleOnStateChange = async (e: string) => {
        await FirestoreService.updateReportState(id!, e)
        setReport({ ...report!, state: e })
    }

    return <>

        <article className='w-fit p-4 border mt-8 rounded-xl flex flex-col gap-2  mx-auto relative -top-7'>
            <h4 className='text-3xl'>{report?.title}</h4>
            <h4 className='border w-fit p-1 rounded-xl'>{report?.type}</h4>
            <div className='bg-zinc-600 rounded-lg p-4 '>
                <h4 className='text-2xl'>Localización:</h4>
                {report?.geoLocation && <GoogleMap onLoad={(map) => { mapRef.current = map }} center={{ lat: report?.geoLocation.latitude, lng: report?.geoLocation.longitude }} zoom={12} mapContainerStyle={{ width: 300, height: 300, justifySelf: "center", margin: "auto" }}>
                    <Marker position={{ lat: report?.geoLocation.latitude, lng: report?.geoLocation.longitude }} onClick={handleMarkerClick} />
                </GoogleMap>}
                <aside className='flex flex-row gap-2'>
                    <FaMapMarkerAlt size={24} />
                    <span>{report?.address?.street ?? ""} {report?.address?.city ?? ""}</span>
                </aside>
            </div>
            <div className='h-80 justify-items-center'>
                <img src={report?.imageUrl} className='h-full rounded-lg overflow-hidden object-scale-down' />
            </div>
            <div className='bg-zinc-600 rounded-lg p-4'>
                <h4 className='text-2xl'>Mas información:</h4>
                <pre>{report?.description}</pre>
            </div>

            <div className='bg-zinc-600 rounded-lg p-4 flex flex-row justify-center gap-4 items-center'>
                <h4 className='text-2xl'>Estado:</h4>
                <select value={report?.state} className='border p-4 text-black rounded-2xl bg-white px-5' onChange={(e) => handleOnStateChange(e.target.value)}>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
            </div>
        </article>
    </>
}

export default ReportPage